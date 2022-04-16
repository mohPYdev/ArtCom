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

function useImperativeDisableScroll({ element, disabled }) {
  useEffect(() => {
      if (!element) {
          return
      }

      element.style.overflowY = disabled ? 'hidden' : 'scroll'
      element.style.overflowX = disabled ? 'hidden' : 'scroll'
      return () => {
          element.style.overflowY = 'scroll'
          element.style.overflowX = 'scroll'
      }
  }, [disabled])
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
      </Routes>
    </BrowserRouter>
     </AlertProvider>  
     {
    useImperativeDisableScroll({ element: document.body, disabled: true })
    }
    </>
  );
}

export default (App);
