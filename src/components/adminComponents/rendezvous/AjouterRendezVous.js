import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ajouterRendezVous, getPatientById, getPersonnel } from "../../../repository/AppRepository";
import "./ajouterRendezVous.css"

function AjouterRendezVous() {
    const { idPatient } = useParams();
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [formData, setFormData] = useState({
        patientId: idPatient,
        personnelId: "",
        dateHeure: "",
        heure: "",
        motif: "",
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
        fetchPersonnel();
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

    const fetchPersonnel = async () => {
        try {
            const response = await getPersonnel();
            setPersonnel(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des personnels :", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ajouterRendezVous(formData);
            navigate("/admin/rendez-vous");
        } catch (error) {
            console.error("Erreur lors de l'ajout du rendez-vous :", error);
        }
    };

    return (
        <div className="ajout-rendezvous">
            <div className="formulaire-rendezvous">
                <form onSubmit={handleSubmit}>
                    <h2 className="span-title">
                        Ajouter Rendez-vous pour <span>{patient.nom}</span>
                    </h2>
                    <div className="form-groups">
                        <label for="personnelId">Personnel <small>*</small></label>
                        <select className="form-select" name="personnelId" value={formData.personnelId} onChange={handleChange} required>
                            <option value="">Sélectionner un personnel</option>
                            {personnel.map((perso) => (
                                <option key={perso.id} value={perso.id}>{perso.nom} {perso.prenom}</option>
                            ))}
                        </select>
                    </div>                   {/* 
                    <input className="form-control" type="text" name="nom" placeholder="Nom" value={patient.nom} readOnly /> */}
                    <div className="form-groups">
                        <label for="dateHeure">Date <small>*</small></label>
                        <input className="form-control" type="date" name="dateHeure" value={formData.dateHeure} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="heure">Heure <small>*</small></label>
                        <input className="form-control" type="time" name="heure" value={formData.heure} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="motif">Motif <small>*</small></label>
                        <textarea className="form-control" name="motif" placeholder="Motif" value={formData.motif} onChange={handleChange} required />
                    </div>
                    <div className="btn-groups">
                        <button className="btn btn-sm btn-primary" type="submit">Enregistrer</button>
                        <button className="btn btn-sm btn-secondary" type="button" onClick={() => navigate("/admin/rendez-vous")}>Fermer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AjouterRendezVous;
