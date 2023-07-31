import { Col, Row, Spin } from 'antd';
import { faEarListen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import "./practiceTopic.css";
import { getListenTopicByPracticePartId, getPracticePartsLessonsByPracticeId } from '../../../../api/service/paractice/paractice';
import { useSelector, useDispatch } from 'react-redux';
import { setObjectId } from '../../../redux/_actions';
import { Link } from 'react-router-dom';


export default function PracticeTopic() {

    const [loading, setLoading] = useState(false)
    const practicePartId = useSelector(state => state.practiceReducer.practicePartId);
    const [data, setData] = useState([])
    const [dataLesson, setDataLesson] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        const getListenTopic = () => {
            getListenTopicByPracticePartId(`partTests?practicePartId=${practicePartId}`)
                .then((res) => {
                    setLoading(false)
                    setData(res.data.data);
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
        getListenTopic()
        getLessonsByPracticeId()

    }, []);


    const onclickShowListenStart = (data) => {
        dispatch(setObjectId(data.id))
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
                                    <ul className='lesson__list'>
                                        {dataLesson?.map((item, index) => (
                                            <li className='lesson__item' key={item.id}>
                                                <div>
                                                    Lesson {index + 1}: <span>{item.name}</span>
                                                </div>
                                                <FontAwesomeIcon className='lesson__item-icon' icon={faCheck} />
                                            </li>
                                        ))}
                                    </ul>
                                </Col>
                                <Col span={18} >
                                    <Row gutter={45} className='topic__test' >
                                        {data?.map((item) => (
                                            <Col span={4} key={item.id} >
                                                <Link to={'/practice/skill/question'} className='topic__item' onClick={() => onclickShowListenStart(item)} >
                                                    <h1>0%</h1>
                                                    <h6>------</h6>
                                                    <h3>{item.name}</h3>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}
