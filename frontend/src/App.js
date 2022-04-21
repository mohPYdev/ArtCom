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
          <Route path="/auction/:id" element={<Auction />} />
          <Route path="/post" element={<Post />} />
          <Route path="/forgotpassword" element={<ForgotPass1 />} />
          <Route path="/forgotpassword/:uid/:token" element={<ForgotPass2 />} />

          <Route path="/activate/:uid/:token" element={<EmailActivation />} />

          <Route path="/ReceiveEmail" element={<ReceiveEmail />} />
      </Routes>
    </BrowserRouter>
     </AlertProvider>  
     
    </>
  );
}

export default (App);
