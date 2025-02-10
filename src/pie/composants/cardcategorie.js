import { Link } from "react-router-dom";

 const Cardcategorie=(props) =>{

    return(
      <Link style={{textDecoration: "none"}} to={`/pageFilter/${props.nom}`}> 
      <div className="card ">
        <div className="card-body">
          <h5 className="card-title "> <h1><i className={props.icon}></i></h1></h5>
          <p className="card-text"> <h2>{props.nom}</h2></p>
        </div>
        <div className="card-text prg" >
        x emplois disponibles  <i className="bi bi-arrow-right ms-2 text-danger"></i>
        </div>
      </div></Link>
    )
}
export default Cardcategorie;