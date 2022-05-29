import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { useAuthContext } from "./hooks/useAuthContext";

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
import AlertTemplate from 'react-alert-template-basic'
import PS_Artist from './pages/PS_Artist';
import AuctionResault from './pages/AuctionResult';
import AuctionBefore from './pages/AuctionBefore';
import Addpost from './component/AddPost';
import Add_Exhibition from './pages/Add_Exhibition';
import Add_Auction from './pages/Add_Auction';
import Search from './pages/search/Search';
import Contact_us from './pages/Contact_us';


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '1rem',
  // you can also just use 'scale'
  transition: transitions.FADE
}




function App() {


  const {user} = useAuthContext()


  return (
    <>
    <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Routes>
          <Route index element={!user ? <Login /> : <Navigate to={'/home'} />}/>
          <Route path="/login" element={!user ? <OverflowLogin /> : <Navigate to={'/home'} /> } />
          <Route path="/signupn" element={!user ? <SignUpn/> : <Navigate to={'/home'} /> }/>
          <Route path="/signupa" element={ !user ? <SignUpa/> : <Navigate to={'/home'} />}/>
          <Route path="/auction/:id" element={ user ? <Auction /> : <Navigate to={'/login'} />} />
          <Route path="/forgotpassword" element={ <ForgotPass1 />} />
          <Route path="/password/reset/confirm/:uid/:token" element={  <ForgotPass2 />} />
          <Route path="/ReceiveEmail" element={<ReceiveEmail />} />
          <Route path="/activate/:uid/:token" element={<EmailActivation />} />
          <Route path="/ProfileNormal" element={user ? <ProfileNormal />  : <Navigate to={'/login'}/> } />
          <Route path="/ProfileArtist" element={user ? <ProfileArtist /> : <Navigate to={'/login'}/> } />
          <Route path="/Home" element={user ? <Home /> : <Navigate to={'/login'}/> } />
          <Route path="/show/:id" element={user ? <ShowPlace /> : <Navigate to={'/login'}/> } />
          <Route path="/psn" element={user ? <PS_Noraml /> : <Navigate to={'/login'}/> } />
          <Route path="/psa/:artistId" element={user ? <PS_Artist /> : <Navigate to={'/login'}/> } />
          <Route path="/psa" element={user ? <PS_Artist/> : <Navigate to={'/login'}/> } />

          <Route path="/auctionres/:id" element={user ?<AuctionResault/>  : <Navigate to={'/login'}/> } />
        
          <Route path="/auctionbefore/:id" element={user ?<AuctionBefore/> : <Navigate to={'/login'}/>  } />


          <Route path="/add/post" element={user ?<Addpost /> : <Navigate to={'/login'}/> } />
          <Route path="/add/exhibition" element={user ? <Add_Exhibition /> : <Navigate to={'/login'}/> } />
          <Route path="/add/auction" element={user ? <Add_Auction /> : <Navigate to={'/login'}/> } />


          <Route path="/post/:postId/:artistId" element={user ?<Post /> : <Navigate to={'/login'}/> } />
          <Route path="/contactus" element={user ? <Contact_us /> : <Navigate to={'/login'}/> } />

          <Route path="/search" element={user ? <Search /> : <Navigate to={'/login'} /> } />

      </Routes>
    </BrowserRouter>
     </AlertProvider>  
    </>
  );
}

export default (App);