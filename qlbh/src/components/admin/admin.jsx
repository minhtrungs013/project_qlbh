import React, { useState } from 'react'
import {  Route, Routes  } from "react-router-dom";
import { Col, Row } from 'antd';
import Navbar from './navbar/navbar';
import Product from './product/product';
import Home from './home/home';
import Chat from './chat/chat';
import Navigation from './navigation/navigation';
import Category from './category/category';
import Vocabulary from './vocabulary/vocabulary';




export default function Admin() {
  const [checkNavigate, setCheckNavigate] = useState(false)


  function handleClick() {
    if (checkNavigate === false) {
      setCheckNavigate(true)
    } else {
      setCheckNavigate(false)

    }
  }

  return (
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
        <Routes>
          <Route path="/category" element={<Category />} />
        </Routes>
        <Routes>
          <Route path="/vocabulary" element={<Vocabulary/>}/>
        </Routes>
      </Col>
    </Row>
  )
}
