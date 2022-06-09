import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useChromeStorageSync } from 'use-chrome-storage';
import { useDebounce } from "./utils";

const Options = () => {
  const [status, setStatus] = useState<string>("");
  const [blurSize, setBlurSize] = useState<number>(20);

  const [blurSizeStorage, setBlurSizeStorage] = useChromeStorageSync("blurSize");
  const [sliderValue, setSliderValue] = useState(blurSizeStorage)


  useEffect(() =>{
    setBlurSize(blurSizeStorage)
  }, [blurSizeStorage]);


  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        blurSize: sliderValue
      },
      () => {
        // Update status to let user know options were saved.
        
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div style={{"minHeight": "300px"}}>
      <h1>Cycling Tips no spoiler mode</h1>
      <div>
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
      <br/>
      <div style={{}}>
        <div>{status}</div>
        
        <button onClick={saveOptions}>Save</button>

      </div>

      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
