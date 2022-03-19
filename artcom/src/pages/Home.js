import './Home.css';
import EllipseUp from '../img/Ellipse--up.svg';
import EllipseUp1 from '../img/EllipseUp1.svg';
import EllipseUp2 from '../img/EllipseUp2.svg';
import EllipseUp3 from '../img/EllipseUp3.svg';
import Ellipse4 from '../img/Ellipse4.svg';
import EllipseDown from '../img/EllipseDown.svg';
import hero from '../img/hero1.svg';
import pinkLine from '../img/pinkLine.svg';
function Home (){
    return (
        <>
        <div className="header">
            <h1>ArtCom</h1>
        </div>
            
       <div id="pizzaUp">
           
      
        <img src={EllipseUp} id="EllipseUp"/>
        <div div="sliceUp">
            <img src={EllipseUp1} id="EllipseUp1"/>
        <img src={EllipseUp2} id="EllipseUp2"/>
        <img src={EllipseUp3} id="EllipseUp3"/> 
        </div>
       </div>
        <div id="pizzaDown">
           <img src={EllipseDown} id="EllipseDown"/> 
           <img src={Ellipse4} id="Ellipse4" />
        </div>
        <div id="pictureRight">
            <img src={hero} id="hero"/>
            <img src={pinkLine} id="line" />
        </div>
        <div id="footer">
            
        </div>


        </>

    );
}
export default Home ;