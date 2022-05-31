import React from 'react'

import axios from "axios";

export default async function getOneAuction() {
  let config = {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  let allData;
    const url = `https://artcom-sjavanmard.fandogh.cloud/post/auctions/`;
    const { data } = await axios.get(url, config);
    allData = data;
  return allData;
}
