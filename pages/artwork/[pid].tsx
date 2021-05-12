import React, { useEffect } from "react";
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
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const mainImage = data.mainImage
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
          <span>{data.title}, {data.year}</span>
            <Link href={{ pathname: '/artist/' + data.artist}}>
              <a>

        <span>{data.artist}</span>
              </a></Link>
        </div>
            </div>
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

