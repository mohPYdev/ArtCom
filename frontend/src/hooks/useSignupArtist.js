import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignupArtist = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const SIGNUP_ARTIST_URL = "http://localhost:8000/auth/users/artist/";

  const signup = async (
    email,
    password,
    username,
    re_password,
    city,
    address,
    postal_code,
    first_name,
    last_name,
    profession,
    token
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await axios.post(SIGNUP_ARTIST_URL, {
        email,
        username,
        password,
        re_password,
        first_name,
        last_name,
        city,
        address,
        postal_code,
        profession,
        token,
      });

      console.log("try");
      if (!res) {
        throw new Error("Could not complete signup");
      }

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log("catch");
      if (!isCancelled) {
        setError(Object.values(err.response.data)[0][0]);
        setIsPending(false);
        console.log("cancelled")
        alert(Object.values(err.response.data)[0][0]);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
