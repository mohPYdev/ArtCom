import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (user) {
      dispatch({ type: 'AUTH_IS_READY', payload: JSON.parse(user) })
      
      // add headers
      axios.defaults.headers.common['Authorization'] = `Token ${JSON.parse(token)}`
    }
  }, [])
  
  console.log('AuthContext state:', state)
  
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}