import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./offre.css";

const DetailOffre = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [condidat, setCondidat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cookieIdC = Cookies.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCandidature = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/${cookieIdC}/condidature`
        );
        setCondidat(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du profil :", err);
        setError("Erreur lors de la récupération du profil.");
      }
    };

    fetchUserCandidature();
  }, [cookieIdC]);

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/offres/${id}`);
        setOffre(response.data);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Erreur lors de la récupération des détails de l'offre.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffre();
  }, [id]);

  const handlePostuler = async () => {
    if (condidat && cookieIdC === String(condidat.user_id)) {
      try {
        await axios.post("http://127.0.0.1:8000/api/postules", {
          condidature_id: condidat.id,
          offre_id: offre.id,
        });
        alert("Votre candidature a été envoyée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'envoi de la candidature :", error);
        alert(
          "Une erreur s'est produite lors de l'envoi de votre candidature. Veuillez réessayer plus tard."
        );
      }
    } else {
      alert("Vous devez être connecté pour postuler comme candidat.");
      navigate("/conxCondidat");
    }
  };

  if (loading) {
    return <p>Chargement des détails de l'offre...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="detail-container">
        <h2>Détails de l'offre</h2>
        {offre && (
          <div className="detail-content">
            <p>
              <strong>Intitulé :</strong> {offre.intitule}
            </p>
            <p>
              <strong>Salaire :</strong> {offre.salaire}
            </p>
            <p>
              <strong>Type de contrat :</strong> {offre.type_contrat}
            </p>
            <p>
              <strong>Niveau d'étude :</strong> {offre.niveau_etude}
            </p>
            <p>
              <strong>Description :</strong> {offre.description}
            </p>
            <p>
              <strong>Nombre de postes :</strong> {offre.nombre_posts}
            </p>
            <p>
              <strong>Ville :</strong> {offre.ville}
            </p>
            <p>
              <strong>Langues :</strong> {offre.langues}
            </p>
            <p>
              <strong>Catégorie :</strong> {offre.categorie}
            </p>
            <p>
              <strong>Compétences requises :</strong> {offre.competense}
            </p>
            <button className="apply-button" onClick={handlePostuler}>
              Postuler
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailOffre;
