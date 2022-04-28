import axios from "axios";

export default  async function getExhibitions (){
    const url = `http://localhost:8000/post/exhibitions`;
    const { data } = await axios.get(url);
    console.log(data);
    const {posts , date_begin , date_end} =  data[0] ;
    console.log(posts)
    // for(let i=0;i< posts.lendth ; i++)
    const posts_list=  posts.map( element =>  element.image);
    // console.log(images_list)

    return {posts_list , date_begin , date_end } ;
}