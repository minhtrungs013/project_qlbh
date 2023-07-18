import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import "./home.css"
import { Column, Area } from '@ant-design/plots';
import { PicRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Header from '../header/header';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-hooks';
export default function Home() {
    // const [value, setValue] = useState('');
    // const { speak } = useSpeechSynthesis();
    const [data, setData] = useState([]);
   

    useEffect(() => {
        asyncFetch();
    }, []);


    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
        animation: true,
        slider: {
            start: 0.1,
            end: 0.9,
            trendCfg: {
                isArea: true,
            },
        },
    };
    return (
        <>
            <Header></Header>
            <div className='home'>
                <div className='product__deading'>
                    <PicRightOutlined className='product__deading-icon' />
                    <h3 className='product__deading-text'>Product Management</h3>
                </div>
                <Row>
                    <Col span={14} className='name'>
                        <Column {...config} />
                    </Col>
                    <Col span={10} className='name'>
                        <Area {...config} />
                    </Col>
                </Row>
            </div>
        </>

    )
}
