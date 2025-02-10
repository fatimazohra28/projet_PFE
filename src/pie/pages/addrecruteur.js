import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../composants/footer';
import Header from "../composants/header";
import './conx.css';

const AddRecruteur = () => {
  // Définir les états pour les champs du formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ville, setVille] = useState("");
  const [secteuractivite, setSecteurActivite] = useState("");
  const [logo, setLogo] = useState("");
  const [descriptionentreprise, setDescriptionEntreprise] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [lastUserId, setLastUserId] = useState(null);
const navigate=useNavigate();

  const handleChange = (e) => { 
   setLogo(e.target.files[0])
  }
  useEffect(() => {
    const getLastUserId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        // Récupérer l'ID de l'utilisateur le plus récent dans le tableau des utilisateurs
        const latestUserId = Math.max(...response.data.map((user) => user.id));
        setLastUserId(latestUserId);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la dernière ID utilisateur :",
          error
        );
      }
    };

    getLastUserId();
  }, []);
  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post("http://127.0.0.1:8000/api/users", {
        name: name,
        email: email,
        password: password,
      });

      const recruteurResponse = await axios.post(
        "http://127.0.0.1:8000/api/newcrecruteur",
        {
          ville: ville,
          secteur_activite: secteuractivite,
          logo: logo,
          description_entreprise: descriptionentreprise,
          site_web: siteWeb,
          user_id: lastUserId + 1,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate('/ConxCondidat');
      console.log("User Response:", userResponse.data);
      console.log("recruteur Response:", recruteurResponse.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
       <Header />
      <div className="row bg-light choix1">
        <div className="col-12">
          <h1>Recruteurs, inscrivez-vous et publiez vos offres d'emploi !</h1>
        </div>
      </div>
  <br/>
  <br/>
  <br/>
    <div className="container">
     
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ville :</label>
          <input
            type="text"
            name="ville"
            className="form-control"
            onChange={(e) => setVille(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Secteur d'activité :</label>
          <input
            type="text"
            name="secteur_activite"
            className="form-control"
            onChange={(e) => setSecteurActivite(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Site Web :</label>
          <input
            type="text"
            className="form-control"
            name="site_Web"
            onChange={(e) => setSiteWeb(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description de l'entreprise :</label>
          <textarea
            className="form-control"
            name="description_entreprise"
            onChange={(e) => setDescriptionEntreprise(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Logo :</label>
          <input
            type="file"
            name="logo"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
       <center><button type="submit" className="btn btn-primary butadd">
          Envoyer
        </button></center> 
      </form>
    </div><br></br><br/><br/>
    <Footer/>
    </>
  );
};

export default AddRecruteur;
