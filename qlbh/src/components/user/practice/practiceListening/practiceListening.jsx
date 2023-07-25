import { Col, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { faEarListen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./practiceListening.css";
import { getPracticePartsWithoutLessonsAndTestsByPracticeId } from '../../../../api/service/paractice/paractice';

export default function PracticeListening() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const practiceId = useSelector(state => state.practiceReducer.practiceId);

    useEffect(() => {
        setLoading(true)
        const getPracticePartsByPracticeId = () => {
            getPracticePartsWithoutLessonsAndTestsByPracticeId(`practiceParts?practiceId=${practiceId}`)
                .then((res) => {
                    setLoading(false)
                    setData(res.data.data);
                }).catch((Error) => {
                    console.log(Error)
                })
        }
        getPracticePartsByPracticeId()
    }, []);

    useEffect(() => {
        if (practiceId === null) {
            navigate("/practice")
        }
    }, []);

    return (
        <>
            <Row gutter={1} >
                <Col span={14} offset={5} className=''>
                    <h1 className='pListen__heading'>Practice TOEIC Test Online </h1>
                    <h2 className='pListen__title'>
                        <FontAwesomeIcon className='pListen__title-icon' icon={faEarListen} />
                        Listening </h2>
                    {loading ?
                        <div className="example">
                            <Spin />
                        </div> :
                        <>
                            <Row gutter={50} id='pListen__list' className='test' >
                                {data?.map((item) => (
                                    <Col span={6}  >
                                        <Link className='pListen__link'>
                                            <div className='pListen' >
                                                <img className='pListen_img' src={item.image} alt="" />
                                                <h2>{item.name}</h2>
                                                <p>{item.description}</p>
                                            </div>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}
