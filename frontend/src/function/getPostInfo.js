import axios from "axios";

export default  async function getPostInfo (user_id , post_id ){
    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }
    const url = `http://localhost:8000/post/${user_id}/posts/${post_id}/`
    const { data } = await axios.get(url , config);
    const { image  , name , description , price , like_count , liked } = data ;
    return { image  , name , description , price ,like_count , liked }


}