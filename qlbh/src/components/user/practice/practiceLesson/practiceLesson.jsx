import { Col, Row, Spin } from 'antd';
import { faEarListen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { getPartLessonId, getPracticePartsLessonsByPracticeId } from '../../../../api/service/paractice/paractice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import "./practiceLesson.css"


export default function PracticeLesson() {
    const [loading, setLoading] = useState(false)
    const [loadingLesson, setLoadingLesson] = useState(false)

    const [dataLesson, setDataLesson] = useState([])
    const [dataLessonId, setDataLessonId] = useState([])
    const practicePartId = useSelector(state => state.practiceReducer.practicePartId);
    const partLessonId = localStorage.getItem("partLessonId");
    const [lessonId, setLessonId] = useState(partLessonId)

    useEffect(() => {
        setLoading(true)
        getLessonsByPracticeId()
        getLessonId()
    }, []);
    useEffect(() => {
        setLoadingLesson(true)
        getLessonId()
    }, [lessonId]);

    const getLessonsByPracticeId = () => {
        getPracticePartsLessonsByPracticeId(`partLessons?practicePartId=${practicePartId}`)
            .then((res) => {
                setDataLesson(res.data.data);
                setLoading(false)
            }).catch((Error) => {
                console.log(Error)
            })
    }
    const getLessonId = () => {
        getPartLessonId(`partLessons?id=${lessonId}`)
            .then((res) => {
                setDataLessonId(res.data.data);
                setLoadingLesson(false)
            }).catch((Error) => {
                console.log(Error)
            })
    }

    const changeLesson = (id) => {
        setLessonId(id)
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
                                <Col span={6} >
                                    <div className='lesson__ls'>
                                        <ul className='lesson__list'>
                                            {dataLesson?.map((item, index) => (
                                                <li className='lesson__item' key={item.id} onClick={() => changeLesson(item.id)}>
                                                    <div>
                                                        Lesson {index + 1}: <span>{item.name}</span>
                                                    </div>
                                                    <FontAwesomeIcon className='lesson__item-icon' icon={faCheck} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                                <Col span={18} className='lesson' >
                                    {loadingLesson ?
                                        <div style={{ textAlign: "center" }}>
                                            <Spin />
                                        </div> :
                                        <>
                                            <Row gutter={45}  >
                                                <Col span={24} >
                                                    <h2 className='lesson__heading'>{dataLessonId.name}</h2>
                                                    {dataLessonId.lessonContents?.map((item) => (
                                                        <>
                                                            <h3 className='lesson__title'>{item.title}</h3>
                                                            <p className='lesson__content'>{item.content}</p>
                                                            {item.contentExamples?.map((exam) => (
                                                                <>
                                                                    <p className='lesson__example-title'>+ {exam?.title}</p>
                                                                    <p className='lesson__example-content'><span>E.g.</span> {exam.example}</p>
                                                                </>
                                                            ))}

                                                        </>
                                                    ))}
                                                </Col>
                                            </Row>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}
