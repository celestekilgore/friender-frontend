import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterFormInterface } from "./interfaces";
import Alert from "./common/Alert";

const DEFAULT_FORM_DATA: RegisterFormInterface = {
    username: "",
    password: "",
    zip_code: "",
    friend_radius: "",
    hobbies: "",
    interests: "",
    image: "",
};

/** Form for registering a new user.
 *
 * Props:
 * - register: function to call in parent
 *
 * State:
 * - formData: object like {username, password, zip_code, friend_radius, hobbies, interests, image}
 * - alerts: array of alerts like ["Error: invalid zip code"]
 * - image: File
 *
 * App -> RoutesList -> RegisterForm
 */

function RegisterForm({ register }: {register: Function}) {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    const [alerts, setAlerts] = useState([]);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        try {
            await register({ ...formData, image });
            navigate("/");
        } catch (errors) {
            setAlerts(errors);
        }
    }

    function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = evt.target;

        setFormData(l => ({ ...l, [name]: value }));
    }

    function handleImageChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = evt.target;

        setFormData(l => ({ ...l, [name]: value }));
        setImage(files[0] || null);
    }

    return (
        <div className="Form RegisterForm">
            <h1>Register</h1>
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

                <label className="form-label">Zip Code</label>
                <input
                    type="text"
                    name="zip_code"
                    className="form-control"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                />

                <label className="form-label">Friend Radius</label>
                <input
                    type="number"
                    name="friend_radius"
                    className="form-control"
                    value={formData.friend_radius}
                    onChange={handleChange}
                    required
                />

                <label className="form-label">Hobbies</label>
                <textarea
                    name="hobbies"
                    className="form-control"
                    value={formData.hobbies}
                    onChange={handleChange}
                    required
                />

                <label className="form-label">Interests</label>
                <textarea
                    name="interests"
                    className="form-control"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                />

                <label className="form-label">Image</label>
                <input
                    type="file"
                    name="image"
                    className="form-control"
                    value={formData.image}
                    onChange={handleImageChange}
                />

                <button className="btn btn-primary mt-3" type="submit">
                    Register
                </button>
            </form>
            {alerts.length > 0 &&
                <Alert alerts={alerts} category={"danger"} />
            }
        </div>
    );
}

export default RegisterForm;