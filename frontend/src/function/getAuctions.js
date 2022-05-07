import axios from "axios";

export default async function getAuctions() {
  let config = {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  let allData;
    const url = `http://localhost:8000/post/auctions`;
    const { data } = await axios.get(url, config);
    allData = data;
  return allData;
}
