import { Col, Row } from 'antd';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Grammar from './grammar/grammar';
import Navbar from './navbar/navbar';
import Slider from './slider/slider';
import Practice from './practice/practice';
import PracticeSkill from './practice/practiceSkill/practiceSkill';
import PracticeTopic from './practice/practiceTopic/practiceTopic';
import VocabularyUser from './vocabularyUser/vocabularyUser';
import Question from './question/question';
import Notfound from '../notfound/notfound';


export default function User() {
    return (
        <>
            <Row gutter={1}>
                <Col span={24} className=''>
                    <Navbar></Navbar>
                    <Slider></Slider>
                    <Routes>
                        <Route path="/" element={<h1>Hello</h1>} />
                        <Route path="/vocabulary" element={<VocabularyUser />} />
                        <Route path="/grammar" element={<Grammar />} />
                        <Route path="/practice/*" element={<Practice />} />
                        <Route path={`/practice/skill`} element={<PracticeSkill />} />
                        <Route path={`/practice/skill/topic`} element={<PracticeTopic />} />
                        <Route path={`/practice/skill/question`} element={<Question />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </Col>
            </Row>
        </>
    )
}
