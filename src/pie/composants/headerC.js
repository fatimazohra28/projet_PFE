import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import SidebaR from "./sideR";
import { useSelector } from "react-redux";

const HeaderC = ({ id, nom }) => {
  const navigate = useNavigate();
  const [menuVisible2, setMenuVisible2] = useState(false);
  const iduser = Cookies.get('id'); // Candidate's ID

  const deconnexion = async () => {
    navigate('/');
    Cookies.remove('email');
    Cookies.remove('id');
    Cookies.remove('password');
  }

  const Affichermenu2 = () => {
    setMenuVisible2(!menuVisible2);
  };

  // const notificationsCount = useSelector((state) => state.candidateNotifications[iduser] );
  const [notifs, setNotifs] = useState([]);
  const [condidat, setCondidat] = useState([]);


  useEffect(() => {
    const fetchUserc = async () => {
      try {
        const responsec = await axios.get(
          `http://127.0.0.1:8000/api/user/${iduser}/condidature`
        );
        setCondidat(responsec.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };
    fetchUserc();
  }, []);
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/notifications/condidature/${condidat.id}`
        );
        setNotifs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des notifications :",
          error
        );
      }
    };    
    // Appel de la fonction pour récupérer les notifications au chargement du composant
    fetchNotifs();
  }, [condidat]);
  const notificationsCount = notifs.length;
  return (
  
    <nav className="navbar navbar-expand-lg nav1">
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
          <Link style={{textDecoration: 'none',color:'#FF5757',fontWeight:'bold',fontSize:'x-large'}} to={`/profil/${id}`}>profile {nom}</Link>
        </span>
        <span className="navbar-text">
          <button className="inscrire" onClick={deconnexion}>
            Deconnexion
          </button>
        </span>
        <div onClick={Affichermenu2}>
          <span style={{ position: "relative", left:"2px",top: "8px" }}>
            <i className="bi bi-bell fs-2 "></i>
          </span>
          <span
            className="count  fs-2 rounded-circle "
            style={{
              backgroundColor: "red",
              position: "relative",
              top: "-4px",
              left: "1px",
              borderRadius: "50%",
              paddingInline:"10px",
            
              textAlign: "center",
            }}
          >
            <span>{notificationsCount}</span>
          </span>
        </div>
      </div>
      <SidebaR menuVisible2={menuVisible2} />
    </nav>
  );
};

export default HeaderC;
