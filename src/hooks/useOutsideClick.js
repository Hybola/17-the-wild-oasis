import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCaptering = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log("Clicking outside modal");
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCaptering);
    return () =>
      document.removeEventListener("click", handleClick, listenCaptering);
  }, [handler, listenCaptering]);
  return { ref };
}
