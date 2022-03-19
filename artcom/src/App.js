import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from './logo.svg';
import Home from './pages/Home';
import { useEffect } from 'react';
import './App.css';
function useImperativeDisableScroll({ element, disabled }) {
  useEffect(() => {
      if (!element) {
          return
      }

      element.style.overflowY = disabled ? 'hidden' : 'scroll'

      return () => {
          element.style.overflowY = 'scroll'
      }
  }, [disabled])
}
function App() {
  return (
    <>
    <Home />{
    useImperativeDisableScroll({ element: document.body, disabled: true })
    }
    </>
  );
}

export default App;
