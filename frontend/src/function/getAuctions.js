import axios from "axios";

export default async function getAuctions() {
  let config = {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  let allData;
    const url = `http://artcom-sjavanmard.fandogh.cloud/post/auctions/`;
    const { data } = await axios.get(url, config);
    allData = data;
  return allData;
}
