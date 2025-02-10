import axios from 'axios';
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';

function CvC() {
  const { id } = useParams();
  const [condidat, setCondidat] = useState(null);
  const [condidats, setCondidats] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/condidatures');
      setCondidats(result.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchUserc = async () => {
      try {
        const responsec = await axios.get(`http://127.0.0.1:8000/api/user/${id}/condidature`);
        setCondidat(responsec.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };
    fetchUserc();
  }, [id]);
  

  return (
    <div>
    {/* { condidats ? (
      condidats.map(item => (
        <div key={item.id}>
        
          <img src={"http://127.0.0.1:8000/cv/"+item.cv}  alt="Description de l'image" />
        </div>
      ))
    ) : (
      <p>No CVs found for any candidate</p>
    )} */}

      {condidat ? (
        <div> 
          {condidat.cv.endsWith('.pdf') ? (
            <object data={`http://127.0.0.1:8000/cv/${condidat.cv}`} type="application/pdf" style={{width:'100%' , height:'1000px'}}></object>
          ) : ( 
             <img src={`http://127.0.0.1:8000/cv/${condidat.cv}`} alt="Description de l'image" /> 
            )}
        </div>
      ) : (
        <p>No CV found for this candidate</p>
      )}
    </div>
  );
}

export default CvC;
