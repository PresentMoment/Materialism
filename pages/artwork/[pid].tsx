import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import { Transition } from "react-transition-group";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NextSeo } from "next-seo";
import styles from './[pid].module.css'
import styled from "styled-components"

import Header from "../../Components/Header/Header";
import { LineBreak } from "../../Components/Layout/LineBreak";
import useWindowDimensions from "../../Utils/useWindowDimensions";
import Overlay from "./Transitions/Overlay";
import Text from "./Transitions/Text";
import Head from './Transitions/Head'
import Expand from "../../Components/Layout/Expand";

const builder = imageUrlBuilder(client);
const pageQuery = groq`
*[_type == 'artwork' && slug.current == $pid]{
  ...,
  "artist": artist -> name,
  "mainImage": image.asset->
}`;

const SingleMap = dynamic(() => import("../../Components/Content/SingleMap"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

type ArtworkProps = {
  config: any,
  data: any
}

function Artwork({ config, data = {} }: ArtworkProps) {

  const imgHeight = data.mainImage.metadata.dimensions.height;
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const mainImage = data.mainImage

  const [fullImg, setFullImg] = useState(false)
  const [imgDimensions, setImgDimensions] = useState(0)
  const [hideMap, setHideMap] = useState(false)
  const [showShare, setShare] = useState(false)
  const [isCopied, setIsCopied] = useState(false);

  const bgStyle = {
    transition: `height ${1000}ms ease-in-out`,
    height: '52vh',
    backgroundImage: `url(${builder.image(data.image).auto("format").width(width).height(imgDimensions).url()})`,
    backgroundPosition: '0% 0%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    //backgroundSize: 'cover',
    width: `${width}px`,
    maxHeight: `${height}px`
  };
  
  const bgTransitions = {
    entering: { height: `${height}px`,
  },
    entered: { height: `${height}px`,
  },
    exiting: { height: '52vh',
  },
    exited: { height: '52vh',
  },
  };

  const handleExpand = () => {
    if (fullImg) {
      setTimeout(() => {setHideMap(false)}, 1000)
    } else {
      setTimeout(() => {setHideMap(true)}, 10)
    }
  }

  const handleDivClick = () => {
    if (fullImg){
      setFullImg(!fullImg)
    } else {return}
  }

  useEffect(() => {
    if (window !== undefined){
  
      setImgDimensions(window.innerHeight);
    }
  }, [])


  return (
    <>
          <NextSeo
        title={data.title + " by " + data.artist}
        description="Materialism - art within reach"
        openGraph={{
          type: 'website',
          url: `${process.env.BASE_URL+router.asPath}`,
          title: 'Materialism',
          description: 'Materialism - art within reach',
          images: [
            {
              url: `${mainImage.url}`,
              width: 800,
              height: 600,
              alt: `${data.title + " by " + data.artist}`,
            },
          ],
          site_name: 'Materialism',
        }}
        twitter={{
          // handle: '@handle',
          site: `${process.env.BASE_URL}`,
          cardType: "summary_large_image",
        }}
      />
    <Head fullImg={fullImg}>
      <Header paddingBottom={0} />
        </Head>
        <div className={styles.container} style={{maxHeight: `${height}px`, minHeight: `${height - 100}px`}}>
        <Overlay fullImg={fullImg} handleDivClick={handleDivClick} height={height} />
        <div className={styles.fade} style={{width: `${600}`, height: `${height}`,
          backgroundColor: mainImage.metadata.palette.dominant.background,
          color: mainImage.metadata.palette.dominant.foreground }}>
        <Transition in={fullImg} timeout={1000}>
        {(state) => (
          <div
          style={{
          ...bgStyle,
          ...bgTransitions[state],
          }}
          >
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', flex: 1}} />
            <Text fullImg={fullImg}>
              <span onClick={() => {setFullImg(!fullImg); handleExpand()}} style={{cursor: 'pointer', textAlign: 'end'}}>{data.title}, {data.year}</span>
              <Link href={{ pathname: '/artist/' + data.artist}}>
                <a style={{textAlign: 'start'}}>
                <span>{data.artist}</span>
                  </a>
              </Link>
            </Text>
            
          </div>  
          </div>
          )}
            </Transition>

          </div>
       {/* {!hideMap && */}
        <>
        <LineBreak paddingBottom={0} />
        <SingleMap artWorks={data} width={width} />
        <LineBreak paddingBottom={0}/>
        </>
        {/* } */}
        <div className={styles.shareContainer}>
        <div className={styles.clickShare} onClick={() => setShare(!showShare)}>

        <svg width={34} height={44} viewBox="0 0 24 24"><path d="M8.547 3.817L5.704 6.203a.25.25 0 0 1-.361-.042l-.3-.401a.25.25 0 0 1 .036-.338l3.579-3.123a.5.5 0 0 1 .672.013l.005.005.017.014 3.6 3.175a.25.25 0 0 1 .035.337l-.3.402a.25.25 0 0 1-.361.042L9.534 3.945V8H13.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h4.047V3.817zm0 5.183H5v5h8V9H9.534v2.75a.25.25 0 0 1-.25.25h-.487a.25.25 0 0 1-.25-.25V9z" fillRule="evenodd"></path>
          </svg>
        <span>Share</span>
        </div>
        {showShare &&
        <ShareIcons width={width}>

        <a href={`https://www.pinterest.com/pin/create/button/?url=${process.env.BASE_URL+router.asPath}&media=${mainImage.url}&description=${data.title} by ${data.artist} on Materialism`} target="_blank" rel="noopener noreferrer">
        <svg width={32} height={32} viewBox="0 0 62 62" fill="none">
    <path
      d="M32,16c-8.8,0-16,7.2-16,16c0,6.6,3.9,12.2,9.6,14.7c0-1.1,0-2.5,0.3-3.7 c0.3-1.3,2.1-8.7,2.1-8.7s-0.5-1-0.5-2.5c0-2.4,1.4-4.1,3.1-4.1c1.5,0,2.2,1.1,2.2,2.4c0,1.5-0.9,3.7-1.4,5.7 c-0.4,1.7,0.9,3.1,2.5,3.1c3,0,5.1-3.9,5.1-8.5c0-3.5-2.4-6.1-6.7-6.1c-4.9,0-7.9,3.6-7.9,7.7c0,1.4,0.4,2.4,1.1,3.1 c0.3,0.3,0.3,0.5,0.2,0.9c-0.1,0.3-0.3,1-0.3,1.3c-0.1,0.4-0.4,0.6-0.8,0.4c-2.2-0.9-3.3-3.4-3.3-6.1c0-4.5,3.8-10,11.4-10 c6.1,0,10.1,4.4,10.1,9.2c0,6.3-3.5,11-8.6,11c-1.7,0-3.4-0.9-3.9-2c0,0-0.9,3.7-1.1,4.4c-0.3,1.2-1,2.5-1.6,3.4 c1.4,0.4,3,0.7,4.5,0.7c8.8,0,16-7.2,16-16C48,23.2,40.8,16,32,16z"
      fill="#000000"
      />
  </svg>          </a>
        <a href={`https://twitter.com/intent/tweet?original_referer=${process.env.BASE_URL+router.asPath}&text=${data.title} by ${data.artist} on Materialism&url=${process.env.BASE_URL+router.asPath}`} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 -3 18 18" height={26}><path d="M6.26 15a8.63 8.63 0 0 1-4.64-1.35c.24.015.48.015.72 0a6.09 6.09 0 0 0 3.76-1.3 3 3 0 0 1-2.83-2.1c.188.032.379.048.57.05a3 3 0 0 0 .8-.11 3 3 0 0 1-2.43-3c.42.233.89.363 1.37.38a3 3 0 0 1-1.34-2.49 3 3 0 0 1 .4-1.52 8.6 8.6 0 0 0 6.24 3.16A3.84 3.84 0 0 1 8.81 6a3 3 0 0 1 5.24-2A6 6 0 0 0 16 3.22a3.06 3.06 0 0 1-1.36 1.68 6 6 0 0 0 1.74-.48A6.1 6.1 0 0 1 14.87 6v.39A8.56 8.56 0 0 1 6.26 15" fillRule="evenodd"></path></svg>
        </a>
        <CopyToClipboard
              text={`${process.env.BASE_URL}${router.asPath}`}
              onCopy={() => setIsCopied(true)}
            >
        {isCopied ?
        <span>copied</span> :
          <span>copy to clipboard</span>
        }
        </CopyToClipboard>
      </ShareIcons>
}
        <div style={{display: 'flex', flex: 6}} />
        <div style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}} onClick={() => {setFullImg(!fullImg); handleExpand()}} >

        <span className={styles.expandSpan}>Expand</span>
        <div style={{width: '20px', paddingTop: '12px', paddingLeft: '3px', marginRight: '8px'}}>

        <Expand />
        </div>
        </div>
        </div>
        </div>
      </>
  );
}

export async function getStaticProps(paths) {
  const pid = paths.params.pid;
  const res = await client.fetch(pageQuery, { pid });
  const json = await res;
  return { props: { data: json[0] } };
}

export async function getStaticPaths() {
  const request = await client.fetch(
    `*[_type == "artwork" && defined(slug.current)][].slug.current`
  );
  return {
    paths: request.map((slug) => ({ params: { pid: `${slug}` } })),
    fallback: false,
  };
}

export default Artwork;

const ShareIcons = styled.div<{width: number}>`
display: flex;
flex-direction: row;
cursor: pointer;
& span {
  font-size: 1.2rem;
  margin-top:${(p) => p.width <= 320 ? '3px' : '10px'};
  margin-left: 8px;
  font-style: italic;
}
`