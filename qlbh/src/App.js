import './App.css';
import React, { useState } from 'react'
import { Col, Row } from 'antd';
import Navbar from './components/navbar/navbar';
import Header from './components/header/header';
import Home from './components/home/home';
import Navigation from './components/navigation/navigation';

function App() {
  const [checkNavigate, setCheckNavigate] = useState(false)

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
    <div className='App'>
      <Row gutter={1}>
        <Col span={checkNavigate ? 1 : 3} className='name'>
          <Navigation check={checkNavigate}></Navigation>
        </Col>
        <Col span={checkNavigate ? 23 : 21} className='name1'>
          <Navbar onClick={handleClick} ></Navbar>
          <Header onClick={handleClick} ></Header>
          <Home></Home>
        </Col>
      </Row>
    </div>
  );
}

export default App;
