import axios from "axios";

export default  async function getArtistInfo (id ){

    const url = `http://localhost:8000/auth/users/${id}`
    const { data } = await axios.get(url);
    const { image } = data ;
    //console.log(data)
    return {image , id }

}