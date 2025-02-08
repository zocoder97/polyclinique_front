import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getDossierMedicals, getPatient, getRendezVous, getTraitements } from '../../../repository/AppRepository';

// Enregistrer les modules nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [state, setState] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, rendezvousRes, dossierMedicalRes, traitementsRes] = await Promise.all([
          getPatient(),
          getRendezVous(),
          getDossierMedicals(),
          getTraitements(),
        ]);

        setState([
          patientsRes.data.length,
          rendezvousRes.data.length,
          dossierMedicalRes.data.length,
          traitementsRes.data.length,
        ]);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Patients', 'Rendez-vous', 'Documents', 'Traitements'],
    datasets: [
      {
        label: 'Répartition',
        data: state,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Rouge
          'rgba(54, 162, 235, 0.6)', // Bleu
          'rgba(255, 206, 86, 0.6)', // Jaune
          'rgba(75, 192, 192, 0.6)', // Vert
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Rouge
          'rgba(54, 162, 235, 1)', // Bleu
          'rgba(255, 206, 86, 1)', // Jaune
          'rgba(75, 192, 192, 1)', // Vert
        ],
        borderWidth: 2, // Bordure visible
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position de la légende
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
