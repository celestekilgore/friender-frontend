import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";

function RoutesList({login}) {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginForm login={login}/>} />
            
        </Routes>
    )
}

export default RoutesList;