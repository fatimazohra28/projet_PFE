import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CardOffre from "../composants/cardoffre";
import axios from "axios";
import Header from "../composants/header";
import Footer from '../composants/footer';
import './conx.css';


const Choix = () => {
 return (<>
 <Header />
 <div className="row bg-light choix1">
    <div className="col-6 col-md-12  "> <h1>Choisir votre  inscription </h1></div>
 </div>
    <div className="container choix">
       
        <div className="row">
            <div className="col-12 col-md-6 condidat"><p>Vous etes un condidat </p><Link style={{textDecoration: 'none',color:'#07036D'}} to={`/addCondidaure`}><h2>cliquer ici <i className="bi bi-arrow-right ms-2 text-danger"></i></h2></Link></div>
            <div className="col-12 col-md-6 entrep"><p>Vous etes un recruteur</p><Link style={{textDecoration: 'none' ,color:'#e3cdb6'}} to={`/addrecruteur`}><h2>cliquer ici <i className="bi bi-arrow-right ms-2 text-danger"></i></h2></Link></div>

        </div>
    </div>
    <Footer />
    </>
 )
};

export default Choix;
