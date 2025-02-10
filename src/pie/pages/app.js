import Footer from "../composants/footer";
import Header from "../composants/header";
import AjouterOffre from "./addOffre";
import Home from "./home";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCondidature from "./addCondidature";
import "./addoffre.css";
import AddRecruteur from "./addrecruteur";
import SpOffre from "./spOffre";
import Choix from "./choix";
import ConxCondidature from "./conxCondidature";
import ProfilC from "./profilC";
import CvC from "./cv";
import DetailOffre from "./detailOffre";
import MesOffres from "./mesOffres";
import ModifierOffre from "./modOffre";
import AdminDashboard from "./pagAdmin";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pageFilter/:motcle/:ville" element={<SpOffre />} />
          <Route path="/pageFilter/:motcle" element={<SpOffre />} />
          <Route path="/addCondidaure" element={<AddCondidature />} />
          <Route path="/addrecruteur" element={<AddRecruteur />} />
          <Route path="/choix" element={<Choix />} />
          <Route path="/ConxCondidat" element={<ConxCondidature />} />
          <Route path="/:id/:nom" element={<Home />} />
          <Route path="/profil/:id" element={<ProfilC />} />
          <Route path="/profilcvv/:id" element={<CvC />} />
          <Route path="/detailOffre/:id" element={<DetailOffre />} />
          <Route path="/mesOffres/:id" element={<MesOffres />} />
          <Route path="/addOffre" element={<AjouterOffre />} />
          <Route path="/editOffre/:id" element={<ModifierOffre />} />
          <Route path="/admin/:id" element={<AdminDashboard />} />
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
