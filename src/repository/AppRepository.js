import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "http://localhost:3010/polynique_api"
});


/* -------------------------Personnel------------------------ */
export const getPersonnel = () => {
    return axiosApi.get("/personnels");
};

export const ajouterPersonnel = (data) => {
    return axiosApi.post("/personnel", data);
};

export const supprimerPersonnel = (id) => {
    return axiosApi.delete(`/personnel/${id}`);
};

export const getPersonnelById = (id) => {
    return axiosApi.get(`/personnel/${id}`);
};

export const modifierPersonnel = (id, data) => {
    return axiosApi.put(`/personnel/${id}`, data);
};


/* -------------------------Patient------------------------ */

export const getPatient = () => {
    return axiosApi.get("/patients");
};

export const ajouterPatient = (data) => {
    return axiosApi.post("/patient", data);
};

export const supprimerPatient = (id) => {
    return axiosApi.delete(`/patient/${id}`);
};

export const getPatientById = (id) => {
    return axiosApi.get(`/patient/${id}`);
};

export const modifierPatient = (id, data) => {
    return axiosApi.put(`/patient/${id}`, data);
};


/* -------------------------Rendez-vous------------------------ */
export const getRendezVous = () => {
    return axiosApi.get("/rendez_vous");
};

export const ajouterRendezVous = (data) => {
    return axiosApi.post("/rendez_vous", data);
};

export const supprimerRendezVous = (id) => {
    return axiosApi.delete(`/rendez_vous/${id}`);
};

/* export const getRendezVoustById = (id) => {
    return axiosApi.get(`/rendez_vous/${id}`);
};

export const modifierRendezVous = (id, data) => {
    return axiosApi.put(`/rendez_vous/${id}`, data);
}; */


/* -------------------------DossierMedicals------------------------ */

export const getDossierMedicals = () => {
    return axiosApi.get("/dossier_medical");
};

export const ajouterDossierMedical = (data) => {
    return axiosApi.post("/dossier_medical", data);
};

export const supprimerDossierMedical = (id) => {
    return axiosApi.delete(`/dossier_medical/${id}`);
};

export const getDossierMedicalById = (id) => {
    return axiosApi.get(`/dossier_medical/${id}`);
};

export const modifierDossierMedical= (id, data) => {
    return axiosApi.put(`/dossier_medical/${id}`, data);
};



/* -------------------------Traitement------------------------ */
export const getTraitements = () => {
    return axiosApi.get("/traitements");
};

export const ajouterTraitement = (data) => {
    return axiosApi.post("/traitement", data);
};

export const supprimerTraitement = (id) => {
    return axiosApi.delete(`/traitement/${id}`);
}