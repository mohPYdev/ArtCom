import './OverflowLogin.css'
import brush from '../img/brush.svg';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class OverflowLogin extends React.Component{
  constructor(props){
  super(props);
  this.submited=this.submited.bind(this);
  this.state= {
        username :"" ,
        password : "" 
  };

  }

  componentDidUpdate() {
    
  }
  submited(e){
     e.preventDefault(); 
    console.log(this.state.username);
    console.log(this.state.password);
const data1 ={
username :this.state.username ,
password :this.state.password
}
    async function fetchData(){
      const {data2} = await axios.post('http://localhost:8000/auth/token/login', data1);
      console.log("fetching");
      console.log(data2);

    }
    fetchData();
   
   
  }
  render(){
  return(
    <>
    <div className="login--container">
    <img src={brush} className="brush"/>
    </div>
    <form id="login--form" onSubmit={(e)=>this.submited(e)}>
    <input type="text" id="login--username" name="username" value={this.state.username} className="item" onChange={(e)=>this.setState({username :e.target.value  })} />
    <label  id="login--username-label" className="item">نام کاربری</label>
     <input type="password" id="login--password" name="password" value={this.state.password}  className="item" onChange={(e)=>this.setState({password : e.target.value} )}/>
    <label  id="login--password-label" className="item" >رمز عبور</label>
   
  
    <Link to="#"  id="btn-login-form" className="item" >ورود</Link>

    <Link to="/forgotpassword" id="forget-pass-btn" > فراموشی رمز عبور </Link>
</form>
    </>
  )
  }
}
export default OverflowLogin;