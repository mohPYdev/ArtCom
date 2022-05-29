import {React , useEffect, useState} from 'react';
import './add_auction.css';

import {useAxios} from '../hooks/useAxios';
import {useAlert} from 'react-alert'
import {useAuthContext} from '../hooks/useAuthContext';
import BackToHome from '../component/BackToHome';

export default function Add_Auction(){

    const {user} = useAuthContext()
    const {data:posts} = useAxios('https://artcom-sjavanmard.fandogh.cloud/post/posts/');
    const {data:auctions} = useAxios('https://artcom-sjavanmard.fandogh.cloud/post/auctions/');

    const alert = useAlert()


    const[auctionselect_addau, set_auctionselect_addau] = useState('');
    const[postselect_addau, set_postselect_addau] = useState('');
    const[validPosts, setValidPosts] = useState([]);

    const [url , setUrl] = useState('');
    const {data, postData} = useAxios(url, 'POST');




    useEffect(()=> {
        if(auctionselect_addau !== ''){
            setUrl('https://artcom-sjavanmard.fandogh.cloud/post/auctions/'+auctionselect_addau+'/add-post/');
        }
    }, [auctionselect_addau]);


    useEffect(() => {
        if (data?.detail){
            alert.error("این پست قبلا به مزایده اضافه شده است")
        }
        else if (data){
            alert.success('پست با موفقیت به مزایده اضافه شد')
        }
    },[alert, data]);


    useEffect(() => {
        if (posts){
            setValidPosts(validPosts => [...validPosts, ...posts.filter(post => post.for_sale === true && post.artist.user.id == user.id)]);
        }
    }, [posts, user]);
    


    const clearForm = () => {
        set_auctionselect_addau('');
        set_postselect_addau('');
    }


    const changeAuction=(event)=>{
        set_auctionselect_addau(event.target.value)
    }
    const changePost=(event)=>{
        set_postselect_addau(event.target.value)
    }
    const submitting=(event)=>{
        event.preventDefault();
        postData({
            post:[postselect_addau,]
        });
  
        clearForm()
    }

    return(

        <div className='main_div_addau'>
            <BackToHome />
            {/*adding page title*/}
            <div id='p_addau'>
                <p>
                    <b><u> شرکت در مزایده </u></b>
                </p>
            </div>

            {/*selecting which auction*/}
            <form onSubmit={submitting} id='form_addex' method="get">
                
                {/*adding available auctions}*/}
                {auctions && <select value={auctionselect_addau} onChange={changeAuction} name='auctionselect_addau' id='auctionselect_addau'>
                    <option value=" " hidden >انتخاب مزایده</option>
                    <option value=" " disabled selected >انتخاب مزایده</option>
                    {auctions.map(auction => (
                    <option key={auction.id} value={auction.id}>{auction.date_begin}</option>
                    ))}
                </select>}

                {/*adding post*/}
                {posts && <select value={postselect_addau} onChange={changePost} name='postselect_addau' id='postselect_addau' >
                     <option value=" " hidden >انتخاب پست</option>
                    <option value=" " disabled selected >انتخاب پست</option>
                    {validPosts.map(post => (
                        <option key={post.id} value={post.id}>{post.name}</option>
                    ))}
                </select>}
                
                <input type='submit' id='submit_addau' name='submit_addau' value='شرکت'/>
            </form>

        </div>
    )
}