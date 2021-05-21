import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import { Transition } from "react-transition-group";

import styles from './[pid].module.css'

import Layout from '../../Components/Layout'
import { LineBreak } from "../../Components/Layout/LineBreak";
import useWindowDimensions from "../../Utils/useWindowDimensions";
import Overlay from "./Transitions/Overlay";
import Text from "./Transitions/Text";
import { maxHeight } from "styled-system";

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

function Artwork({ config, data = {} }) {

  const imgHeight = data.mainImage.metadata.dimensions.height;
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const mainImage = data.mainImage

  const [fullImg, setFullImg] = useState(false)
  const [imgDimensions, setImgDimensions] = useState(0)
  const [hideMap, setHideMap] = useState(false)

  const bgStyle = {
    transition: `height ${1000}ms ease-in-out`,
    height: '30vh',
    backgroundImage: `url(${builder.image(data.image).auto("format").width(width).height(imgDimensions).url()})`,
    backgroundPosition: '0% 0%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    //backgroundSize: 'cover',
    width: `${width}px`,
    maxHeight: `${height - 58}px`
  };
  
  const bgTransitions = {
    entering: { height: `${height}px`,
  },
    entered: { height: `${height}px`,
  },
    exiting: { height: '30vh',
  },
    exited: { height: '30vh',
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
      <Layout>
        <div className={styles.container} style={{maxHeight: `${height - 58}px`}}>
        <Overlay fullImg={fullImg} handleDivClick={handleDivClick} height={height} />
        <div className={styles.fade} />

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


        {!hideMap &&
        <>
        <LineBreak />
        <SingleMap artWorks={data} width={width} />
        <LineBreak />
        </>
        }
        </div>
      </Layout>
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