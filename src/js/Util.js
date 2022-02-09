import * as THREE from "three";

const FETCH_MULTIPLY_FACTOR = 0.5;
const wait = t => new Promise(r => setTimeout(r, t))

/**
 * @param {string} url
 * @returns {Promise<Response>}
 */
export function reFetch(url) {
    return new Promise(async resolve => {
        let tries = 0;
        
        while (true) {
            if (tries >= 10) tries = 0;
          
            try {
                return resolve(await fetch(url));
            } catch (e) {}
            
            await wait(tries * FETCH_MULTIPLY_FACTOR * 1000);
            tries++;
        }
    });
}

/**
 *
 * @param {String} url
 * @returns {Promise<THREE.Texture>}
 */
export function retextureLoader(url) {
  return new Promise(async (resolve, reject) => {
    let stop = false;
    const TextureLoader = new THREE.TextureLoader();
    const wait = (time) => new Promise((res) => setTimeout(res, time));
    let tries = 0;
    let multiplyFactor = 0.5;
    while (!stop) {
      if (tries >= 10) tries = 0;
      try {
        let texture = await TextureLoader.loadAsync(url);
        stop = true;
        resolve(texture);
      } catch (e) {}
      await wait(tries * multiplyFactor * 1000);
      tries++;
    }
  });
}

/**
 * @param {string} url
 * @param {string} type
 */
export async function reloadBgImage(url, domElement) {
    let tries = 0, multiplyFactor = 0.5;

    while (true) {
        if (tries >= 10) tries = 0;
        try {
            let img = new Image();

            img.src = url;
            img.onload = () => domElement.style.backgroundImage = `url(${url})`;
        } catch (e) {}

        await wait(tries * multiplyFactor * 1000);
        tries++;
    }
}

export const NOOP = () => {};