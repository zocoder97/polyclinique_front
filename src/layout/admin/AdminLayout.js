import React from 'react';
import { Outlet, NavLink , useNavigate} from 'react-router-dom';
import "./adminlayout.css";

function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        navigate("/");
    };
    return (
        <div className="admin-layout">
            <header className="nav-bar">
                <div className="logo-nav">
                    <img className="image-log-nav" src="/images/logoG.png" alt="Logo" />
                </div>
                <div className="navigation-admin">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-house"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/admin/personnel"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-people"></i>
                        <span>Personnel</span>
                    </NavLink> 
                    <NavLink
                        to="/admin/patient"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-person-fill-down"></i>
                        <span>Patient</span>
                    </NavLink> 
                    <NavLink
                        to="/admin/rendez-vous"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-taxi-front"></i>
                        <span>Rendez-vous</span>
                    </NavLink> 
                    <NavLink
                        to="/admin/dossier-medical"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-file-earmark-post"></i>
                        <span>Dossier</span>
                    </NavLink>
                    <NavLink
                        to="/admin/traitement"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-bandaid"></i>
                        <span>Traitement</span>
                    </NavLink>                 
                   {/*  <NavLink
                        to="/admin/statistique"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi-graph-down"></i>
                        <span>Statistique</span>
                    </NavLink> */}
                   {/*  <NavLink
                        to="/admin/parametres"
                        className={({ isActive }) => isActive ? "link active-link" : "link"}
                    >
                        <i className="bi bi-gear"></i>
                        <span>Paramétres</span>
                    </NavLink> */}
                </div>
            </header>
            <main className="main-admin">
                <div className="sidebar">
                    <div className="sidebar-left">
                        {/* <i className="bi bi-justify"></i> */}
                    </div>
                    <div className="sidebar-rigth">
                       {/*  <span className="isnotification">
                            <i className="notification bi bi-bell-fill"></i>
                            <small className="nombre-notification">5</small>
                        </span> */}
                        <img title="Deconnexion" onClick={handleLogout} className="image-user" src="/images/monBoutique.png" alt="Mon images" />
                    </div>
                </div>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
