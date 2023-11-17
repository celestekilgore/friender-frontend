import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PageNotFound from "./common/PageNotFound";
import GetPotentialFriend from "./GetPotentialFriend";
import FriendsList from "./FriendsList";
import { UserInterface } from "./interfaces";

/** RoutesList
 *
 * Props:
 * - login: function to pass down to LoginForm
 * - register: function to pass down to RegisterForm
 * - user: object like {username, friend_radius, zip_code, interests, hobbies, image}
 *
 * App -> RoutesList
 */
function RoutesList({ login, register, user }: { login: Function, register: Function, user: UserInterface; }) {
    if (user) {
        return (
            <Routes>
                <Route path="/" element={<GetPotentialFriend user={user} />} />
                <Route path="/friends" element={<FriendsList user={user} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/register" element={<RegisterForm register={register} />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default RoutesList;