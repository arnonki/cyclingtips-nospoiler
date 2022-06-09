import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useChromeStorageSync } from 'use-chrome-storage';
import { collectNoSpoilerElemnts } from "./utils";


const toggleNoSpoilerImpl = (elemnts: Array<Element>) => {
  elemnts.forEach(elem => elem.classList.toggle("noSpoiler"))
}

const App = () => {
  const [blurSize, setBlurSize] = useChromeStorageSync("blurSize", 20);
  const [mounted, setMounted] = useState<boolean>(false);
  const [noSpoilerModeStorage, setNoSpoilerModeStorage] = useChromeStorageSync("noSpoilerEnabled", false)

  const toggleNoSpoiler = (event: React.MouseEvent<HTMLElement>) => {
    document.querySelectorAll<HTMLElement>('#header > div.header__top > div.header__top-left > svg.icon.icon-menu.entered').forEach(n => n.dispatchEvent(new Event('click')));
    setNoSpoilerModeStorage(!noSpoilerModeStorage)
  }

  const elemntsToManipulate = collectNoSpoilerElemnts()

  useEffect(() => {
    if (!mounted) {
      elemntsToManipulate.forEach(el => {
        let newOverlayDiv = document.createElement("div")
        newOverlayDiv.classList.add("noSpoilerOverlay")
        el.prepend(newOverlayDiv)
      })
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--blur-size',
      `${blurSize}px`
    );
  }, [blurSize])

  useEffect(() => {
    toggleNoSpoilerImpl(elemntsToManipulate)
  }, [noSpoilerModeStorage])

  return (
    <a id="change-mode" className="mt-3" style={{ display: "flex" }} onClick={toggleNoSpoiler}>
      <img width="30" height="30" alt="change mode icon" src="https://cdn-ctstaging.pressidium.com/wp-content/themes/cyclingtips/assets/images/icons/sun.svg" data-src="" data-icon-sun="https://cdn-ctstaging.pressidium.com/wp-content/themes/cyclingtips/assets/images/icons/sun.svg" data-icon-moon="https://cdn-ctstaging.pressidium.com/wp-content/themes/cyclingtips/assets/images/icons/moon.svg" data-ll-status="loaded" className="entered loaded" data-srcset="" data-placeholder-src=""></img>
      <span>{noSpoilerModeStorage ? "No Spoiler Mode" : "Spoiler Mode"}</span>
    </a>
  )
}

let menu = document.getElementsByClassName("menu-header")[0]
const app = document.createElement('div');

app.id = 'root';


if (menu) {
  menu.appendChild(app);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
