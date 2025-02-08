import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Retirez `Router`
import { AppContext } from './repository/AppRepository';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import Home from './components/adminComponents/home/Home';
import AdminLayout from './layout/admin/AdminLayout';
import Login from './components/login/Login';
import Personnel from './components/adminComponents/personnel/Personel';
import ModifierPersonnel from './components/adminComponents/personnel/ModifierPersonnel';
import Patient from './components/adminComponents/patient/Patient';
import AjouterPatient from './components/adminComponents/patient/AjouterPatient';
import ModifierPatient from './components/adminComponents/patient/ModifierPatient';
import RendezVous from './components/adminComponents/rendezvous/RendezVous';
import AjouterRendezVous from './components/adminComponents/rendezvous/AjouterRendezVous';
import ModifierRendezVous from './components/adminComponents/rendezvous/ModifierRendezVous';
import DossierMedicament from './components/adminComponents/dossierMedicament/DossierMedicament';
import ModifierDossierMedicament from './components/adminComponents/dossierMedicament/ModifierDossierMedicament';
import AjouterDossierMedicament from './components/adminComponents/dossierMedicament/AjouterDossierMedicament';
import Traitement from './components/adminComponents/Traitement/Traitement';
import AjouterTraitement from './components/adminComponents/Traitement/AjouterTraitement';
import ProtectedRoute from './components/ProtectedRoute';
import ListTraitementByDossier from './components/adminComponents/Traitement/ListTraitementByDossier';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Route Admin avec enfants */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        {/* <Route path="/admin" element={<AdminLayout />}> */}
          <Route path="dashboard" element={<Home />} />
          {/* Route personnel */}
          <Route path="personnel" element={<Personnel />} />
          <Route path="personnel/modifier-personnel/:id" element={<ModifierPersonnel />} />

          {/* Route patient */}
          <Route path="patient" element={<Patient />} />
          <Route path="patient/modifier-patient/:id" element={<ModifierPatient />} />
          <Route path="patient/ajouter-patient" element={<AjouterPatient />} />

          {/* Route patient */}
          <Route path="rendez-vous" element={<RendezVous />} />
          <Route path="rendez-vous/modifier-rendez-vous/:id" element={<ModifierRendezVous />} />
          <Route path="rendez-vous/ajouter-rendez-vous/:idPatient" element={<AjouterRendezVous />} />

          {/* Route dossier Medicament */}
          <Route path="dossier-medical" element={<DossierMedicament />} />
          <Route path="dossier-medical/modifier-dossier-medical/:id" element={<ModifierDossierMedicament />} />
          <Route path="dossier-medical/ajouter-dossier-medical/:idPatient" element={<AjouterDossierMedicament />} />

          
          {/* Route dossier Medicament */}
          <Route path="traitement" element={<Traitement />} />
          <Route path="traitement/modifier-traitement/:id" element={<ModifierDossierMedicament />} />
          <Route path="traitement/ajouter-traitement/:dossierId" element={<AjouterTraitement />} />
          <Route path="traitement/details-traitement/:dossierId" element={<ListTraitementByDossier />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;