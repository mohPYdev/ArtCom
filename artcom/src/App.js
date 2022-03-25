import { useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
function useImperativeDisableScroll({ element, disabled }) {
  useEffect(() => {
      if (!element) {
          return
      }

      element.style.overflowY = disabled ? 'hidden' : 'scroll'
      element.style.overflowX = disabled ? 'hidden' : 'scroll'
      return () => {
          element.style.overflowY = 'scroll'
          element.style.overflowX = 'scroll'
      }
  }, [disabled])
}
function App() {
  return (
    <>
    <Login />
    {
    useImperativeDisableScroll({ element: document.body, disabled: true })
    }
    </>
  );
}

export default App;
