import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./lesson.css";


export default function Lesson({ dataLessonId }) {

    const [loadingLesson, setLoadingLesson] = useState(false)
    const navigate = useNavigate()

    /**
     * UseEffect hook that navigates to the practice/part/topic page if the dataLessonId is null. Otherwise, it sets the loadingLesson flag to false.
     */
    useEffect(() => {
        setLoadingLesson(true)
        if (dataLessonId === null) {
            navigate("/practice/part/topic")
            setLoadingLesson(false)
        } else {
            setLoadingLesson(false)
        }
    }, [dataLessonId, navigate]);

    return (
        <>
            {loadingLesson ?
                <div style={{ textAlign: "center", paddingBottom: '30px' }}>
                    <Spin />
                </div> :
                <>
                    <div className='lesson__ls'>
                        <h2 className='lesson__heading'>{dataLessonId?.name}</h2>
                        {dataLessonId?.contents?.map((item, index) => (
                            <div key={index} style={{ textAlign: 'left' }}>
                                <h3 className='lesson__title'>{item.title}</h3>
                                <p className='lesson__content'>{item.content}</p>
                                {item.examples?.map((exam, i) => (
                                    <div key={i}>
                                        <p className='lesson__example-title'>+ {exam?.title}</p>
                                        <p className='lesson__example-content'><span>E.g.</span> {exam.example}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    )
}
