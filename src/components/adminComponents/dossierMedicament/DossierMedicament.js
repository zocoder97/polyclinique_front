import React, { useEffect, useState } from "react";
import { getDossierMedicals, supprimerDossierMedical} from "../../../repository/AppRepository";
import "./dossierMedicament.css"
import { useNavigate } from "react-router-dom";

function DossierMedicament() {

    const navigate = useNavigate();
    const [dossierMedical, setDossierMedical] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        fetchDossierMedical();
    }, []);

    const fetchDossierMedical = async () => {
        try {
            const response = await getDossierMedicals();
            setDossierMedical(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des rendez-vous :", error);
        }
    };

    const createTraitement = async (id) => {
        navigate(`/admin/traitement/ajouter-traitement/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await supprimerDossierMedical(id);
            fetchDossierMedical();
        } catch (error) {
            console.log("Supprimer rendez-vous avec ID:", id);
        }
    };

    const detailsTraitement=(id)=>{
        navigate(`/admin/traitement/details-traitement/${id}`);
    }

    // Filtrage des rendez-vous selon le nom du patient et la date
    const filtereDossierMedical = dossierMedical.filter((rendez) => {
        const fullName = `${rendez.patient.nom} ${rendez.patient.prenom}`.toLowerCase();
        return (
            (searchName === "" || fullName.includes(searchName.toLowerCase()))
        );
    });
    return (
        <div className="dossier">
            <header>
                <h2>Liste des dossier medical</h2>
                <div className="input-recherche">
                    <input
                        type="text"
                        placeholder="Rechercher par nom"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <div className="incon">
                        <i className="bi bi-search"></i>
                    </div>
                </div>
            </header>
            <table className="table table-group-divider table-bordered">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Téléphone</th>
                        <th>Diagnostic</th>
                        <th>Prescription</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filtereDossierMedical.length > 0 ? (
                        filtereDossierMedical.map((rendez) => (
                            <tr key={rendez.id}>
                                <td>{rendez.patient?.nom} {rendez.patient?.prenom}</td>
                                <td>{rendez.patient?.numeroTelephone}</td>
                                <td>{rendez.diagnostic}</td>
                                <td>{rendez.prescription}</td>
                                <td>{rendez.note}</td>
                                <td className="td-action">
                                    <button className="btn btn-sm btn-secondary" onClick={() => createTraitement(rendez.id)}> <i className="bi bi-plus"></i> Traitement</button>
                                    <button className="btn btn-sm btn-success" onClick={() => detailsTraitement(rendez.id)}> <i className="bi bi-eye"></i> Details</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rendez.id)}> <i className="bi bi-trash"></i> Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Aucun dossier trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default DossierMedicament;