import './EmailActivation.css'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';


function EmailActivation() {

    const { uid, token } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();

    const handleClick = async() => {
        const payload = {
            uid: uid,
            token: token
        }
        const url = 'http://localhost:8000/auth/users/activate/';
        const res = await axios.post(url, payload);
        if (res.status === 200) {
            alert.success('اکانت شما با موفقیت فعال شد');
            navigate('/login');
        }
    }



    return(
    <>
        <div id="AE_wrapper">
            <h id="AE_Thank">
                به خانواده ArtCom خوش آمدید.
            </h>
            <p id="AE_Text"> 
            از اینکه شما را در جمع دوستانه خود داریم، بسیار خوشحالیم :))
            </p>
            <button onClick={handleClick} type="button" id="AE_button">ورود به ArtCom</button>
        </div>
    </>
    )    
}
export default EmailActivation;