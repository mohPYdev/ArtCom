import react,{useState} from 'react';
import stylesheet from './SignUp/SignUp_Artist.css';
import {useSignupArtist} from '../hooks/useSignupArtist'


function SignUpa(){

    const { signup , error, isPending} = useSignupArtist()

    const [sa_firstname,setSaFirstname]=useState('');
    const [sa_lastname,setSaLastname]=useState('');
    const [sa_email,setSaEmail]=useState('');
    const [sa_username,setSaUsername]=useState('');
    const [sa_password,setSaPassword]=useState('');
    const [sa_confirmpassword,setSaConfirmpassword]=useState('');
    const [sa_invitationcode,setSaInvitationcode]=useState('');
    const [sa_selectValue,setSaselectValue]=useState('');
    const [sa_address,setSaAddress]=useState('');
    const [sa_postalcode,setSaPostalcode]=useState('');


    // handle submit
    const handleSaSubmit=(e)=>{
        e.preventDefault();
        signup(
            sa_email,
            sa_password,
            sa_username,
            sa_confirmpassword,
        )
    }


    // setting the states
    const handlechangeSaFirstname=(event)=>{
        setSaFirstname(event.target.value)
    }
    const handlechangeSaLastname=(event)=>{
        setSaLastname(event.target.value)
    }
    const handlechangeSaEmail=(event)=>{
        setSaEmail(event.target.value)
    }
    const handlechangeSaUsername=(event)=>{
        setSaUsername(event.target.value)
    }
    const handlechangeSaPassword=(event)=>{
        setSaPassword(event.target.value)
    }
    const handlechangeSaConfirmpassword=(event)=>{
        setSaConfirmpassword(event.target.value)
    }
    const handlechangesasaInvitationcode=(event)=>{
        setSaInvitationcode(event.target.value)
    }
    const handlechangesaSelectValue=(event)=>{
        setSaselectValue(event.target.value)
    }
    const handlechangeSaAddress=(event)=>{
        setSaAddress(event.target.value)
    }
    const handlechangeSaPostalcode=(event)=>{
        setSaPostalcode(event.target.value)
    }
return(
    <>
    <div id="sa_wrapper">
        <form method="get" onSubmit={handleSaSubmit}>
            <input value={sa_firstname} onChange={handlechangeSaFirstname} type="text" id="sa_firstname" class="sa_box" name="firstname" placeholder="نام" /><br />
            <input value={sa_lastname} onChange={handlechangeSaLastname} type="text" id="sa_lastname" class="sa_box" name="lastname" placeholder="نام خانوادگی" /><br />
            <input value={sa_email} onChange={handlechangeSaEmail} type="email" id="sa_email" class="sa_box" name="email" placeholder="ایمیل" /><br />
            <input value={sa_username} onChange={handlechangeSaUsername} type="text" id="sa_username" class="sa_box" name="username" placeholder="نام کاربری" />
            <input value={sa_password} onChange={handlechangeSaPassword} type="password" id="sa_password" class="sa_box" name="password" placeholder="رمزعبور" /><br />
            <input value={sa_confirmpassword} onChange={handlechangeSaConfirmpassword} type="password" id="sa_confirmpassword" class="sa_box" name="confirmpassword" placeholder="تکرار رمزعبور" /><br />
            <input value={sa_invitationcode} onChange={handlechangesasaInvitationcode} type="text" id="sa_invitationcode" class="sa_box" name="invitationcode" placeholder="کد دعوت" /><br />
            <label id="sa_label" class="sa_box">تخصص:</label>
            <select value={sa_selectValue} onChange={handlechangesaSelectValue} id="sa_selection" class="sa_box" name="education">
                <option value="painter" selected>نقاش</option>
                <option value="photographer">عکاس</option>
                <option value="Potter">سفالگر</option>
                <option value="Sculptor" >مجسمه ساز</option>
                <option value="Other">سایر</option>
            </select> 
                <textarea value={sa_address} onChange={handlechangeSaAddress} id="sa_address" class="sa_box" name="address" placeholder="آدرس"></textarea>
                <br />
                <input value={sa_postalcode} onChange={handlechangeSaPostalcode} type="number" id="sa_postalcode" class="sa_box" name="postalcode" placeholder="کد پستی" />
                <input type="submit" id="sa_singup" value="ثبت نام" />
        </form>
    </div>
    </>
)
}
export default SignUpa;