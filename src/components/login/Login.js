import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Connexion";
    }, []);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) newErrors.email = "L'email est requis.";
        else if (!emailRegex.test(email)) newErrors.email = "L'email n'est pas valide.";

        if (!password) newErrors.password = "Le mot de passe est requis.";
        else if (password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (validate()) {
            if (email === "adminpolynique@gmail.com" && password === "password123") {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
                localStorage.setItem("auth-token", token);
                navigate("/admin/dashboard");
            } else {
                setErrors({ login: "Email ou mot de passe incorrect." });
            }
        }
    };

    return (
        <div className="connexion">
            <div className="bg-arriere">
                <div className="bg-left"></div>
                <div className="bg-rigth"></div>
            </div>
            <div className="contenue">
                <form className="formConnexion" onSubmit={handleLogin}>
                    <div className="logo">
                        <img className="image-log" src="/images/logoG.png" />
                    </div>
                    <div className="connexion-text">
                        <span>Connexion</span>
                    </div>
                    <div className="form-group">
                        <input
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="text"
                            placeholder=" "
                            className="input-connexion"

                        />
                        <label className="label-connexion" htmlFor="email">Votre email</label>
                        {errors.email && <small className="small-valid-connexion" style={{ color: 'red' }}>{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <input
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder=" "
                            className="input-connexion"

                        />
                        <label className="label-connexion" htmlFor="password">Votre mot de passe</label>
                        {errors.password && <small className="small-valid-connexion" style={{ color: 'red' }}>{errors.password}</small>}
                    </div>
                    <div className="isbutton-connexion">
                        <a className="mot-oublier" onClick={() => navigate("/mot_depasse_oublier")}>{/* Mot de passe oublier ? */}</a>
                        <button className="button-connexion">
                            {loading === false ? <span>Se connecter</span> : <span>...</span>}
                        </button>
                    </div>
                    {errors.login && <small style={{ color: 'red' }}>{errors.login}</small>}
                </form>
                <div className="dercription">
                    <img src="/images/monBoutique.png" className="imgDes" alt="Mon boutique" />
                </div>
            </div>
        </div>
    )
}

export default Login