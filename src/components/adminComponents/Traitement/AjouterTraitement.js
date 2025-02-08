import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ajouterTraitement, getDossierMedicalById } from "../../../repository/AppRepository";


function AjouterTraitement() {
    const { dossierId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dossierId: dossierId,
        medicament: "",
        dosage: "",
        frequence: "",
        dateDebut: "",
        dateFin: "",
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
        fetchDossier();
    }, []);

    const fetchDossier = async () => {
        try {
            const response = await getDossierMedicalById(dossierId);
            setPatient(response.data.patient)
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
            await ajouterTraitement(formData);
            navigate("/admin/traitement");
        } catch (error) {
            console.error("Erreur lors de l'ajout du rendez-vous :", error);
        }
    };

    return (
        <div className="ajout-rendezvous">
            <div className="formulaire-rendezvous">
                <form onSubmit={handleSubmit}>
                    <h2 className="span-title">
                        Ajouter traitement pour <span>{patient.nom}</span>
                    </h2>
                    <div className="form-groups">
                        <label for="medicament">Medicament <small>*</small></label>
                        <input className="form-control" type="text" name="medicament" placeholder="Medicament" value={formData.medicament} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="dosage">Dosage <small>*</small></label>
                        <input className="form-control" name="dosage" placeholder="Dosage" value={formData.dosage} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="frequence">Frequence <small>*</small></label>
                        <input className="form-control" name="frequence" placeholder="Frequence" value={formData.frequence} onChange={handleChange} required />
                    </div>
                   <div className="form-groups">
                        <label for="dateDebut">Date de debut <small>*</small></label>
                        <input className="form-control" type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
                    </div>
                    <div className="form-groups">
                        <label for="dateFin">Date de debut <small>*</small></label>
                        <input className="form-control" type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} required />
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
export default AjouterTraitement;