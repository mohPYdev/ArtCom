import axios from "axios";

export default  async function getPostInfo (user_id , post_id ){

    const url = `http://localhost:8000/post/${user_id}/posts/${post_id}/`
    const { data } = await axios.get(url);
    const { image  , name , description , price , like_count , liked } = data ;
    //console.log(data)
    return { image  , name , description , price ,like_count , liked }

}