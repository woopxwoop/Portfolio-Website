const UID = 621003558;

export async function getUserData() {
  fetch(`https://enka.network/api/uid/${UID}/?info`, {})
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
