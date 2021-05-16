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
import { paddingTop } from "styled-system";

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

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  display: "none",
  top: -283,
  zIndex: -1
};

const transitionStyles = {
  entering: { opacity: 1, zIndex: 9, position: 'fixed', left: 0, top: -283, display: 'block', width: '100vw' },
  entered: { opacity: 1, zIndex: 9, position: 'fixed', left: 0, top: -283,  display: 'block', width: '100vw' },
  exiting: { opacity: 0, zIndex: -1, position: 'fixed', left: 0, top: -283, display: 'block', width: 0, height: 0 },
  exited: { opacity: 0, zIndex: -1, position: 'fixed', left: 0, top: -283, display: 'block', width: 0, height: 0 },
};




function Artwork({ config, data = {} }) {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const mainImage = data.mainImage
  const [fullImg, setFullImg] = useState(false)
  const [imgDimensions, setImgDimensions] = useState(0)

  useEffect(() => {
    if (window !== undefined){
  
      setImgDimensions(window.innerHeight + 284);
    }
  }, [])
  return (
      <Layout>
        <div className={styles.container}>
        <div style={{
              backgroundColor: mainImage.metadata.palette.dominant.background,
              color: mainImage.metadata.palette.dominant.foreground
            }}>

        <div className={styles.infoContainer} style={{backgroundImage: `url(${builder.image(data.image).auto("format").width(width).height(400).url()})`}}>
            <div style={{display: 'flex', flex: 1}} />
            <div className={styles.info}>
              <span onClick={() => {setFullImg(!fullImg)}} style={{cursor: 'pointer'}}>{data.title}, {data.year}</span>
                <Link href={{ pathname: '/artist/' + data.artist}}>
                  <a style={{textAlign: 'center'}}>
    
            <span>{data.artist}</span>
                  </a></Link>
            </div>
                </div>
            </div>
          <Transition in={fullImg} timeout={duration}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
            <img onClick={() => {setFullImg(!fullImg)}} style={{cursor: 'pointer'}} src={builder.image(data.image).auto("format").width(width).height(imgDimensions).url()} /> 

            </div>
          )}
        </Transition>
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

