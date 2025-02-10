import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { addNotification } from '../redux/action'; // Import the new action
import './mesoffres.css'; // Import the CSS file

function MesOffres() {
  const { id } = useParams();
  const [offres, setOffres] = useState([]);
  const [users, setUsers] = useState([]);
  const iduser = Cookies.get('id'); // Recruiter's ID
  const dispatch = useDispatch();
  const handleDelete = async (offreId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/offres/${offreId}`);
      setOffres(offres.filter(offre => offre.id !== offreId));
      console.log("Offre supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre :", error);
    }
  };
  
  useEffect(() => {
    const getOffres = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}/recruteur/offres`);
        if (response.data) {
          setOffres(response.data);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    getOffres();
  }, [id]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users`);
        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    getUsers();
  }, []);

  const handleDecision = async (offreId, condidatureId, decision, message) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/newnotification`, {
        recruteur_id: iduser,
        offre_id: offreId,
        condidature_id: condidatureId,
        message: message,
        decision: decision
        
      });
      console.log("Notification créée :", response.data);

      // Dispatch the action with the candidate ID
      //dispatch(addNotification(response.data, condidatureId));
    } catch (error) {
      console.error("Erreur lors de la création de la notification :", error);
    }
  };
  const navigate = useNavigate();

  const handleEdit = (offreId) => {
    navigate(`/editOffre/${offreId}`);
  };
  
  return (
    <div className="mes-offres-container">
      <h1>Mes Offres</h1>
      <table className="table  border-primary">
        <thead>
          <tr>
            <th>Titre de l'Offre</th>
            <th>Candidats</th>
            <th>Décision</th>
          </tr>
        </thead>
        <tbody>
          {offres.map((offre) => (
            <tr key={offre.id}>
              <td><h2>{offre.intitule} 
              <i className="bi bi-trash-fill text-danger"
                    onClick={() => handleDelete(offre.id)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  ></i>
                  <i 
                    className="bi bi-pencil-square text-success"
                    onClick={() => handleEdit(offre.id)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  ></i>
              </h2></td>
              <td>
                {offre.condidatures.length > 0 ? (
                  <ul>
                    {offre.condidatures.map((condidature) => {
                      const user = users.find(user => user.id === condidature.user_id);
                      return (
                        <li key={condidature.id}>
                          {user ? (
                            <>
                              <span>
                                <Link to={`/profil/${user.id}`}>Voir profil</Link>{" "}
                                {user.name}
                              </span>
                            </>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span>aucun</span>
                )}
              </td>
              <td>
                {offre.condidatures.length > 0 ? (
                  offre.condidatures.map((condidature) => (
                    <div key={condidature.id} className="decision-buttons">
                      <button style={{backgroundColor:'#07036D'}}
                        onClick={() => handleDecision(
                          offre.id, 
                          condidature.id, 
                          "accepter", 
                          `Votre candidature pour l'offre "${offre.intitule}" a été acceptée par le recruteur.`
                        )}
                      >
                        Accepter
                      </button>
                      <button style={{backgroundColor:'#FF5757'}}
                        onClick={() => handleDecision(
                          offre.id, 
                          condidature.id, 
                          "refuser", 
                          `Votre candidature pour l'offre "${offre.intitule}" a été refusée par le recruteur.`
                        )}
                      >
                        Refuser
                      </button>
                    </div> 
                  ))
                ) : (
                  <span>aucun</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MesOffres;
