
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ajouterPatient.css";
import { ajouterPatient } from "../../../repository/AppRepository";


function AjouterPatient() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        dateNaissance: "",
        numeroTelephone: "",
        email: "",
        adresse: "",
        historiqueMedical: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ajouterPatient(formData);

            setFormData({
                nom: "",
                prenom: "",
                dateNaissance: "",
                numeroTelephone: "",
                email: "",
                adresse: "",
                historiqueMedical: ""
            })
            navigate("/admin/patient");
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };
    return (
        <div className="ajout-patient">
            <div className={`formulaire-patient`}>
                <form onSubmit={handleSubmit}>
                    <h2 className="span-title">Ajout nouveau patient</h2>
                    <input className="form-control" type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                    <input className="form-control" type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
                    <input className="form-control" type="date" name="dateNaissance" placeholder="Date de naissance" value={formData.dateNaissance} onChange={handleChange} required />
                    <input className="form-control" type="text" name="numeroTelephone" placeholder="Téléphone" value={formData.numeroTelephone} onChange={handleChange} required />
                    <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input className="form-control" type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required />
                    <textarea className="form-control" name="historiqueMedical" placeholder="Historique medical" value={formData.historiqueMedical} onChange={handleChange} required />
                    <div className="btn-group">
                        <button className="btn btn-sm btn-primary" type="submit" >Ajouter</button>
                        <button className="btn btn-sm btn-secondary" type="button" onClick={()=>navigate("/admin/patient")}>Fermer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AjouterPatient