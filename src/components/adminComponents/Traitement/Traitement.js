import React, { useEffect, useState } from "react";
import { getTraitements, supprimerTraitement } from "../../../repository/AppRepository";
import { data } from "react-router-dom";

function Traitement() {
    const [traitement, setTraitement] = useState([]);

    useEffect(() => {
        fetchTraitement();
    }, []);

    const fetchTraitement = async () => {
        try {
            const response = await getTraitements();
            setTraitement(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des rendez-vous :", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await supprimerTraitement(id);
            fetchTraitement();
        } catch (error) {
            console.log("Supprimer rendez-vous avec ID:", id);
        }
    };


    return (
        <div className="rendez-vous">
            <header>
                <h2>Liste des Rendez-vous</h2>
                <div className="input-recherche">
                  {/*   <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher par nom"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Rechercher par date"
                        className="form-control"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    /> */}
                </div>
            </header>
            <table className="table table-group-divider table-bordered">
                <thead>
                    <tr>
                        <th>Medicament</th>
                        <th>Dosage</th>
                        <th>Frequence</th>
                        <th>Date de debut</th>
                        <th>Date fin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {traitement.length > 0 ? (
                        traitement.map((rendez) => (
                            <tr key={rendez.id}>
                                {/* <td>{rendez.patient?.nom} {rendez.patient?.prenom}</td> */}
                                <td>{rendez.medicament}</td>
                                <td>{rendez.dosage}</td>
                                <td>{rendez.frequence}</td>
                                <td>{new Date(rendez.dateDebut).toLocaleDateString()}</td>
                                <td>{new Date(rendez.dateFin).toLocaleDateString()}</td>
                                <td className="td-action">
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rendez.id)}> <i className="bi bi-trash"></i> Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Aucun traitement trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Traitement;