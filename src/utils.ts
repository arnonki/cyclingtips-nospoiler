import React, { useEffect, useState } from "react";

export const collectNoSpoilerElemnts = () : Array<Element> => {
  let ret: Array<Element> = []
  
  Array.from(document.getElementsByClassName("block-race-results__wrapper")).forEach((elem) => {
    ret.push(elem)
  })
  Array.from(document.getElementsByClassName("home-grid__other-post")).forEach((elem) => {
    if (elem.querySelectorAll('a[href="https://cyclingtips.com/category/racing-feature/"]').length != 0) {
      ret.push(elem)
    }
  })
  Array.from(document.getElementsByClassName("home-grid__first-post")).forEach((elem) => {
    if (elem.querySelectorAll('a[href="https://cyclingtips.com/category/racing-feature/"]').length != 0) {
      ret.push(elem)
    }
  })
  Array.from(document.getElementsByClassName("home-grid__next-post")).forEach((elem) => {
    if (elem.querySelectorAll('a[href="https://cyclingtips.com/category/racing-feature/"]').length != 0) {
      ret.push(elem)
    }
  })
  Array.from(document.getElementsByClassName("splide__slide")).forEach((elem) => {
    if (elem.querySelectorAll('a[href="https://cyclingtips.com/category/racing-feature/"]').length != 0) {
      ret.push(elem)
    }
  })

  return ret
}

export const useDebounce = (value: any, delay: number): any => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}