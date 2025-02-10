import Cookies from "js-cookie";
import axios from "axios";
import './conx.css';
import { find } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../composants/footer';
import Header from "../composants/header";

function ConxCondidature() {
  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();
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
        Cookies.set("email", finduser.email);
        Cookies.set("password", finduser.password);
      } else {
        setErreur("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <>  
      <Header />
      <div>
        
        <div className="row conx ">
          <div className="col-6">
            <div className="row">
            <div className="col-6">
                <img className="imgconx ms-5" src="./imag/conx2.png" alt="" />
              </div>
              <div className="col-6 span ">
                <span >Connectez-vous <br></br> à <br/>  &nbsp;&nbsp;&nbsp;votre compte !</span>
              </div>
              
            </div>
          </div>
          <div className="col-6 ">
            <form className="formconx">
              <div>
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                  placeholder="votre email"
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
                  placeholder="votre mot de passe"
                />
              </div>
              <button type="submit" onClick={handleSubmit}>
                Se connecter
              </button>
              <p> Vous n'avez pas de compte ?<span ><Link className="link" to={'/choix'}>S'inscrire</Link></span></p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ConxCondidature;

