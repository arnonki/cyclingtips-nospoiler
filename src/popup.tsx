import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useChromeStorageSync } from 'use-chrome-storage';
import { useDebounce } from "./utils";

const Popup = () => {
  const [blurSizeStorage, setBlurSizeStorage] = useChromeStorageSync("blurSize");
  const [noSpoilerModeStorage, setNoSpoilerModeStorage] = useChromeStorageSync("noSpoilerEnabled", false)
  const [sliderValue, setSliderValue] = useState("10")
  const sliderDebouncedValue = useDebounce(sliderValue, 50)

  useEffect(() => {
    setBlurSizeStorage(sliderDebouncedValue)
  }, [sliderDebouncedValue]);



  const toggleNoSpoiler = () => {
    setNoSpoilerModeStorage(!noSpoilerModeStorage)
  };

  return (
    <>
    <div className="slidecontainer">
      <label>Blur intensity</label>
      <input type="range" min="1" max="40" value={sliderValue} className="slider" id="myRange" onChange={(e) => {
        try {
          let newBlur = e.target.value;
          setSliderValue(e.target.value);
        } catch (e) {
          console.log("Error")
        }
        console.log(e)
      }}></input>
    </div>
      <button onClick={toggleNoSpoiler}>{ noSpoilerModeStorage ? "Hide Spoilers" : "Show spoilers" }</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
