import axios from "axios";

export default  async function getOneExhibition (id ){
    //console.log(id)
    const url = `http://localhost:8000/post/exhibitions/${id+1}`;
    const { data } = await axios.get(url);
    console.log(data);
    const {posts , date_begin , date_end , artist } =  data ;
    // console.log(posts)
    // for(let i=0;i< posts.lendth ; i++)
    //const posts_list = posts.map( element =>  element.image);
    // console.log(images_list);

    return {posts , artist , date_end } ;
}