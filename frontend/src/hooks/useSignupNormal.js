import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const SIGNUP_URL = "http://localhost:8000/auth/users/"

  const signup = async (email, password, username , re_password, city, address, postal_code, first_name, last_name,) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await axios.post(SIGNUP_URL, {email, username, password, re_password, 
                                                first_name, last_name, city, address, postal_code})

      if (!res) {
        throw new Error('Could not complete signup')
      }

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}