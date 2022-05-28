import { useAuthContext} from '../hooks/useAuthContext';
import style from "../pages/HomePage.module.css";
import { useNavigate  } from "react-router-dom";
export default function Avatar (props){

    const GoToProfileSeen =() => {
        if(user?.is_artist)
        navigator(`/psa`)
        else{
          navigator(`/psn`)
        }
      }
    const { user } = useAuthContext();
    const navigator = useNavigate();
    let setColor ;
    if(props.backColor === "light")
    setColor = "#1E2736";
    if(props.backColor === "dark")
        setColor = "#E9DAD3";
    
    
    return (
      <>
      <img src={user?.image} alt="" className={style.profile} onClick={GoToProfileSeen} style={{border : "0.2rem solid"+setColor }} />
        <h3 className={style.profile_name} style={{color : setColor }}> ✋ {user?.username} سلام </h3>
        </> 
    )
  }