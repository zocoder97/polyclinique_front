import React, { useState } from 'react';
import "./oublier.css";
import { useNavigate } from 'react-router-dom';

function Oublier() {

    const [email, setEmail] = useState("");
    const [loding, setLoading] = useState(false);
    const navigate=useNavigate();

    const handleConfirm = (event) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="oublier">
            <div className="card">
                <div className="card-body">
                    <form className="formOublier" onSubmit={handleConfirm}>
                    <div className="logo">
                        <img className="image-log" src="/images/logoG.png" />
                    </div>
                        <div className="form-group">
                            <input
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                placeholder=" "
                            />
                            <label>Votre email</label>
                        </div>
                        <div className="isbutton-oublier">
                            <button className="button-oublier" type="submit">
                                {loding === false ? <span>Envoyer code de confirmation</span> : <span>...</span>}
                            </button>
                            <a className="linkConnexion" onClick={()=>navigate("/")}>Connexion</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Oublier