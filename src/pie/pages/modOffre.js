import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const ModifierOffre = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState({
    intitule: "",
    salaire: "",
    type_contrat: "",
    niveau_etude: "",
    description: "",
    nombre_posts: "",
    ville: "",
    langues: "",
    categorie: "",
    competense: "",
    logo: null
  });
  const coockid = Cookies.get("id");
  const [recruteurs, setRecruteurs] = useState([]);
  const catgs = useSelector((state) => state.categories);
  const [categories, setCategories] = useState(catgs);

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/offres/${id}`);
        setOffre(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'offre :", error);
      }
    };
    fetchOffre();
  }, [id]);

  useEffect(() => {
    const gett = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${coockid}/recruteur`);
        if (response.data && Object.keys(response.data).length > 0) {
          setRecruteurs(response.data);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    gett();
  }, [coockid]);

  const handleChange = (e) => {
    setOffre({ ...offre, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setOffre({ ...offre, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(offre).forEach((key) => {
      formData.append(key, offre[key]);
    });
    formData.append('recruteur_id', recruteurs.id);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/editoffres/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Offre mise à jour avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre :", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <label>
              Intitulé : <br />
              <input type="text" name="intitule" value={offre.intitule} onChange={handleChange} />
            </label>
          </div>
          <div className="col-6">
            <label>
              Salaire : <br />
              <input type="text" name="salaire" value={offre.salaire} onChange={handleChange} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>
              Type de contrat :
              <input type="text" name="type_contrat" value={offre.type_contrat} onChange={handleChange} />
            </label>
          </div>
          <div className="col-6">
            <label>
              Niveau d'étude :
              <input type="text" name="niveau_etude" value={offre.niveau_etude} onChange={handleChange} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>
              Compétences :
              <input type="text" name="competense" value={offre.competense} onChange={handleChange} />
            </label>
          </div>
          <div className="col-6">
            <label>
              Nombre de postes :
              <input type="text" name="nombre_posts" value={offre.nombre_posts} onChange={handleChange} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>
              Ville : <br />
              <input type="text" name="ville" value={offre.ville} onChange={handleChange} />
            </label>
          </div>
          <div className="col-6">
            <label>
              Langues : <br />
              <input type="text" name="langues" value={offre.langues} onChange={handleChange} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Catégorie :</label> <br />
            <select name="categorie" value={offre.categorie} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.nom}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label>
              Description :
              <textarea name="description" value={offre.description} onChange={handleChange} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>
              Logo : <br />
              <input type="file" name="logo" onChange={handleFileChange} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <center>
              <button type="submit">Mettre à jour</button>
            </center>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifierOffre;
