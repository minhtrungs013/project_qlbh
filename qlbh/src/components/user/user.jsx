import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Route, Routes  } from "react-router-dom";
import Grammar from './grammar/grammar';
import Navbar from './navbar/navbar';
import Slider from './slider/slider';
import Practice from './practice/practice';
import PracticeListening from './practice/practiceListening/practiceListening';
import PracticeReading from './practice/practiceReading/practiceReading';
import VocabularyUser from './vocabularyUser/vocabularyUser';
import Notfound from '../notfound/notfound';
export default function User() {

    return (
        <>
            <Row gutter={1}>
                <Col span={24} className=''>
                    <Navbar></Navbar>
                    <Slider></Slider>
                    <Routes>
                        <Route path="/vocabulary" element={<VocabularyUser />} />
                        <Route path="/grammar" element={<Grammar />} />
                        <Route path="/practice/*" element={<Practice />} />
                        <Route path="/practice/listen" element={<PracticeListening />} />
                        <Route path="/practice/read" element={<PracticeReading />} />
                        <Route path="/practice/speak" element={<PracticeListening />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </Col>
            </Row>
        </>
    )
}
