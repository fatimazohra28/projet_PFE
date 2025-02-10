import { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

const HeaderR = ({id,nom}) => {
  const navigate=useNavigate();


  const deconnexion = async () => {
navigate('/');
Cookies.remove('email');
Cookies.remove('id');
Cookies.remove('password');
  }
  


  
  
  return (
    <>
    
    
  <nav className="navbar navbar-expand-lg nav2">
    <div className="logo">
      <img className="img" src="./imag/logo22.png" alt="" />
    </div>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link"></a>
        </li>
      </ul>
      <span className="navbar-text connecter">
        {nom} </span><span>
        <Link style={{textDecoration: 'none',color:'#FF5757',fontWeight:'bold',fontSize:'x-large'}} to={`/mesOffres/${id}`}>Mes offres</Link>
      
      </span>
      <span className="navbar-text">
        
        <button className="inscrire" onClick={deconnexion}>
          Deconnexion
        </button>
      </span>
      
      {/* <div>
        <span style={{ position: "relative", top: "8px" }}>
          <i class="bi bi-bell fs-2 "></i>
        </span>
        <span
          className="count text-danger fs-2 rounded-circle pe-1"
          style={{
            backgroundColor: "rgb(216, 212, 226)",
            position: "relative",
            top: "-4px",
            left: "0px",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            textAlign: "center",
          }}
        >
          <b>{0}</b>
        </span>
      </div> */}
    </div>
  </nav>

</>
  );
};

export default HeaderR;
