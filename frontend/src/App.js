import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import OverflowLogin from "./component/OverflowLogin";
import SignUpn from "./pages/SignUpn";
import SignUpa  from './pages/SignUpa';
import Auction from './pages/Auction' ;
import Post from './component/Post';
import ForgotPass1 from './component/ForgotPass1';
import ForgotPass2 from './component/ForgotPass2';
import EmailActivation from './component/EmailActivation';
import ReceiveEmail from './component/ReceiveEmail';
import ProfileNormal from './pages/Profile_Normal';
import ProfileArtist from './pages/Profile_Artist';
import Home from './pages/HomePage';
import ShowPlace from './pages/ShowPlace';
import PS_Noraml from './pages/PS_Normal';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import PS_Artist from './pages/PS_Artist';

import AuctionResault from './pages/AuctionResult';

import Addpost from './component/AddPost';
import Add_Exhibition from './pages/Add_Exhibition';
import Add_Auction from './pages/Add_Auction';
import Search from './pages/search/Search';




const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '1rem',
  // you can also just use 'scale'
  transition: transitions.FADE
}




function App() {

  return (
    <>
    <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />}/>
          <Route path="/login" element={<OverflowLogin  />} />
          <Route path="/signupn" element={<SignUpn/> }/>
          <Route path="/signupa" element={ <SignUpa/>}/>
          <Route path="/auction/:id" element={<Auction />} />
          <Route path="/forgotpassword" element={<ForgotPass1 />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ForgotPass2 />} />
          <Route path="/ReceiveEmail" element={<ReceiveEmail />} />
          <Route path="/activate/:uid/:token" element={<EmailActivation />} />
          <Route path="/ProfileNormal" element={<ProfileNormal />} />
          <Route path="/ProfileArtist" element={<ProfileArtist />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/show/:id" element={<ShowPlace />} />
          <Route path="/psn" element={<PS_Noraml />} />
          <Route path="/psa/:artistId" element={<PS_Artist />} />
          <Route path="/psa" element={<PS_Artist />} />

          <Route path="/auctionres/:id" element={<AuctionResault/> } />
        


          <Route path="/add/post" element={<Addpost />} />
          <Route path="/add/exhibition" element={<Add_Exhibition />} />
          <Route path="/add/auction" element={<Add_Auction />} />


          <Route path="/post/:postId/:artistId" element={<Post />} />

          <Route path="/search" element={<Search />} />

      </Routes>
    </BrowserRouter>
     </AlertProvider>  
    </>
  );
}

export default (App);