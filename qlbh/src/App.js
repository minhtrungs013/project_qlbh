import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Col, Row } from 'antd';
import Navbar from './components/navbar/navbar';
import Product from './components/product/product';
import Home from './components/home/home';
import Chat from './components/chat/chat';
import Navigation from './components/navigation/navigation';
import Login from './components/login/login';

function App() {
  const [checkNavigate, setCheckNavigate] = useState(false)
  const isLoggedIn = localStorage.getItem("LoggedIn");

  function handleClick() {
    if (checkNavigate === false) {
      setCheckNavigate(true)
      console.log(checkNavigate)
    } else {
      setCheckNavigate(false)
      console.log(checkNavigate)

    }
  }
  return (
    <BrowserRouter>
      <div className='App'>
        {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes> ) : (
          <Row gutter={1}>
            <Col span={checkNavigate ? 1 : 3} className='name'>
              <Navigation check={checkNavigate}></Navigation>
            </Col>
            <Col span={checkNavigate ? 23 : 21} className='name1'>
              <Navbar onClick={handleClick} ></Navbar>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
              <Routes>
                <Route path="/product" element={<Product />} />
              </Routes>
              <Routes>
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </Col>
          </Row>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
