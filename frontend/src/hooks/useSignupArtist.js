import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const useSignupArtist = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const SIGNUP_ARTIST_URL = "https://artcom-sjavanmard.fandogh.cloud/auth/users/artist/"

 

  const signup = async (email, password, username , re_password,
                        city, address, postal_code, first_name, last_name,
                        profession, token ) => {
    setError(null)
    setIsPending(true)
  
    try {


      const payload = {
        "email": email,
        "username": username,
        "password": password,
        "city": city,
        "address": address,
        "postal_code": postal_code,
        "image": null,
        "first_name": first_name,
        "last_name": last_name,
        "artist": {
            "description": "",
            "profession": profession,
            "inviters": {
                "token": token
            }
        },
        "re_password": re_password
    }
      // signup
      const res = await axios.post(SIGNUP_ARTIST_URL, payload)

      console.log("try");
      if (!res) {
        throw new Error("Could not complete signup");
      }

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
        navigate('/ReceiveEmail')
      }
    } catch (err) {
      console.log("catch");
      if (!isCancelled) {
        setError(Object.values(err.response.data)[0][0])
        setIsPending(false) 
        alert(Object.values(err.response.data)[0][0])
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
