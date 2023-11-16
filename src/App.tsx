import './App.css';
import React, { useState, useEffect } from "react";
import RoutesList from "./RoutesList";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FrienderApi from "./FrienderApi"

interface PayloadInterface {
  username: string
}

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({
    data: null,
    isLoading: true
  });

  useEffect(
    function loadCurrentUser() {
      async function getCurrentUser() {
        if (token) {
          try {
            let {username}:PayloadInterface = jwtDecode(token);

            let user = await FrienderApi.getUser(username);

            // setUser({

            //   data: user,
            //   isLoading: false
            // })
          }
          catch (err) {
            throw (err.message);
          }
        }
        setUser({
          data: null,
          isLoading: false
        })
      }
      getCurrentUser();
    }, [token]);

  async function login(loginData) {
    const token = await FrienderApi.login(loginData);
    setToken(token);
  }

  console.log("TOKEN",token);

  if (user.isLoading) return <i>Loading...</i>;

  return (
    <BrowserRouter>
      <div className="App">
        <RoutesList login={login}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
