import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./common/Alert";
import { LoginInterface } from "./interfaces";

/** Login Form component
 *
 * Props:
 * - login: function to call in parent
 *
 * State:
 * - formData: object like {username, password}
 * - alerts: array of alerts like ["Error: invalid username/password"]
 *
 * RoutesList -> LoginForm
 */

function LoginForm({ login }: { login: Function; }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>): Promise<void> {
        evt.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (errors) {
            setAlerts(errors);
        }
    }

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
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
            {alerts.length > 0 &&
                <Alert alerts={alerts} category={"danger"} />
            }
        </div>
    );
}

export default LoginForm;