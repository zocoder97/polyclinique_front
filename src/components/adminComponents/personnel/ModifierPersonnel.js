import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPersonnelById, modifierPersonnel } from "../../../repository/AppRepository";
import "./modifierPersonnel.css"

const ModifierPersonnel = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();  

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        specialite: "",
        numeroTelephone: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const fetchPersonnel = async () => {
        try {
            const response = await getPersonnelById(id);
            setFormData(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await modifierPersonnel(id, formData);            
            setFormData({ nom: "", prenom: "", specialite: "", numeroTelephone: "", email: "", role: "" });
            navigate("/admin/personnel");
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };

    return (
        <div className="modifierPersonnel-container">
            <div className="modifierPersonnel-formulaire">
            <h2>Modifier Personnel</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                <input className="form-control" type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
                <input className="form-control" type="text" name="specialite" placeholder="Spécialité" value={formData.specialite} onChange={handleChange} required />
                <input className="form-control" type="text" name="numeroTelephone" placeholder="Téléphone" value={formData.numeroTelephone} onChange={handleChange} required />
                <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input className="form-control" type="text" name="role" placeholder="Rôle" value={formData.role} onChange={handleChange} required />
                <div className="btn-group">
                    <button className="btn btn-sm btn-primary" type="submit">Enregistrer</button>
                    <button className="btn btn-sm btn-secondary" type="button" onClick={() => navigate("/admin/personnel")}>Annuler</button>
                </div>
            </form>
            </div>
        </div>
    );
};
export default ModifierPersonnel;
