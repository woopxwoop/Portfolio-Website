const UID = "621003558";
const proxies = [
  "https://corsproxy.io/?",
  "https://api.cors-anywhere.herokuapp.com/",
  "https://cors-anywhere.herokuapp.com/",
];

export async function getUserData() {
  console.log("fetching from enka API");
  return fetch(`${proxies[0]}https://enka.network/api/uid/${UID}/?info`, {
    headers: {
      "User-Agent": "woopxwoop",
    },
  }).then((res) => res.json());
}
