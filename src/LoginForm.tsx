import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./common/Alert";

function LoginForm({ login }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [alerts, setAlerts] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (err) {
            console.log(err)
            setAlerts(err);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <div className="Form LoginForm">
            <h1>Login</h1>
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
                <button type="submit" className="btn btn-primary mt-3">
                    Login
                </button>
            </form>
            {Object.keys(alerts).length > 0 &&
                <Alert alerts={alerts} category={"danger"} />
            }
        </div>
    );
}

export default LoginForm;