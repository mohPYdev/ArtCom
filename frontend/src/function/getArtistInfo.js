import axios from "axios";

export default  async function getArtistInfo (id ){

    let config = {
        headers : {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    }

    const url = `http://artcom-sjavanmard.fandogh.cloud/auth/users/${id}/profile/`
    const { data } = await axios.get(url, config);
    const {first_name , last_name , description , image  , following_count} = data ;
    return {first_name , last_name , description , image  , following_count , id}

}