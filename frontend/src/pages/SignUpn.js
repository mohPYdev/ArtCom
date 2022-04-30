import { useEffect, useState } from "react";
import stylesheet from "./SignUp/SignUp_Normal.css";
import painter from "./SignUp/image/painter-holding-paint-roller-4891279-4077630.png";
import puzzle from "./SignUp/image/puzzle.png";
import snhome from "./SignUp/image/icons8-home-30.png";
import { useSignupNormal } from "../hooks/useSignupNormal";
import { useAlert } from "react-alert";
import { Outlet, Link } from "react-router-dom";



function SignUpn(){

    const { signup, isPending, error } = useSignupNormal()


    const [sn_firstname,setSnFirstname]=useState('');
    const [sn_lastname,setSnLastname]=useState('');
    const [sn_email,setSnEmail]=useState('');
    const [sn_username,setSnUsername]=useState('');
    const [sn_password,setSnPassword]=useState('');
    const [sn_confirmpassword,setSnConfirmpassword]=useState('');
    const [sn_address,setSnAddress]=useState('');
    const [sn_city,setSnCity]=useState('');
    const [sn_postalcode,setSnPostalcode]=useState('');


    useEffect(() => {

        if (error) {
            setSnConfirmpassword('')
            setSnPassword('')
        }
    },[error])


    // handle submit
    const handleSnSubmit= async(event)=>{
        event.preventDefault();
        await signup(
            sn_email,
            sn_password,
            sn_username,
            sn_confirmpassword,
            sn_city,
            sn_address,
            sn_postalcode,
            sn_firstname,
            sn_lastname
        );

    }


  // setting the states
  const handlechangeSnFirstname = (event) => {
    setSnFirstname(event.target.value);
  };
  const handlechangeSnLastname = (event) => {
    setSnLastname(event.target.value);
  };
  const handlechangeSnEmail = (event) => {
    setSnEmail(event.target.value);
  };
  const handlechangeSnUsername = (event) => {
    setSnUsername(event.target.value);
  };
  const handlechangeSnPassword = (event) => {
    setSnPassword(event.target.value);
  };
  const handlechangeSnConfirmpassword = (event) => {
    setSnConfirmpassword(event.target.value);
  };
  const handlechangeSnAddress = (event) => {
    setSnAddress(event.target.value);
  };
  const handlechangeSnCity = (event) => {
    setSnCity(event.target.value);
  };
  const handlechangeSnPostalcode = (event) => {
    setSnPostalcode(event.target.value);
  };
  return (
    <>
    
      <div id="sn_wrapper">
        <Link to="/"><span><img id="sn_home" src={snhome} /></span></Link>
        <img id="sn_image" src={painter} />
        <img id="sn_puzzle" src={puzzle} />
        <form method="get" onSubmit={handleSnSubmit}>
          <input
            value={sn_firstname}
            onChange={handlechangeSnFirstname}
            type="text"
            id="sn_firstname"
            className="sn_box"
            name="firstname"
            placeholder="نام"
            required
          />
          <br />
          <input
            value={sn_lastname}
            onChange={handlechangeSnLastname}
            type="text"
            id="sn_lastname"
            className="sn_box"
            name="lastname"
            placeholder="نام خانوادگی"
            required
          />
          <br />
          <input
            value={sn_email}
            onChange={handlechangeSnEmail}
            type="email"
            id="sn_email"
            className="sn_box"
            name="email"
            placeholder="ایمیل"
            required
          />
          <br />
          <input
            value={sn_username}
            onChange={handlechangeSnUsername}
            type="text"
            id="sn_username"
            className="sn_box"
            name="username"
            placeholder="نام کاربری"
            required
          />
          <input
            value={sn_password}
            onChange={handlechangeSnPassword}
            type="password"
            id="sn_password"
            className="sn_box"
            name="password"
            placeholder="رمزعبور"
            autoComplete="on"
            required
          />
          <br />
          <input
            value={sn_confirmpassword}
            onChange={handlechangeSnConfirmpassword}
            type="password"
            id="sn_confirmpassword"
            className="sn_box"
            name="confirmpassword"
            placeholder="تکرار رمزعبور"
            autoComplete="on"
            required
          />
          <br />
          <textarea
            value={sn_address}
            onChange={handlechangeSnAddress}
            id="sn_address"
            className="sn_box"
            name="address"
            placeholder="آدرس"
            required
          ></textarea>
          <input
            value={sn_city}
            onChange={handlechangeSnCity}
            type="text"
            id="sn_city"
            className="sn_box"
            name="city"
            placeholder="شهر"
            required
          />
          <br />
          <br />
          <input
            value={sn_postalcode}
            onChange={handlechangeSnPostalcode}
            type="number"
            id="sn_postalcode"
            className="sn_box"
            name="postalcode"
            placeholder="کد پستی"
            required
          />
          <input type="submit" id="sn_singup" value="ثبت نام" />
          {/* {isPending && <button disabled className='btn'>Loading ...</button>} */}
          {/* {error && <div className='error'>{error}</div>} */}
        </form>
      </div>
    </>
  );
}
export default SignUpn;
