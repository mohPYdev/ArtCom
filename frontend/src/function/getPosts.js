import axios from "axios";

export default async function getAuctions( artistId) {
  let config = {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  let allData;
    const url = `http://artcom-sjavanmard.fandogh.cloud/post/${artistId}/posts/`;
    const { data } = await axios.get(url, config);
    allData = data;
    console.log(data)

  return allData;
}
