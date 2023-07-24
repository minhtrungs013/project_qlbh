import React, { useState, useEffect } from 'react'
import "./practice.css"
import { Col, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { getAllPracticesWithoutParts } from '../../../api/service/paractice/paractice';

export default function Practice({ onClickPracticeId }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const setPracticeId = (practice) => {
        if (practice && practice.type) {
            onClickPracticeId(practice.id);
        }
    }

    useEffect(() => {
        setLoading(true)
        const getAllPracticesWithoutPart = () => {
            getAllPracticesWithoutParts(`practices`)
                .then((res) => {
                    setLoading(false)
                    setData(res.data.data);
                }).catch((Error) => {
                    console.log(Error)
                })
        }
        getAllPracticesWithoutPart()
    }, []);

    return (
        <div>
            <Row gutter={1} >
                <Col span={16} offset={4} className=''>
                    <h1 className='practice__heading'>Practice </h1>
                    {loading ?
                        <div className="example">
                            <Spin />
                        </div> :
                        <>
                            <Row gutter={100} mt={10}>
                                {data?.map((item) => (
                                    <Col span={6} key={item.id}>
                                        <Link to={`/practice/${item.type}`} onClick={() => setPracticeId(item)} className='practice__link'>
                                            <div className='practice'>
                                                <img className='practice_img' src={item.image} alt="" />
                                                <h2>{item.name}</h2>
                                            </div>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>

                        </>
                    }
                </Col>
            </Row>
        </div>
    )
}