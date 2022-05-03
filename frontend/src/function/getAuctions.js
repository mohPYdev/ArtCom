import axios from "axios";

export default async function getAuctions(state, artistId) {
  let config = {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  let allData;
  if (state === "home") {
    const url = `http://localhost:8000/post/auctions`;
    const { data } = await axios.get(url, config);
    allData = data;
  }
  if (state === "myProfile") {
    const url = `http://localhost:8000/post/auctions`;
    const { data } = await axios.get(url, config);
    allData = data;
  }
  if (state === "otherProfile") {
    const url = `http://localhost:8000/post/auctions`;
    const { data } = await axios.get(url, config);
    allData = data;
  }
  return allData;
}
