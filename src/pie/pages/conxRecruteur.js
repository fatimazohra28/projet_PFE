import Cookies from 'js-cookie';
import axios from "axios";
import { find } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ConxRecruteur() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([]);
  const [erreur, setErreur] = useState("");
  const [id, setId] = useState("");

   const navigate=useNavigate();
  useEffect(() => {
    const getLastUserId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        // Récupérer l'ID de l'utilisateur le plus récent dans le tableau des utilisateurs
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    getLastUserId();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finduser = users.find((u) => {
        return u.email === formData.email && u.password === formData.password;
      });
      // Vérifiez si la connexion a réussi en fonction de la réponse de l'API
      if (finduser) {
        navigate(`/${finduser.id}/${finduser.name}`);
        Cookies.set("id", finduser.id);
        Cookies.set("email",finduser.email);
        Cookies.set("password", finduser.password);

      } else {
        setErreur("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div>
   
      <h2>Connexion </h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>name:</label>
          <input
            type="name"
            id="name"
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default ConxRecruteur;
