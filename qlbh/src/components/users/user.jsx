import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from '../navbar/navbar';
import Home from './home/home';
import Profile from './profile/profile';
import Practice from './practice/practice';
import PracticePart from './practice/practicePart/practicePart';
// import Footer from '../footer/footer';
import Test from './practice/practiceTopic/test/test';
import Question from './question/question';

export default function User() {
  return (
    <div className='home'>
      <div className='grid wide'>
        <Navbar></Navbar>
        <div className='setting-mb' style={{ 'minHeight': '513px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/part" element={<PracticePart />} />
            <Route path="/practice/part/topic/*" element={<Test />} />
            <Route path="/practice/part/Question" element={<Question />} />
          </Routes>
        </div>
          {/* <Footer></Footer> */}
      </div>
    </div>
  )
}
