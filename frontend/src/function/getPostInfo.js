import axios from "axios";

export default  async function getPostInfo (id ){

    const url = `http://localhost:8000/post/posts/${id}`
    const { data } = await axios.get(url);
    const { image  , name , description , price } = data ;
    //console.log(data)
    return { image  , name , description , price }

}