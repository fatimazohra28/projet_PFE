import { Link } from "react-router-dom";
import { format } from "date-fns";


 
const CardOffre = (props) => {
  const formattedDate = format(new Date(props.created_at), "d.M.y");

  return (
    <div className="offre">
       <Link to={`/detailOffre/${props.id}`} style={{textDecoration: "none" , color:"#07036D"}}>
       <div className="row cardoffre">
    
        <div className="col-2">
           <img className="img w-100" src={`http://127.0.0.1:8000/cv/${props.logo}`} alt="" />
           <div className="row">
        <div className="col-12">
        <p>Ville : {props.ville}</p>
      </div>
      </div> 
         </div>
        <div className="col-10">
            <h4 className="">{props.intitule}</h4>
            <p ><span className="prg">{formattedDate}  </span> <span className="ms-3 text-decoration-underline fs-5">{props.categorie} </span></p>
       <p>{props.description}</p>
        </div>
      </div>
    
      </Link> 
    </div>
  );
};
export default CardOffre;
