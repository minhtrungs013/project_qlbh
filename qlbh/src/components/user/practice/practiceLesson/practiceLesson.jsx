import { Col, Row, Spin } from 'antd';
import { faEarListen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { getPartLessonId, getPracticePartsLessonsByPracticeId } from '../../../../api/service/paractice/paractice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import "./practiceLesson.css"
import { Link, useNavigate } from 'react-router-dom';


export default function PracticeLesson({ lessonId }) {
    const [loadingLesson, setLoadingLesson] = useState(false)
    const navigate = useNavigate()

    const [dataLessonId, setDataLessonId] = useState([])

    useEffect(() => {
        getLessonId()
    }, []);
    useEffect(() => {
        if(lessonId === null) {
            navigate("practice/")
        }
        setLoadingLesson(true)
        getLessonId()
    }, [lessonId]);


    const getLessonId = () => {
        getPartLessonId(`partLessons?id=${lessonId}`)
            .then((res) => {
                setDataLessonId(res.data.data);
                setLoadingLesson(false)
            }).catch((Error) => {
                console.log(Error)
            })
    }

    return (
        <>
            {loadingLesson ?

                <div style={{ textAlign: "center", paddingBottom: '30px' }}>
                    <Spin />
                </div> :
                <>
                    <div className='lesson__ls'>

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
                    </div>

                </>
            }
        </>
    )
}
