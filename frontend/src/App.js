import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import OverflowLogin from "./component/OverflowLogin";
import SignUpn from "./pages/SignUpn";
import SignUpa  from './pages/SignUpa';
import Auction from './pages/Auction' ;
import Post from './component/Post';
import ForgotPass from './component/ForgotPass';
import EmailActivation from './component/EmailActivation';
import ReceiveEmail from './component/ReceiveEmail';
import ProfileNormal from './pages/Profile_Normal';
import ProfileArtist from './pages/Profile_Artist';
import Home from './pages/HomePage';
import ShowPlace from './pages/ShowPlace';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
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
  
  
          <Route path="/overflow" element={<OverflowLogin  />} />
      
       <Route path="/signupn" element={<SignUpn/> }/>
          <Route path="/signupa" element={ <SignUpa/>}/>
          <Route path="/auction" element={<Auction />} />
          <Route path="/post" element={<Post />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/EmailActivation" element={<EmailActivation />} />
          <Route path="/ReceiveEmail" element={<ReceiveEmail />} />
          <Route path="/ProfileNormal" element={<ProfileNormal />} />
          <Route path="/ProfileArtist" element={<ProfileArtist />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/show" element={<ShowPlace />} />
      </Routes>
    </BrowserRouter>
     </AlertProvider>  
    </>
  );
}

export default (App);
