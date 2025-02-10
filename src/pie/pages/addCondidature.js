import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../composants/footer';
import Header from "../composants/header";
import './conx.css';

const AddCondidature = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    telephone: '',
    ville: '',
    niveau_etude: '',
    specialite: '',
    etablissement: '',
    formations: '',
    experiences: '',
    competences: '',
    langue: '',
    littre_motivation: '',
    cv: null,
  });

  const [lastUserId, setLastUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getLastUserId = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        const latestUserId = Math.max(...response.data.map(user => user.id));
        setLastUserId(latestUserId);
      } catch (error) {
        console.error('Erreur lors de la récupération de la dernière ID utilisateur :', error);
      }
    };

    getLastUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cv' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post('http://127.0.0.1:8000/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
  
      const candidatureResponse = await axios.post('http://127.0.0.1:8000/api/newcondidature', {
        telephone: formData.telephone,
        ville: formData.ville,
        niveau_etude: formData.niveau_etude,
        specialite: formData.specialite,
        etablissement: formData.etablissement,
        formations: formData.formations,
        experiences: formData.experiences,
        competences: formData.competences,
        langue: formData.langue,
        littre_motivation: formData.littre_motivation,
        cv: formData.cv,
        user_id: lastUserId + 1
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      console.log('User Response:', userResponse.data);
      console.log('Candidature Response:', candidatureResponse.data);
      navigate('/ConxCondidat');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="row bg-light choix1">
        <div className="col-12">
          <h1>Candidats, inscrivez-vous en 1 minute !</h1>
        </div>
      </div>
  <br/>
  <br/>
  <br/>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Nom complet:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom complet"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Téléphone:</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ville">Ville:</label>
          <input
            type="text"
            id="ville"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            placeholder="Ville"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="niveau_etude">Niveau d'études:</label>
          <input
            type="text"
            id="niveau_etude"
            name="niveau_etude"
            value={formData.niveau_etude}
            onChange={handleChange}
            placeholder="Niveau d'études"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialite">Spécialité:</label>
          <input
            type="text"
            id="specialite"
            name="specialite"
            value={formData.specialite}
            onChange={handleChange}
            placeholder="Spécialité"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="etablissement">Établissement:</label>
          <input
            type="text"
            id="etablissement"
            name="etablissement"
            value={formData.etablissement}
            onChange={handleChange}
            placeholder="Établissement"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="langue">Langue:</label>
          <input
            type="text"
            id="langue"
            name="langue"
            value={formData.langue}
            onChange={handleChange}
            placeholder="Langue"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="formations">Formations:</label>
          <input
            type="text"
            id="formations"
            name="formations"
            value={formData.formations}
            onChange={handleChange}
            placeholder="Formations"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="experiences">Expériences:</label>
          <input
            type="text"
            id="experiences"
            name="experiences"
            value={formData.experiences}
            onChange={handleChange}
            placeholder="Expériences"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="competences">Compétences:</label>
          <input
            type="text"
            id="competences"
            name="competences"
            value={formData.competences}
            onChange={handleChange}
            placeholder="Compétences"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="littre_motivation">Lettre de motivation:</label>
          <textarea
            id="littre_motivation"
            name="littre_motivation"
            value={formData.littre_motivation}
            onChange={handleChange}
            placeholder="Lettre de motivation"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cv">CV:</label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleChange}
            required
          />
        </div>
       <center><button className='butadd' type="submit">Envoyer</button></center> 
      </form><br />
      <br/>
      <br/>
      <Footer />
    </div>
  );
};

export default AddCondidature;
