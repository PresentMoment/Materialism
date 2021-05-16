import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

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
    <form
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleParam(setQuery)}
        type="text"
        placeholder="Enter your search here"
        id="search"
        ref={inputElement}
        autoFocus={true}
      />
    </form>
  );
}
