import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDossierMedicalById, getTraitements } from "../../../repository/AppRepository";
import "./listTraiment.css"

function ListTraitementByDossier() {
    const { dossierId } = useParams();
    
    const [traitements, setTraitements] = useState([]);
    const [filteredTraitements, setFilteredTraitements] = useState([]); // Liste filtrée
    const [dossier, setDossier] = useState(null);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        fetchDossier();
        fetchTraitements();
    }, []);

    useEffect(() => {
        // Filtrer les traitements après leur chargement
        setFilteredTraitements(traitements.filter(t => t.dossierId === parseInt(dossierId)));
    }, [traitements, dossierId]);

    const fetchDossier = async () => {
        try {
            const response = await getDossierMedicalById(dossierId);
            setDossier(response.data);
            setPatient(response.data.patient);
        } catch (error) {
            console.error("Erreur lors du chargement du dossier médical :", error);
        }
    };

    const fetchTraitements = async () => {
        try {
            const response = await getTraitements();
            setTraitements(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des traitements :", error);
        }
    };

    return (
        <div className="details-traitement">
            <h3>Liste des traitements pour le dossier {dossierId}</h3>
            {patient && <p>Patient: <span>{patient.nom} {patient.prenom}</span></p>}
            <table className="table table-group-divider table-bordered">
                <thead>
                    <tr>
                        <th>Médicament</th>
                        <th>Dosage</th>
                        <th>Fréquence</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTraitements.length > 0 ? (
                        filteredTraitements.map((traitement) => (
                            <tr key={traitement.id}>
                                <td>{traitement.medicament}</td>
                                <td>{traitement.dosage}</td>
                                <td>{traitement.frequence}</td>
                                <td>{new Date(traitement.dateDebut).toLocaleDateString()}</td>
                                <td>{new Date(traitement.dateFin).toLocaleDateString()}</td>
                              
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Aucun traitement trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListTraitementByDossier;
