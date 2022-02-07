import { reFetch } from "./Util";

export default function moonData(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await reFetch(
        "https://ssd-abh80.vercel.app/satellite/" + name //https://ssd-abh80.vercel.app/satellite/
      );
      const json = await data.json();
      resolve(json);
    } catch (e) {
      reject(e);
    }
  });
}
