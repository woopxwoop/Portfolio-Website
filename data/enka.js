const UID = 621003558;

export async function getUserData() {
  fetch(`https://enka.network/api/uid/${UID}/?info`, {
    headers: {
      "Access-Control-Allow-Origin":
        "https://woopxwoop.github.io/Portfolio-Website/",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
