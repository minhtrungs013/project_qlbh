import { Link, Route, Routes } from "react-router-dom";
import { Col, Row, Spin } from 'antd';
import { faEarListen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import "./practiceTopic.css";
import { getListenTopicByPracticePartId, getPracticePartsLessonsByPracticeId } from '../../../../api/service/paractice/paractice';
import { useSelector, useDispatch } from 'react-redux';
import { setObjectId } from '../../../redux/_actions';
import PracticeLesson from '../practiceLesson/practiceLesson';

export default function PracticeTopic() {

    const [loading, setLoading] = useState(false)
    const practicePartId = useSelector(state => state.practiceReducer.practicePartId);
    const [data, setData] = useState([])
    const [dataLesson, setDataLesson] = useState([])
    const dispatch = useDispatch();
    const [lessonId, setLessonId] = useState(null)
    const userId = useSelector(state => state.userReducer.userId);

    useEffect(() => {
        setLoading(true)
        getListenTopic()
        getLessonsByPracticeId()

    }, []);

    const getListenTopic = () => {
        getListenTopicByPracticePartId(`partTests?userId=${userId}&practicePartId=${practicePartId}`)
            .then((res) => {
                setData(res.data.data);
                setLoading(false)
            }).catch((Error) => {
                console.log(Error)
            })
    }

    const getLessonsByPracticeId = () => {
        getPracticePartsLessonsByPracticeId(`partLessons?practicePartId=${practicePartId}`)
            .then((res) => {
                setDataLesson(res.data.data);
            }).catch((Error) => {
                console.log(Error)
            })
    }

    const onclickShowListenStart = (data) => {
        dispatch(setObjectId(data.id))
    }

    const getLessonsId = (idLesson) => {
        setLessonId(idLesson)
        localStorage.setItem("partLessonId", idLesson);
    }


    const checkColorPercent = (item) => {
        const percent = parseInt((item.correctAnswer / item.totalQuestions) * 100)
        if (percent > 0 && percent < 50) {
            return 'red'
        } else if (percent > 49 && percent < 75) {
            return '#f29f05'
        } else if (percent > 74) {
            return '#52c41a'
        } else {
            return 'black'
        }
    }

    return (
        <>
            <Row gutter={1} >
                <Col span={16} offset={4} className=''>
                    <h1 className='pListen__heading'>Start your TOEIC Listening Practice Test Now!</h1>
                    <h2 className='pListen__title' >
                        <FontAwesomeIcon className='pListen__title-icon' icon={faEarListen} />
                        Listening</h2>
                    {loading ?
                        <div className="example">
                            <Spin />
                        </div> :
                        <>
                            <Row gutter={24} >
                                <Col span={6}  >
                                    <div className='lesson__ls'>
                                        <h3>Lesson</h3>
                                        <ul className='lesson__list'>
                                            {dataLesson?.map((item, index) => (
                                                <Link to={'/practice/skill/topic/lesson'} className='lesson__item' key={item.id} onClick={() => getLessonsId(item.id)}>
                                                    <div>
                                                        Lesson {index + 1}: <span>{item.name}</span>
                                                    </div>
                                                    <FontAwesomeIcon className='lesson__item-icon' icon={faCheck} />
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <Routes>
                                        <Route path={`/lesson`} element={<PracticeLesson  lessonId={lessonId}/>} />
                                    </Routes>
                                  
                                    <div className='lesson__ls'>
                                        <h3>Test</h3>
                                        <Row gutter={45}  >
                                            {data?.map((item, index) => (
                                                <Col span={4} key={item.id} >
                                                    <Link to={'/practice/skill/question'} className='topic__item' onClick={() => onclickShowListenStart(item)} >
                                                        <h1 style={{ color: checkColorPercent(item) }}>
                                                            {item.correctAnswer !== null ?
                                                                parseInt((item.correctAnswer / item.totalQuestions) * 100)
                                                                :
                                                                0
                                                            }
                                                            %</h1>
                                                        {item.correctAnswer !== null ?
                                                            <p style={{ margin: 0, fontSize: '10px', color: "#18bd18", fontWeight: 600 }}>
                                                                {item.correctAnswer}/{item.totalQuestions} correct</p>
                                                            :
                                                            <p ></p>

                                                        }
                                                        <h6>------</h6>
                                                        <h3>{item.name}</h3>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>

                                </Col>
                            </Row>
                        </>

                    }
                </Col>
            </Row>
        </>
    )
}

