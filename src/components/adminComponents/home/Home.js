import React, { useState, useEffect } from 'react';
import "./home.css";
import BarChart from '../barChart/BarChart';
import DoughnutChart from '../doughnutChart/DoughnutChart';
import { getDossierMedicals, getPatient, getRendezVous, getTraitements } from '../../../repository/AppRepository';

function Home() {
    const [dossierMedical, setDossierMedical] = useState([]);
    const [patient, setPatient] = useState([]);
    const [rendezvous, setRendezvous] = useState([]);
    const [traitement, setTraitement] = useState([]);
    useEffect(() => {
        fetchDossierMedical();
        fetchPatient();
        fetchRendezVous();
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

    const fetchRendezVous = async () => {
        try {
            const response = await getRendezVous();
            setRendezvous(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des rendez-vous :", error);
        }
    };

    const fetchDossierMedical = async () => {
        try {
            const response = await getDossierMedicals();
            setDossierMedical(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des rendez-vous :", error);
        }
    };

    const fetchPatient = async () => {
        try {
            const response = await getPatient();
            setPatient(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement du patient :", error);
        }
    };
    return (
        <div className="home-admin">
            <div className="home-header">
                <div className="header-section">
                    <small>{patient.length}</small>
                    <div className="stat-header">
                        <i className="bi bi-people"></i>
                        <span>Patient</span>
                    </div>
                </div>
                <div className="header-section">
                    <small>{rendezvous.length}</small>
                    <div className="stat-header">
                        <i className="bi bi-taxi-front"></i>
                        <span>Rendez-vous</span>
                    </div>
                </div>
                <div className="header-section">
                    <small>{dossierMedical.length}</small>
                    <div className="stat-header">
                        <i className="bi bi-file-earmark-post"></i>
                        <span>Dossier</span>
                    </div>
                </div>
                <div className="header-section">
                    <small>{traitement.length}</small>
                    <div className="stat-header">
                        <i className="bi bi-bandaid"></i>
                        <span>Traitement</span>
                    </div>
                </div>
            </div>
            <div className="graphique">
                <h1>Graphique de patient</h1>
                <div className="graph-vente">
                    <BarChart />
                    <DoughnutChart />
                </div>
            </div>
        </div>
    )
}
export default Home