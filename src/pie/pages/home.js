import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./home.css";
import Cardcategorie from '../composants/cardcategorie';
import CardOffre from '../composants/cardoffre';
import Footer from '../composants/footer';
import HeaderC from '../composants/headerC';
import Header from '../composants/header';
import HeaderR from '../composants/headerR';

function Home() {
  const [recruteurs, setRecruteurs] = useState([]);
  const [isRecruteur, setIsRecruteur] = useState(false);
  const catgs = useSelector((state) => state.categories);
  const [offres, setOffres] = useState([]);
  const [categories, setCategories] = useState(catgs);
  const [motcle, setMotcle] = useState('');
  const [ville, setVille] = useState('');
  const { id, nom } = useParams();
  const [user, setUser] = useState([]);
  const coockid = Cookies.get("id");

  const [currentPage, setCurrentPage] = useState(1);
  const [offresPerPage] = useState(4); // Nombre d'offres par page

  useEffect(() => {
    const gett = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${coockid}/recruteur`);
        if (response.data && Object.keys(response.data).length > 0) {
          setRecruteurs(response.data);
          setIsRecruteur(true);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    gett();
  }, [coockid]);

  useEffect(() => {
    const getLastUserId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        const finduser = response.data.find((u) => u.id === id);
        setUser(finduser);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    getLastUserId();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/offres');
      setOffres(result.data.filter(o=>o.statut=='approuvée'));
    };
    fetchData();
  }, []);

  const coockieemail = Cookies.get("email");
  const coockiepassword = Cookies.get("password");

  const navigate = useNavigate();

  const handlePublieroffre = async () => {
    if (Cookies.get('email') && Cookies.get('password') && coockid == recruteurs.user_id) {
      try {
        navigate('/addOffre');
      } catch (error) {
        alert("Une erreur. Veuillez réessayer plus tard.");
      }
    } else {
      alert('Vous devez être connecté en tant qu employé pour publier loffre.');
      navigate('/conxCondidat');
    }
  };

  // Pagination logic
  const indexOfLastOffre = currentPage * offresPerPage;
  const indexOfFirstOffre = indexOfLastOffre - offresPerPage;
  const currentOffres = offres.slice(indexOfFirstOffre, indexOfLastOffre);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(offres.length / offresPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      {isRecruteur ? (id ? <HeaderR id={id} nom={nom} /> : <Header />) : (id ? <HeaderC id={id} nom={nom} /> : <Header />)}

      <div className="container">
        <div className="row">
          <div className="col-4 coll">
            <h1>DECOUVREZ </h1>
            <h1>PLUS DE </h1>
            <h1 style={{ color: '#FF5757' }}>300+ OFFRE D'EMPLOIS</h1>
            <p>Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
          </div>
          <div className="col-8">
            <video autoPlay loop muted>
              <source src="/imag/video33.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="row bg-white barcherche">
          <div className="col-1"><i className="bi bi-search"></i></div>
          <div className="col-4"><input type="text" className='input' onChange={(e) => setMotcle(e.target.value)} placeholder="Titre du poste ou mot-clé" /></div>
          <div className="col-1"><i className="bi bi-geo-alt-fill"></i></div>
          <div className="col-4"><input type="text" className='input' onChange={(e) => setVille(e.target.value)} placeholder="Lieu,Ville" /></div>
          <div className="col-2"><Link to={`/pageFilter/${motcle}/${ville}`}><button className='button'>Rechercher votre emploi</button></Link></div>
        </div>
      </div>
      <div className="row btn2">
        <div className="col-12 "><button className="b2" onClick={handlePublieroffre}>Publier un offre d'emploi</button></div>
      </div>

      <div>
        <h3>Explorer par categorie :</h3>
        <div className='m-5'>
          <div className='row'>
            {categories.map(item => (
              <div className='col-3' key={item.id}>
                <Cardcategorie
                  nom={item.nom}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='container'>
          <h3 className='fs-2 mb-3 text-decoration-underline'>{offres.length} Offres d'emploi trouvées </h3>
          {currentOffres.map(item => (
            <div key={item.id}>
              <CardOffre
                id={item.id}
                intitule={item.intitule}
                description={item.description}
                logo={item.logo}
                created_at={item.created_at}
                ville={item.ville}
                categorie={item.categorie}
              />
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
          <i class="bi bi-caret-left-fill"></i>
          </button>
          {Array.from({ length: Math.ceil(offres.length / offresPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button> ...</button>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(offres.length / offresPerPage)}>
          <i class="bi bi-caret-right-fill"></i>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
