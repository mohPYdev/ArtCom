import {React , useEffect, useState} from 'react';
import './add_auction.css';

export default function Add_Auction(){

    const[auctionselect_addau, set_auctionselect_addau] = useState('');
    const[postselect_addau, set_postselect_addau] = useState('');

    const changeAuction=(event)=>{
        set_auctionselect_addau(event.target.value)
    }
    const changePost=(event)=>{
        set_postselect_addau(event.target.value)
    }
    const submitting=(event)=>{
        event.preventDefault();
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
                <select value={auctionselect_addau} onChange={changeAuction} name='auctionselect_addau' id='auctionselect_addau'>
                    <option value=" " hidden >انتخاب مزایده</option>
                    <option value=" " disabled selected >انتخاب مزایده</option>
                    <option value='1'>مزایده 1</option>
                    <option value='2'>مزایده 2</option>
                    <option value='3'>مزایده 3</option>
                    <option value='4'>مزایده 4</option>
                    <option value='5'>مزایده 5</option>
                    <option value='6'>مزایده 6</option>
                </select>

                {/*adding post*/}
                <select value={postselect_addau} onChange={changePost} name='postselect_addau' id='postselect_addau' size="4" multiple >
                    <option value="4" disabled selected >انتخاب پست</option>
                    <option value='1'>پست 1</option>
                    <option value='2'>پست 2</option>
                    <option value='3'>پست 3</option>
                    <option value='4'>پست 4</option>
                    <option value='5'>پست 5</option>
                </select>
                
                <input type='submit' id='submit_addau' name='submit_addau' value='شرکت'/>
            </form>

        </div>
    )
}