import axios from "axios";

export default  async function getOneExhibition (id ){
    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }
    const url = `http://localhost:8000/post/exhibitions/${id+1}`;
    const { data } = await axios.get(url , config);

    const {posts , date_begin , date_end , artist } =  data ;

    return {posts , artist } ;
}