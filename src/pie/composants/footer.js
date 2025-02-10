import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users and admins in a single useEffect for better performance
    const fetchData = async () => {
      try {
        const [usersResponse, adminsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/users"),
          axios.get("http://127.0.0.1:8000/api/admins"),
        ]);

        setUsers(usersResponse.data);
        setAdmins(adminsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.email || !formData.password) {
      setError("Veuillez entrer votre email et mot de passe.");
      return;
    }

    try {
      const findUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      const findAdmin = admins.find((a) => a.user_id === findUser?.id);

      if (findUser && findAdmin?.user_id) {
        navigate(`/admin/${findUser.id}`);
        Cookies.set("id", findUser.id);
        Cookies.set("email", findUser.email);
        // Consider using a token instead of storing the password
        Cookies.set("authToken", findUser.authToken); // Use a token from your backend instead
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <footer>
      <div className="row">
        <div className="col-12 col-md-4">
          <p>
            Excellente plateforme pour les demandeurs d'emploi passionnés par
            les startups. Trouvez plus facilement l'emploi de vos rêves.
          </p>
        </div>
        <div className="col-6 col-md-2">
          <h4>À propos</h4>
          <ul>
            <li>Entreprises</li>
            <li>Tarifs</li>
            <li>Conseil</li>
            <li>Politique de confidentialité</li>
          </ul>
        </div>
        <div className="col-6 col-md-2">
          <h4>Ressources</h4>
          <ul>
            <li>Document d'aide</li>
            <li>Guide</li>
            <li>Conseil</li>
            <li>Contactez-nous</li>
          </ul>
        </div>
        <div className="col-12 col-md-4">
          <h4>ADMIN</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Adresse e-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              placeholder="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <button className="bg-dark ms-1" type="submit">
              Connexion
            </button>
          </form>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 iconf d-flex justify-content-around">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-github"></i>
          <i className="bi bi-linkedin"></i>
        </div>
        <div className="col-4"></div>
      </div>
    </footer>
  );
};

export default Footer;
