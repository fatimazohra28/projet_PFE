import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './profilC.css'; // Import the CSS file

function ProfilC() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [condidat, setCondidat] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchUserc = async () => {
      try {
        const responsec = await axios.get(
          `http://127.0.0.1:8000/api/user/${id}/condidature`
        );
        setCondidat(responsec.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };
    fetchUserc();
  }, [id]);

  return (
    <div className="profile-container">
      <h1>Profil de candidature</h1>
      <div className="profile-card">
        <p><strong>Nom :</strong>{user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Ville :</strong> {condidat.ville}</p>
        <p><strong>Expérience :</strong> {condidat.experiences}</p>
        <p><strong>Compétences :</strong> {condidat.competences}</p>
        <p><strong>Formation :</strong> {condidat.formations}</p>
        <p><strong>Établissement :</strong> {condidat.etablissements}</p>
        <p><strong>Langue :</strong> {condidat.langue}</p>
        <p><strong>Lettre de motivation :</strong> {condidat.littre_motivation}</p>
        <p>
          <Link to={`/profilcvv/${user.id}`} className="cv-link">Voir CV <i class="bi bi-file-earmark-person-fill"></i></Link>
        </p>
      </div>
    </div>
  );
}

export default ProfilC;
