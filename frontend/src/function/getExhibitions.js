import axios from "axios";

export default  async function getExhibitions ( state , artistId ){
    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }
    let allData ;

    if(state === "home"){
    const url = `https://artcom-sjavanmard.fandogh.cloud/post/exhibitions/`;
    const { data } = await axios.get(url , config);
    allData = data
    console.log(data)
    }
    if(state === "myProfile"){
        const url = `https://artcom-sjavanmard.fandogh.cloud/post/exhibitions/me/`
        const { data } = await axios.get(url , config);
        allData = data
    }
    if(state === "otherProfile"){
        const url = `https://artcom-sjavanmard.fandogh.cloud/post/exhibitions/`
        const { data } = await axios.get(url , config);
        allData = data.filter(item => item.artist == artistId)
    }
    return allData ;

    
}