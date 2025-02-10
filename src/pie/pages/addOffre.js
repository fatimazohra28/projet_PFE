import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AjouterOffre = () => {
  const [intitule, setIntitule] = useState("");
  const [salaire, setSalaire] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [niveauEtude, setNiveauEtude] = useState("");
  const [description, setDescription] = useState("");
  const [nombrePosts, setNombrePosts] = useState("");
  const [ville, setVille] = useState("");
  const [langues, setLangues] = useState("");
  const [categorie, setCategorie] = useState("");
  const [competense, setCompetense] = useState("");
  const [logo, setLogo] = useState("");
  //const [recruteurId, setRecruteurId] = useState("");
  const coockid = Cookies.get("id");
  const [recruteurs,setRecruteurs]=useState([]);
  const navigate=useNavigate();
  const catgs = useSelector((state) => state.categories);
  useEffect(() => {
    const gett = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${coockid}/recruteur`);
        console.log("Response:", response.data); // Ajoutez cette ligne pour voir ce que contient response.data
        if( (response.data && Object.keys(response.data).length > 0) ) {
          setRecruteurs(response.data);
        } 
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    gett();
  }, []);
  const [categories, setCategories] = useState(catgs);

  const handleChange = (e) => {
    setLogo(e.target.files[0])
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/newoffre",
          {
            intitule:intitule,
            salaire:salaire,
            type_contrat:typeContrat,
            niveau_etude:niveauEtude,
            description:description,
            nombre_posts:nombrePosts,
            ville:ville,
            langues:langues,
            categorie:categorie,
            competense:competense,
            logo:logo,
            recruteur_id:recruteurs.id
          }
        ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            {" "}
            <label>
              Intitulé : <br />
              <input
                type="text"
                name="intitule"
                value={intitule}
                onChange={(e) => setIntitule(e.target.value)}
              />
            </label>
          </div>
          <div className="col-6">
            <label>
              Salaire : <br />
              <input
                type="text"
                name="salaire"
                value={salaire}
                onChange={(e) => setSalaire(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            {" "}
            <label>
              Type de contrat :
              <input
                type="text"
                name="type_contrat"
                value={typeContrat}
                onChange={(e) => setTypeContrat(e.target.value)}
              />
            </label>
          </div>
          <div className="col-6">
            {" "}
            <label>
              Niveau d'étude :
              <input
                type="text"
                name="niveau_etude"
                value={niveauEtude}
                onChange={(e) => setNiveauEtude(e.target.value)}
              />
            </label>
          </div>
        </div>{" "}
        <div className="row">
        <div className="col-6">
            
            {" "}
            <label>
              Compétences :
              <input
                type="text"
                name="competence"
                value={competense}
                onChange={(e) => setCompetense(e.target.value)}
              />
            </label>
          </div>
          <div className="col-6">
            {" "}
            <label>
              Nombre de postes :
              <input
                type="text"
                name="nombre_posts"
                value={nombrePosts}
                onChange={(e) => setNombrePosts(e.target.value)}
              />
            </label>
          </div>
        </div>{" "}
        <div className="row">
          <div className="col-6">
            {" "}
            <label>
              Ville : <br />
              <input
                type="text"
                name="ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
            </label>
          </div>
          <div className="col-6">
            {" "}
            <label>
              Langues : <br />
              <input
                type="text"
                name="langues"
                value={langues}
                onChange={(e) => setLangues(e.target.value)}
              />
            </label>
          </div>
        </div>{" "}
        <div className="row">
          <div className="col-6">
            {" "}
            <label>Catégorie :</label> <br />
            <select
              onChange={(e) => {
                setCategorie(e.target.value)
              }}
              name="categorie"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.nom}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            {" "}
            <label>
              Description :
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          
        </div>{" "}
        <div className="row">
          <div className="col-6">
            {" "}
            <label>
              Logo : <br />
              <input
                type="file"
                name="logo"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {" "}
            <center>
              <button type="submit">Soumettre</button>
            </center>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AjouterOffre;
