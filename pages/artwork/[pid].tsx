import React from "react";
import dynamic from 'next/dynamic'
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";

import Layout from '../../Components/Layout'

const builder = imageUrlBuilder(client);
const pageQuery = groq`
*[_type == 'artwork' && slug.current == $pid]{
  ...,
  "artist": artist -> name
}`;

const SingleMap = dynamic(() => import("../../Components/Content/SingleMap"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

function Artwork({ config, data = {} }) {
  const router = useRouter();
  return (
      <Layout>
        <div style={{display: 'flex', flexDirection: 'row'}}>

        <div style={{display: 'flex', flexDirection: 'column'}}>

        <span>Title: {data.title}</span>
        <span>Artist: {data.artist}</span>
        <span>Year: {data.year}</span>
        </div>
        <img
          src={builder.image(data.image).auto("format").width(400).height(400).url()}
          alt={""} />
        <SingleMap artWorks={data} />
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