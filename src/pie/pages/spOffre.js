import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CardOffre from "../composants/cardoffre";
import axios from "axios";

const SpOffre = () => {
  const { motcle, ville } = useParams();
  const [offres, setOffres] = useState([]);
  const [motcle2, setMotcle2] = useState(motcle ?  motcle : "");
  const [ville2, setVille2] = useState(ville ? ville : '');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/offres");
      setOffres(result.data);
    };

    fetchData();
  }, [motcle]);
  const offresFiltr = offres.filter(
    (offre) => offre.intitule === motcle || offre.ville === ville || offre.categorie === motcle 
  );
  console.log(offresFiltr);
  if (motcle || ville) {
    if (offresFiltr.length === 0) {
      return <div> Aucune offre correspondant à votre recherche.</div>;
    } else {
      return (
       <>
      <center>
      <div className="row bg-white w-50 barcherch2 " >
          <div className="col-1"><i className="bi bi-search"></i></div>
          <div className="col-4"><input type="text" className='input' value={motcle2} onChange={(e) => setMotcle2(e.target.value)} placeholder="Titre du poste ou mot-clé" /></div>
          <div className="col-1"><i className="bi bi-geo-alt-fill"></i></div>
          <div className="col-4"><input type="text" className='input'  value={ville2} onChange={(e) => setVille2(e.target.value)} placeholder="Lieu,Ville" /></div>
          <div className="col-2"><Link to={`/pageFilter/${motcle2}/${ville2}`}><button className='button'>Rechercher</button></Link></div>
        </div>
        </center> 
        <div className="container">
        
        {offresFiltr.map((prod) => (
          <div className="col-12 m-5" key={prod.id}>
            <CardOffre
            id={prod.id}
              intitule={prod.intitule}
              logo={prod.logo}
              created_at={prod.created_at}
              categorie={prod.categorie}
              ville={prod.ville}
            />
          </div>
        ))}
      </div>
      
 </>
      );
    }
  } else {
    return null; // ou retournez un composant, une page par défaut, etc.
  }

};

export default SpOffre;
