import axios from "axios";

export default  async function getAuctions ( ){
    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }
    const url = `http://localhost:8000/post/auctions`;
    const { data } = await axios.get(url , config);
 
    return data ;
}