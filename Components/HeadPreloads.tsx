import React from "react";
import Head from "next/head";

import { mediaStyles } from "./Layout/media";

export default function HeadPreloads() {
  return (
    <>
      <Head>
        <title>Material</title>
        <link
          rel="preload"
          href="/fonts/EB_Garamond/static/EBGaramond-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/EB_Garamond/static/EBGaramond-Medium.ttf"
          as="font"
          crossOrigin=""
        />

        <link
          rel="preload"
          href="/fonts/Raleway/static/Raleway-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Raleway/static/Raleway-Medium.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Raleway/static/Raleway-Light.ttf"
          as="font"
          crossOrigin=""
        />

        <link
          rel="preload"
          href="/fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Cormorant_Garamond/CormorantGaramond-Medium.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Cormorant_Garamond/CormorantGaramond-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="shortcut icon" href="/favicon.ico" />

<script src='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
<style
type="text/css"
dangerouslySetInnerHTML={{__html: mediaStyles}}
/>

      </Head>
    </>
  );
}
