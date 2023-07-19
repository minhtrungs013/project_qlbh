import { Col, Row } from 'antd';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Grammar from './grammar/grammar';
import Navbar from './navbar/navbar';
import Slider from './slider/slider';
import Practice from './practice/practice';
import PracticeListening from './practice/practiceListening/practiceListening';
import PracticeReading from './practice/practiceReading/practiceReading';
import VocabularyUser from './vocabularyUser/vocabularyUser';

export default function user() {

    return (
        <>
            <Row gutter={1}>
                <Col span={24} className=''>
                    <Navbar></Navbar>
                    <Slider></Slider>
                    <Routes>
                        <Route path="/vocabulary" element={<VocabularyUser />} />
                    </Routes>
                    <Routes>
                        <Route path="/grammar" element={<Grammar />} />
                    </Routes>
                    <Routes>
                        <Route path="/practice" element={<Practice />} />
                    </Routes>
                    <Routes>
                        <Route path="/practice/listen" element={<PracticeListening />} />
                    </Routes>
                    <Routes>
                        <Route path="/practice/read" element={<PracticeReading />} />
                    </Routes>
                    <Routes>
                        <Route path="/practice/speak" element={<PracticeListening />} />
                    </Routes>
                </Col>
            </Row>
        </>
    )
}
