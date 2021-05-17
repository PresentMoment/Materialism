import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import styles from './[pid].module.css'
import Layout from '../../Components/Layout'
import { LineBreak } from "../../Components/Layout/LineBreak";
import useWindowDimensions from "../../Utils/useWindowDimensions";

import { Transition } from "react-transition-group";
import { zIndex } from "styled-system";

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
  console.log(imgDimensions)

  const bgStyle = {
    transition: `height ${1000}ms ease-in-out`,
    height: '30vh',
    backgroundImage: `url(${builder.image(data.image).auto("format").width(width).height(imgDimensions).url()})`,
    backgroundPosition: '0% 0%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  };
  
  const bgTransistions = {
    entering: { height: '100vh',
  },
    entered: { height: '100vh',
  },
    exiting: { 
    height: '30vh',
     },
    exited: { 
    height: '30vh',

     },
  };

  const overlayStyle = {
    transistion: `opacity ${1000}ms ease-in-out`,
    height: '100%',
    width: '100vw',
    backgroundColor: 'black',
    opacity: 0,
    zIndex: 0,
    position: 'absolute'
  }

  const overlayTransistions = {
    entering: { opacity: 0,
  },
    entered: { opacity: 0,
  },
    exiting: { 
    opacity: 0.3,
     },
    exited: { 
      opacity: 0.3,

     },
  };


  useEffect(() => {
    if (window !== undefined){
  
      setImgDimensions(window.innerHeight + 284);
    }
  }, [])
  return (
      <Layout>
        <div className={styles.container}>
        <div className={styles.fade} style={{
              backgroundColor: mainImage.metadata.palette.dominant.background,
              color: mainImage.metadata.palette.dominant.foreground
            }}>

<Transition in={fullImg} timeout={1000}>
{(state) => (
            <div
              style={{
                ...bgStyle,
                ...bgTransistions[state],
              }}
              className={styles.infoContainer}
            >
              <div
                style={{
                  ...overlayStyle,
                  ...overlayTransistions[state],
                }}
              />
            <div style={{display: 'flex', flex: 1}} />
            <div className={styles.info}>
              <span onClick={() => {setFullImg(!fullImg)}} style={{cursor: 'pointer'}}>{data.title}, {data.year}</span>
                <Link href={{ pathname: '/artist/' + data.artist}}>
                  <a style={{textAlign: 'center'}}>
    
            <span>{data.artist}</span>
                  </a></Link>
            </div>
                </div>
          )}
                </Transition>
            </div>
        <LineBreak />
        <SingleMap artWorks={data} />
        <LineBreak />
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

