import React, { useEffect, useState } from "react";
import { getPersonnel, ajouterPersonnel, supprimerPersonnel } from "../../../repository/AppRepository";
import "./personnel.css";
import { useNavigate } from "react-router-dom";


const Personnel = () => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        specialite: "",
        numeroTelephone: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const fetchPersonnel = async () => {
        try {
            const response = await getPersonnel();
            setPersonnel(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement du personnel :", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ajouterPersonnel(formData);
            fetchPersonnel();
            setFormData({ nom: "", prenom: "", specialite: "", numeroTelephone: "", email: "", role: "" });
            setIsModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du personnel :", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await supprimerPersonnel(id);
            fetchPersonnel();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const handleUpdate = async (id) => {
        navigate(`/admin/personnel/modifier-personnel/${id}`);

    };

    const showModal = () => {
        setIsModal(true);
    };

    const hideModal = () => {
        setIsModal(false);
    };

    
    const filteredPersonnel = personnel.filter((perso) =>
        `${perso.nom} ${perso.prenom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perso.numeroTelephone.includes(searchQuery)
    );

    return (
        <div className="containair-personnel">
            <div className={`formulaire-personnel ${isModal ? "active" : ""}`}>
                <form onSubmit={handleSubmit}>
                    <span className="span-title">Ajout Nouveau personnel</span>
                    <input className="form-control" type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                    <input className="form-control" type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
                    <input className="form-control" type="text" name="specialite" placeholder="Spécialité" value={formData.specialite} onChange={handleChange} required />
                    <input className="form-control" type="text" name="numeroTelephone" placeholder="Téléphone" value={formData.numeroTelephone} onChange={handleChange} required />
                    <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input className="form-control" type="text" name="role" placeholder="Rôle" value={formData.role} onChange={handleChange} required />
                    <div className="btn-group">
                        <button className="btn btn-sm btn-primary" type="submit">Ajouter</button>
                        <button className="btn btn-sm btn-danger" type="button" onClick={hideModal}>Fermer</button>
                    </div>
                </form>
            </div>
            <div className="table-personnel">
                <header>
                    <div className="header-left">
                        <h2>Liste du Personnel</h2>
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
                        <button onClick={showModal}>
                            <i className="bi bi-plus"></i>
                            <span>Nouveau</span>
                        </button>
                    </div>
                </header>
                <table className="table table-group-divider table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Spécialité</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>Rôle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPersonnel.length > 0 ? (
                            filteredPersonnel.map((perso) => (
                                <tr key={perso.id}>
                                    <td>{perso.nom} {perso.prenom}</td>
                                    <td>{perso.specialite}</td>
                                    <td>{perso.email}</td>
                                    <td>{perso.numeroTelephone}</td>
                                    <td>{perso.role}</td>
                                    <td className="td-action">
                                        <button className="btn btn-sm btn-success" onClick={() => handleUpdate(perso.id)}><i className="bi"></i>Modifier</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(perso.id)}><i className="bi bi-trash"></i> Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">Aucun personnel trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Personnel;
