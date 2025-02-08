import React, { useEffect, useState } from "react";
import { getRendezVous, supprimerRendezVous } from "../../../repository/AppRepository";
import "./rendezVous.css";

function RendezVous() {
    const [rendezvous, setRendezvous] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchDate, setSearchDate] = useState("");

    useEffect(() => {
        fetchRendezVous();
    }, []);

    const fetchRendezVous = async () => {
        try {
            const response = await getRendezVous();
            setRendezvous(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des rendez-vous :", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await supprimerRendezVous(id);
            fetchRendezVous();
        } catch (error) {
            console.log("Supprimer rendez-vous avec ID:", id);
        }
    };

    // Filtrage des rendez-vous selon le nom du patient et la date
    const filteredRendezvous = rendezvous.filter((rendez) => {
        const fullName = `${rendez.patient.nom} ${rendez.patient.prenom}`.toLowerCase();
        const formattedDate = new Date(rendez.dateHeure).toISOString().split("T")[0];
        return (
            (searchName === "" || fullName.includes(searchName.toLowerCase())) &&
            (searchDate === "" || formattedDate === searchDate)
        );
    });

    return (
        <div className="rendez-vous">
            <header>
                <h2>Liste des Rendez-vous</h2>
                <div className="input-recherche">
                    <input
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
                    />
                </div>
            </header>
            <table className="table table-group-divider table-bordered">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Médecin</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Motif</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRendezvous.length > 0 ? (
                        filteredRendezvous.map((rendez) => (
                            <tr key={rendez.id}>
                                <td>{rendez.patient?.nom} {rendez.patient?.prenom}</td>
                                <td>{rendez.patient?.email}</td>
                                <td>{rendez.patient?.numeroTelephone}</td>
                                <td>{rendez.personnel?.nom} {rendez.personnel?.prenom}</td>
                                <td>{new Date(rendez.dateHeure).toLocaleDateString()}</td>
                                <td>{rendez.heure}</td>
                                <td>{rendez.motif}</td>
                                <td className="td-action">
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rendez.id)}> <i className="bi bi-trash"></i> Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Aucun rendez-vous trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default RendezVous;