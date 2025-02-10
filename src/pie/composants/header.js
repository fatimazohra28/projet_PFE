import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    
      <nav className="navbar navbar-expand-lg nav1">
       
          <div className="logo">
            <img className="img ms-5" src="./imag/logo22.png" alt="" />
          </div>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <a className="nav-link fs-5 text-dark "></a>
              </li>
            </ul>
            <span className="navbar-text connecter"><Link className="navbar-text connecter" to={`/ConxCondidat`}>se connecter</Link></span>
            <span className="navbar-text ">
              <button className="inscrire"><Link  className="inscrire" to={`/choix`}> s'inscrire</Link></button>
            </span>
          </div>
       
      </nav>
 
  );
};

export default Header;
