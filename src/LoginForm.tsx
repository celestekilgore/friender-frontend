import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (err) {
            setAlerts(err);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                />
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                />
                <button onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            {alerts.length > 0 &&
                <div>
                    {alerts.map(alert => <i>{alert}</i>)}
                </div>
            }
        </div>
    );
}

export default LoginForm;