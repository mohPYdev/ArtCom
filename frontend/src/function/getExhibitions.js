import axios from "axios";

export default  async function getExhibitions ( ){
    const url = `http://localhost:8000/post/exhibitions`;
    const { data } = await axios.get(url);
    console.log(data);
    return data ;
}