import axios from "axios";

export default  async function getExhibitions ( state , artistId ){
    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }
    let allData ;

    if(state === "home"){
    const url = `http://localhost:8000/post/exhibitions`;
    const { data } = await axios.get(url , config);
    console.log(data)
    allData = data
    }
    if(state === "myProfile"){
        const url = `http://localhost:8000/post/exhibitions/me`
        const { data } = await axios.get(url , config);
        allData = data
    }
    if(state === "otherProfile"){
        const url = `http://localhost:8000/post/exhibitions/${artistId}/`
        const { data } = await axios.get(url , config);
        allData = data
    }
    return allData ;

    
}