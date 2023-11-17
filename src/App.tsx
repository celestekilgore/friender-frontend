import './App.css';
import React, { useState, useEffect } from "react";
import RoutesList from "./RoutesList";
import NavBar from './NavBar';
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FrienderApi from "./FrienderApi";

interface PayloadInterface {
  username: string;
}

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(
    function loadCurrentUser() {
      async function getCurrentUser() {
        FrienderApi.token = token;

        if (token) {
          localStorage.setItem("token", token);

          try {
            let { username }: PayloadInterface = jwtDecode(token);

            let user = await FrienderApi.getUser(username);

            setUser(user);
          }
          catch (err) {
            // throw (err.message);
            logout()
          }
        } else {
          localStorage.clear();
          setUser(null);
        }

      }
      getCurrentUser();
    }, [token]);

  async function login(loginData) {
    const token = await FrienderApi.login(loginData);
    setToken(token);
  }

  async function register(registerData) {
    const token = await FrienderApi.register(registerData);
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  if (token && !user) return <h1 className="vertical-center loading">Loading...</h1>;

  return (
    <BrowserRouter>
      <div className="bg-image"></div>
      <div className="App">

        <NavBar user={user} logout={logout} />
        <RoutesList login={login} register={register} user={user} />
      </div>
    </BrowserRouter>
  );
}

export default App;
