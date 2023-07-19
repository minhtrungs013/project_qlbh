import React from 'react'
import "./practice.css"
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
export default function Practice() {
    return (
        <>
            <Row gutter={1} >
                <Col span={15} offset={4} className=''>
                    <h1>Practice </h1>
                    <Row gutter={1} mt={10}>
                        <Col span={5} offset={1} className='practice'>
                            <Link to={'/practice/listen'}>
                          a
                            </Link>
                        </Col>
                        <Col span={5} offset={1} className='practice'>
                            <Link to={'/practice/read'}>
                            a
                            </Link>
                        </Col>
                        <Col span={5} offset={1} className='practice'>
                            a
                        </Col>
                        <Col span={5} offset={1} className='practice'>
                            a
                        </Col>
                       
                    </Row>
                </Col>
            </Row>
        </>
    )
}
