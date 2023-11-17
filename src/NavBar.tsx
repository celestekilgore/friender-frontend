import React from "react";
import { NavLink, Link } from "react-router-dom";
import { UserInterface } from "./interfaces";

/** NavBar component
 *
 * Props:
 * - user: object like {username, zip_code, friend_radius, hobbies, interests, image}
 * - logout: function to call in parent.
 *
 * App -> NavBar
 */

function NavBar({ user, logout }: { user: UserInterface, logout: any; }) {

    if (user) {
        return (
            <nav className="navbar navbar-light bg-light">
                <NavLink to="/">Friender</NavLink>
                <div className="ms-auto">
                    <NavLink className="nav-item" to="/friends">Friends</NavLink>
                    <Link className="nav-item" to="/" onClick={logout}>{user.username} Logout</Link>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/">Friender</NavLink>
            <div className="ms-auto">
                <NavLink className="nav-item" to="/login">Login</NavLink>
                <NavLink className="nav-item" to="/register">Register</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;