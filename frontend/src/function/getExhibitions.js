import axios from "axios";

export default  async function getExhibitions ( ){
    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }
    const url = `http://localhost:8000/post/exhibitions`;
    const { data } = await axios.get(url , config);
    console.log(data);
    return data ;
}