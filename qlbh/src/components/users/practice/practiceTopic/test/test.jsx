import { faCheck, faEarListen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom";
import { COLOR_DEFAULT, COLOR_FAIL, COLOR_MEDIUM, COLOR_SUCCESS } from '../../../../../commom/messageConstant';
import { setObjectId, setQuestionsByTestId, setPracticePartId } from '../../../../redux/_actions/practice.actions';
import Lesson from "../lesson/lesson";

import "./test.css";

export default function Test() {

    const [data, setData] = useState([])
    const [dataLesson, setDataLesson] = useState([])
    const [test, setTest] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dataLessonId, setDataLessonId] = useState(null)
    const dispatch = useDispatch();
    const practicePartIdRedux = useSelector(state => state.practiceReducer.practicePartId);
    const practicePart = useSelector(state => state.practiceReducer.practicePart);
    const [PartId, setPartId] = useState(practicePartIdRedux)

    /**
     * UseEffect hook that sets the lesson data and test data based on the practice part data.
     */
    useEffect(() => {
        setLoading(true)
        if (practicePart !== null && practicePart.length > 0) {
            const part = practicePart.filter((item) => item.id === PartId)
            setDataLesson(part[0]?.lessons)
            setData(part[0]?.tests)
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }, [practicePart, PartId]);

    const onclickShowListenStart = (data) => {
        dispatch(setObjectId(data.id))
        dispatch(setQuestionsByTestId(data?.questions))
    }

    const onClickSetPracticePart = (data) => {
        setPartId(data?.id)
        dispatch(setPracticePartId(data?.id))
    }

    /**
     * Sets the lesson ID and test flag based on the lesson data.
     *
     * @param {object} data The lesson data.
     */
    const getLessonsId = (data) => {
        if (dataLessonId !== null && dataLessonId?.id === data?.id) {
            setDataLessonId(null)
            setTest(false)
        } else {
            setDataLessonId(data)
            setTest(true)
        }
    }

    /**
     * Checks the color percent of the given item.
     *
     * @param {object} item The item to check the color percent of.
     * @returns {string} The color percent of the item, either `COLOR_FAIL`, `COLOR_MEDIUM`, `COLOR_SUCCESS`, or `COLOR_DEFAULT`.
     */
    const checkColorPercent = (item) => {
        const percent = parseInt((item.correctAnswer / item.totalQuestions) * 100)
        if (percent > 0 && percent < 50) {
            return COLOR_FAIL
        } else if (percent > 49 && percent < 75) {
            return COLOR_MEDIUM
        } else if (percent > 74) {
            return COLOR_SUCCESS
        } else {
            return COLOR_DEFAULT
        }
    }

    return (
        <div>
            <h1 className='pListen__heading'>Start your TOEIC Listening Practice Test Now!</h1>
            <h2 className='pListen__title' >
                <FontAwesomeIcon className='pListen__title-icon' icon={faEarListen} />
                Listening {data?.name} </h2>
            {loading ?
                <div className="example">
                    <Spin />
                </div> :
                <div style={{ width: '100%' }}>
                    <div className='row '>
                        <div className='col l-3 m-4 c-12'>
                            <div className='lesson__ls'>
                                <h3>Lesson</h3>
                                <ul className='lesson__list'>
                                    {dataLesson?.map((item, index) => (
                                        <Link to={test ? '/practice/part/topic' : '/practice/part/topic/lesson'} className='lesson__item' key={item.id} onClick={() => getLessonsId(item)}>
                                            <div>
                                                Lesson {index + 1}: <span>{item.name}</span>
                                            </div>
                                            <FontAwesomeIcon className='lesson__item-icon' icon={faCheck} />
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='col l-9 m-8 c-12'>
                            <Routes>
                                <Route path={`/lesson`} element={<Lesson dataLessonId={dataLessonId} />} />
                            </Routes>
                            <div className='lesson__ls'>
                                <h3>Test</h3>
                                <div className='row '  >
                                    {data?.map((item, index) => (
                                        <div className='col l-2 l-2-4-t m-4 c-4' key={item.id} >
                                            <Link to={'/practice/part/question'} className=' topic__item' onClick={() => onclickShowListenStart(item)} >
                                                <h1 style={{ color: checkColorPercent(item) }}>
                                                    {item.correctAnswer && item.correctAnswer !== null ?
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lesson__ls' style={{ minHeight: '200px' }} >
                        <h3 >Practice Part</h3>
                        <div className='row' style={{ marginTop: '10px' }}>
                            {practicePart?.map((item) => (
                                <div className='col l-4 m-4 c-4'>
                                    <div className={PartId === item.id ? 'practice_name practice_action' : 'practice_name'} onClick={() => onClickSetPracticePart(item)}>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

