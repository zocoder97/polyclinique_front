import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ajouterDossierMedical, ajouterRendezVous, getPatientById, getPersonnel } from "../../../repository/AppRepository";

import "./ajouterDossierMedicament.css"

function AjouterDossierMedicament() {
    const { idPatient } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientId: idPatient,
        diagnostic: "",
        prescription: "",
        note: ""
    });

    

    const [patient, setPatient] = useState({
        id: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        numeroTelephone: "",
        email: "",
        adresse: "",
        historiqueMedical: ""
    });

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await getPatientById(idPatient);
            setPatient(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des données du patient :", error);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ajouterDossierMedical(formData);
            navigate("/admin/dossier-medical");
        } catch (error) {
            console.error("Erreur lors de l'ajout du dossier-medical :", error);
        }
    };
    return (
        <div className="ajout-dossier">
            <div className="formulaire-ajout-dossier">
                <form onSubmit={handleSubmit}>
                    <h2 className="span-title">
                        Ajouter dossier medical pour <span>{patient.nom}</span>
                    </h2>
                    <div className="form-groups"> 
                        <label for="diagnostic">Diagnostic <small>*</small></label>
                        <input className="form-control" type="text" name="diagnostic" placeholder="Diagnostic" value={formData.diagnostic} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="prescription">Prescription <small>*</small></label>
                        <input className="form-control" type="text" name="prescription"  placeholder="Prescription" value={formData.prescription} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="note">Note <small>*</small></label>
                        <textarea className="form-control" name="note" placeholder="note" value={formData.note} onChange={handleChange} required />
                    </div>
                    <div className="btn-groups">
                        <button className="btn btn-sm btn-primary" type="submit">Enregistrer</button>
                        <button className="btn btn-sm btn-secondary" type="button" onClick={() => navigate("/admin/rendez-vous")}>Fermer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AjouterDossierMedicament;