import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import { CSSTransition } from "react-transition-group";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NextSeo } from "next-seo";
import styled from "styled-components"

import { useAppContext } from '../../Utils/state'
import Distance from '../../Utils/Distance';
import styles from './[pid].module.css'
import Header from "../../Components/Header/Header";
import { LineBreak } from "../../Components/Layout/LineBreak";
import useWindowDimensions from "../../Utils/useWindowDimensions";
import Overlay from "./Transitions/Overlay";
import Text from "./Transitions/Text";
import Head from './Transitions/Head'
import Expand from "../../Components/Layout/Expand";
import Pintrest from "./SVGs/Pintrest";
import Twitter from "./SVGs/Twitter";

const builder = imageUrlBuilder(client);

const pageQuery = groq`
*[_type == 'artwork' && slug.current == $pid]{
  ...,
  "artist": artist -> name,
  "mainImage": image.asset->
}`;

const nearQuery = groq`
*[_type == 'artwork']{...,
 artist->{name},
}`


const SingleMap = dynamic(() => import("../../Components/Content/SingleMap"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const NearMap = dynamic(() => import("../../Components/Content/NearMap"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

type ArtworkProps = {
  config: any,
  data: any
}



function Artwork({ config, data = {} }: ArtworkProps) {
  const artContext = useAppContext();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const mainImage = data.mainImage
  
  const [fullImg, setFullImg] = useState(false)
  const [height, setHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [hideMap, setHideMap] = useState(false)
  const [showShare, setShare] = useState(false)
  const [isCopied, setIsCopied] = useState(false);
  const [nearWorks, setNearWorks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [image, setImage] = useState("");

  function useScreenOrientation() {
    if (process.browser){
      const [orientation, setOrientation] = useState(window.orientation);
      
      useEffect(() => {
        const handleOrientationChange= () => setOrientation(window.orientation);
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => window.removeEventListener('orientationchange', handleOrientationChange);
      }, []);
      
      return orientation;
    }
  }

  const orient = useScreenOrientation();
  
  const handleExpand = () => {
    if (fullImg) {
      setTimeout(() => {setHideMap(false)}, 1000)
    } else {
      setTimeout(() => {setHideMap(true)}, 10)
    }
  }
  
  const nearBy = () => {
    setFetching(true);
    let result;
    const query = async () => {
    const res = await client.fetch(nearQuery);
    const json = await res;
    result = json;
    const sortedNearBy = Distance([data.location.lat, data.location.lng], result);
    setNearWorks(sortedNearBy.filter(obj => {
      return obj.distance < 0.5
    }));
    setFetching(false);
    };
    if (artContext.works.length > 0){
      const sortedNearBy = Distance([data.location.lat, data.location.lng], artContext.works);
      setNearWorks(sortedNearBy.filter(obj => {
        return obj.distance < 0.5
      }));
      setFetching(false);
    } else {
      query();
    }
  }

  const handleDivClick = () => {
    if (fullImg){
      setFullImg(!fullImg)
    } else {return}
  }

  
  useEffect(() => {
    
    function setSize(){
      setHeight(window.innerHeight)
      setImgWidth(window.innerWidth)
    }
    window.addEventListener("resize", setSize);
    var mql = window.matchMedia("(orientation: portrait)");

    let agent = navigator.userAgent;
    var isDesktop = /Linux/i.test(agent)
    setImage(`url(${builder.image(data.image).auto("format").width(imgWidth).height(height).dpr(1).url()})`)
    if (!mql.matches && !isDesktop ){
      setImage(`url(${builder.image(data.image).auto("format").width(imgWidth).height(height).dpr(1).url()})`)
    }

    if (window !== undefined){
      setImgWidth(window.innerWidth );
      setHeight(window.innerHeight);
    }

  }, [imgWidth, height, orient, router.asPath])


  return (
      <>
    <NextSeo
      title={data.title + " by " + data.artist}
      description="Materialism - art within reach"
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        url: `${process.env.BASE_URL+router.asPath}`,
        title: `${data.title + " by " + data.artist} - Materialism`,
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
        site: `${process.env.BASE_URL}`,
        cardType: "summary_large_image",
      }}
    />
    <Head fullImg={fullImg}>
      <Header paddingBottom={0} />
        </Head>
        <div className={styles.container} style={{maxHeight: `${height}px`, minHeight: `${height - 100}px`}}>
        <Overlay fullImg={fullImg} handleDivClick={handleDivClick} height={height} />
        <div className={styles.fade} style={{
          backgroundColor: mainImage.metadata.palette.dominant.background,
          color: mainImage.metadata.palette.dominant.foreground }}>
        <CSSTransition in={fullImg} timeout={1000}>
          {(state) => <Animation state={state} style={{
            backgroundImage: `${image}`,
          }}>
            
          <TextContainer>
            <Spacer flex={1} />
            <Text fullImg={fullImg}>
              <TextSpan onClick={() => {setFullImg(!fullImg); handleExpand()}}>{data.title}, {data.year}</TextSpan>
              <Link href={{ pathname: '/artist/' + data.artist}}>
                <a style={{textAlign: 'start'}}>
                <span>{data.artist}</span>
                  </a>
              </Link>
            </Text>
            
          </TextContainer>
            </Animation>}
            </CSSTransition>

          </div>
        <>
        <LineBreak paddingBottom={0} />
        {
          nearWorks.length < 1 ?
          <SingleMap artWorks={data} width={width} height={width > 425 ? `42vh` : 220} />
          :
          <NearMap artWorks={nearWorks} width={width} height={width > 425 ? `42vh` : 220}
            zoom={15}
          />
        }
        <LineBreak paddingBottom={0}/>
        </>
        {/* } */}
        <div className={styles.shareContainer}>
        <div className={styles.clickShare} onClick={() => setShare(!showShare)}>

        <svg width={34} height={44} viewBox="0 0 24 24"><path d="M8.547 3.817L5.704 6.203a.25.25 0 0 1-.361-.042l-.3-.401a.25.25 0 0 1 .036-.338l3.579-3.123a.5.5 0 0 1 .672.013l.005.005.017.014 3.6 3.175a.25.25 0 0 1 .035.337l-.3.402a.25.25 0 0 1-.361.042L9.534 3.945V8H13.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h4.047V3.817zm0 5.183H5v5h8V9H9.534v2.75a.25.25 0 0 1-.25.25h-.487a.25.25 0 0 1-.25-.25V9z" fillRule="evenodd"></path>
          </svg>
        {!showShare && <span>Share</span>}
        </div>
        {showShare &&
        <ShareIcons width={width}>

        <a href={`https://www.pinterest.com/pin/create/button/?url=${process.env.BASE_URL+router.asPath}&media=${mainImage.url}&description=${data.title} by ${data.artist} on Materialism`} target="_blank" rel="noopener noreferrer">
        <Pintrest />
        </a>
        <a href={`https://twitter.com/intent/tweet?original_referer=${process.env.BASE_URL+router.asPath}&text=${data.title} by ${data.artist} on Materialism&url=${process.env.BASE_URL+router.asPath}`} target="_blank" rel="noopener noreferrer">
        <Twitter />
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
        <Spacer flex={3} />
        {
          nearWorks.length < 1 ?
          <span className={styles.expandSpan} onClick={() => nearBy()}> {fetching ? 'Fetching...' : 'Near By'} </span>
          : null
        }
        <Spacer flex={3} />
        <ExpandWrapper onClick={() => {setFullImg(!fullImg); handleExpand()}} >
        <span className={styles.expandSpan}>Expand</span>
        <ExpandContainer><Expand /></ExpandContainer>
        </ExpandWrapper>
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

const Animation = styled.div<{state: string}>`
background-position: 0% 0%;
background-repeat: no-repeat;
background-attachment: fixed;
transition: height 1000ms cubic-bezier(0.47, 0, 0.75, 0.72);
height: ${({ state }) => (state === 'entering' || state === 'entered' ? '100vh' : '42vh')};
`

const TextContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`

const TextSpan = styled.span`
cursor: pointer;
text-align: end;
`

const Spacer = styled.div<{flex: number}>`
display: flex;
flex: ${(p) => p.flex};
`

const ExpandWrapper = styled.div`
display: flex;
flex-direction: row;
cursor: pointer;
`

const ExpandContainer = styled.div`
width: 20px;
padding-top: 12px;
padding-left: 3px;
margin-right: 8px;
`

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