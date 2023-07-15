import './App.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/login/login';
import Register from './components/register/register';
import Admin from './components/admin/admin';
import User from './components/user/user';


function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("LoggedIn");


  useEffect(() => {
    if (isLoggedIn === 'false' || isLoggedIn === 'null') {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className={isLoggedIn === 'false' ? 'App_login' : 'App'}>
      <Routes>
        <Route path="/login" exact element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" exact element={<Register />} />
      </Routes>
      {isLoggedIn === "true" ? (
        // <Admin></Admin>
        <User></User>
      ) : null}
    </div>
  );
}

export default App;
