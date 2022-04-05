import './OverflowLogin.css'
import brush from '../img/brush.svg';
import React from 'react';

class OverflowLogin extends React.Component{
  constructor(props){
  super(props);
  this.submited=this.submited.bind(this);
  this.state= {
        username :"" ,
        password : "" 
  }
  ;
  }
  submited(e){
     e.preventDefault(); 
    console.log(this.state.username);
    console.log(this.state.password);
   
   
  }
  render(){
  return(
    <>
    <div className="container">
    <img src={brush} className="brush"/>
    </div>
    <form onSubmit={(e)=>this.submited(e)}>
    <input type="text" id="username" name="username" value={this.state.username} className="item" onChange={(e)=>this.setState({username :e.target.value  })} />
    <label  id="username-label" className="item">نام کاربری</label>
     <input type="password" id="password" name="password" value={this.state.password}  className="item" onChange={(e)=>this.setState({password : e.target.value} )}/>
    <label  id="password-label" className="item" >رمز عبور</label>
   
  
    <input type="submit" value="login" id="btn-login-form" className="item" />

    <button type="button" id="forget-pass-btn" > فراموشی رمز عبور </button>
</form>
    </>
  )
  }
}
export default OverflowLogin;