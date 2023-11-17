import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="HomePage vertical-center">
            <h1 className="title">Friender</h1>
            <Link className="btn btn-primary m-2" to="/login">Login</Link>
            <Link className="btn btn-primary m-2" to="/register">Register</Link>
        </div>
    );
}

export default HomePage;