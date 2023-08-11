import { Col, Row, Spin } from 'antd';
import { faEarListen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { getPartLessonId, getPracticePartsLessonsByPracticeId } from '../../../../api/service/paractice/paractice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import "./practiceLesson.css"


export default function PracticeLesson({ lessonId }) {
    const [loading, setLoading] = useState(false)
    const [loadingLesson, setLoadingLesson] = useState(false)

    const [dataLessonId, setDataLessonId] = useState([])
    const practicePartId = useSelector(state => state.practiceReducer.practicePartId);
    const partLessonId = localStorage.getItem("partLessonId");
    // const [lessonId, setLessonId] = useState(partLessonId)

    useEffect(() => {
        getLessonId()
    }, []);
    useEffect(() => {
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

    // const changeLesson = (id) => {
    //     setLessonId(id)
    // }

    return (
        <>
            <div className='lesson__ls'>
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
            </div>
        </>
    )
}
