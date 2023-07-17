import { Col, Row } from 'antd';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Grammar from './grammar/grammar';
import Navbar from './navbar/navbar';
import Slider from './slider/slider';
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
                </Col>
            </Row>
        </>
    )
}
