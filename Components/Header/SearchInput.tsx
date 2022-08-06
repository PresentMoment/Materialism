import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Media, MediaContextProvider } from '../Layout/media';

const preventDefault = (f) => (e) => {
  e.preventDefault();
  f(e);
};

export default function SearchInput(props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleParam = (setValue) => (e) => setValue(e.target.value);
  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  }, [inputElement]);
  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: "/search",
      query: { q: query },
    });
  });
  return (
    <MediaContextProvider>

    <form
      onSubmit={handleSubmit}
      >
      <Media lessThan="md">
      <input
        onChange={handleParam(setQuery)}
        type="text"
        id="search"
        ref={inputElement}
        autoFocus={true}
        placeholder={'Search by artist or artwork'}
        style={{width: '100%', border: 'none', borderBottom: '1px solid rgb(0, 0, 0)', fontFamily: 'Cormorant Garamond,serif', fontSize: '1.8em', backgroundColor: 'rgba(255,255,255,0)', outline: '0', background: 'none', color: 'rgb(0,0,0)', textAlign: 'left', marginTop: '-2px'}}
        />
      </Media>
      <Media greaterThanOrEqual="md">
      <input
        onChange={handleParam(setQuery)}
        type="text"
        id="search"
        ref={inputElement}
        autoFocus={true}
        placeholder={'Search by artist or artwork'}
        style={{width: '100%', border: 'none', borderBottom: '1px solid rgb(0, 0, 0)', fontFamily: 'Cormorant Garamond,serif', fontSize: '1.8em', backgroundColor: 'rgba(255,255,255,0)', outline: '0', background: 'none', color: 'rgb(0,0,0)', textAlign: 'left', marginTop: '0'}}
        />
      </Media>
    </form>
        </MediaContextProvider>
  );
}
