import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const SidebaR = ({ menuVisible2 }) => {
  const [notifs, setNotifs] = useState([]);
  const [condidat, setCondidat] = useState([]);
  const iduser = Cookies.get("id");

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
  }, [condidat]); // Le tableau de dépendances vide garantit que cette effect ne sera exécutée qu'une seule fois

  return (
    <div className={`sidebar ${menuVisible2 ? "visible" : "hidden"}`}>
      <div className="">Notifications</div>
      <table className="table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Décision</th>
            <th>details d'offre</th>
          </tr>
        </thead>
        <tbody>
          {notifs.map((notif, index) => (
            <tr key={index}>
              <td>{notif.message}</td>
              <td>{notif.decision}</td>
              <Link to={`/detailOffre/${notif.offre_id}`}>
                <a>plus d'infos </a>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SidebaR;
