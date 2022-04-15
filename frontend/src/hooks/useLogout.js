import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const LOGOUT_URL = "http://localhost:8000/auth/token/logout/"
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      
      await axios.post(LOGOUT_URL)

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
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

  return { logout, error, isPending }
}