import {React , useEffect, useState} from 'react';
import './add_auction.css';

import {useAxios} from '../hooks/useAxios';

export default function Add_Auction(){


    const {data:posts} = useAxios('http://localhost:8000/post/posts/');
    const {data:auctions} = useAxios('http://localhost:8000/post/auctions/');




    const[auctionselect_addau, set_auctionselect_addau] = useState('');
    const[postselect_addau, set_postselect_addau] = useState('');

    const url = 'http://localhost:8000/post/auctions/'+auctionselect_addau+'/add-post/';
    const {data, postData} = useAxios(url, 'POST');




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
    }

    return(
        <div className='main_div_addau'>
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
                    <option value="4" disabled selected >انتخاب پست</option>
                    {posts.map(post => (
                        <option key={post.id} value={post.id}>{post.name}</option>
                    ))}
                </select>}
                
                <input type='submit' id='submit_addau' name='submit_addau' value='شرکت'/>
            </form>

        </div>
    )
}