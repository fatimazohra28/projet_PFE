import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [offres, setOffres] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/offres');
        setOffres(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des offres : ", error);
      }
    };

    fetchOffres();
  }, []);

  const handleApproval = async (offreId, approuve) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/offres/${offreId}/${approuve}`);
     navigate('/admin/3');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état d'approbation de l'offre : ", error);
    }
  };
  const handleDelete = async (offreId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/offres/${offreId}`);
      setOffres(offres.filter(offre => offre.id !== offreId));
      console.log("Offre supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre :", error);
    }
  };
  return (
    <div>
      <h1>Tableau des offres</h1>
      <table>
        <thead>
          <tr>
            <th>Intitulé</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Détail </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {offres.map((offre) => (
            <tr key={offre.id}>
              <td>{offre.intitule}  
                  </td>
              <td>{offre.description}</td>
              <td>{offre.statut }</td>
              <td><Link to={`/detailOffre/${offre.id}`}>plus d'infos</Link></td>
              <td>
              
                  <>
                    <button onClick={() => handleApproval(offre.id, true)}>Approuver</button>
                    <i className="bi bi-trash-fill text-danger"
                    onClick={() => handleDelete(offre.id)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  ></i>
                    {/* <button onClick={() => handleApproval(offre.id, false)}>Rejeter</button> */}
                  </>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
