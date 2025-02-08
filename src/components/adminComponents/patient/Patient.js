import React, { useEffect, useState } from 'react';
import "./patient.css"
import { useNavigate } from "react-router-dom";
import { getPatient, supprimerPatient } from "./../../../repository/AppRepository"

function Patient() {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [patient, setPatient] = useState([]);


    useEffect(() => {
        fetchPatient()
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await getPatient();
            setPatient(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement du patient :", error);
        }
    };

    const handleUpdate = async (id) => {
        navigate(`/admin/patient/modifier-patient/${id}`);

    };

    const createRendez = async (id) => {
        navigate(`/admin/rendez-vous/ajouter-rendez-vous/${id}`);

    };

    const createDoc = async (id) => {
        navigate(`/admin/dossier-medical/ajouter-dossier-medical/${id}`);
    };

    const filteredPatient = patient.filter((patient) =>
        `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.numeroTelephone.includes(searchQuery)
    );
    return (
        <div className="patient-container">
            <header>
                <div className="header-left">
                    <h2>Liste patient</h2>
                </div>
                <div className="header-right">
                    <div className="input-search">
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou téléphone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <i className="bi bi-search"></i>
                    </div>
                    <button onClick={() => navigate("/admin/patient/ajouter-patient")}>
                        <i className="bi bi-plus"></i>
                        <span>Nouveau</span>
                    </button>
                </div>
            </header>

            <table className="table table-group-divider table-bordered">
                <thead>
                    <tr>{/* nom,prenom,dateNaissance,adresse,numeroTelephone,email,historiqueMedical */}
                        <th>Nom</th>
                        <th>dateNaissance</th>{/* 
                        <th>Email</th> */}
                        <th>adresse</th>
                        <th>Telephone</th>
                        <th>historiqueMedical</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatient.length > 0 ? (
                        filteredPatient.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.nom} {patient.prenom}</td>
                                <td>{patient.dateNaissance}</td>
                                {/* <td>{patient.email}</td> */}
                                <td>{patient.adresse}</td>
                                <td>{patient.numeroTelephone}</td>
                                <td>{patient.historiqueMedical}</td>
                                <td className="td-action">
                                    <button className="btn btn-sm btn-success" onClick={() => handleUpdate(patient.id)}><i className="bi bi-pencil-square"></i> Modifier</button>
                                    <button className="btn btn-sm btn-warning" onClick={() => createRendez(patient.id)}><i className="bi bi-plus"></i> Rendez-vous</button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => createDoc(patient.id)}><i className="bi bi-plus"></i> Dossier</button>{/* 
                                    <button className="btn btn-sm btn-info" onClick={() => createDoc(patient.id)}><i className="bi bi-journal"></i> Historique</button> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">Aucun patient trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default Patient