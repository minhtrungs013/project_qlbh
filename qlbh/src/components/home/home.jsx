import React, { useState, useEffect } from 'react';
import "./home.css"
import { Column, Area } from '@ant-design/plots';
import { PicRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Header from '../header/header';
export default function Home() {
    // const data = [
    //     {
    //       name: 'London',
    //       month: 'Jan.',
    //       value: 18.9,
    //     },
    //     {
    //       name: 'London',
    //       month: 'Feb.',
    //       value: 28.8,
    //     },
    //     {
    //       name: 'London',
    //       month: 'Mar.',
    //       value: 39.3,
    //     },
    //     {
    //       name: 'London',
    //       month: 'Apr.',
    //       value: 81.4,
    //     },
    //     {
    //       name: 'London',
    //       month: 'May',
    //       value: 47,
    //     },
    //     {
    //       name: 'London',
    //       month: 'Jun.',
    //       value: 20.3,
    //     },
    //     {
    //       name: 'London',
    //       month: 'Jul.',
    //       value: 24,
    //     },
    //     {
    //       name: 'London',
    //       month: 'Aug.',
    //       value: 35.6,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Jan.',
    //       value: 12.4,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Feb.',
    //       value: 23.2,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Mar.',
    //       value: 34.5,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Apr.',
    //       value: 99.7,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'May',
    //       value: 52.6,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Jun.',
    //       value: 35.5,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Jul.',
    //       value: 37.4,
    //     },
    //     {
    //       name: 'Berlin',
    //       month: 'Aug.',
    //       value: 42.4,
    //     },
    //   ];

    //   const config = {
    //     data,
    //     isGroup: true,
    //     xField: 'month',
    //     yField: 'value',
    //     seriesField: 'name',

    //     /** 设置颜色 */
    //     // color: ['#1ca9e6', '#f88c24'],


    //     /** 设置间距 */
    //     marginRatio: 0.1,
    //     label: {
    //       // 可手动配置 label 数据标签位置
    //       position: 'middle',
    //       // 'top', 'middle', 'bottom'
    //       // 可配置附加的布局方法
    //       layout: [
    //         // 柱形图数据标签位置自动调整
    //         {
    //           type: 'interval-adjust-position',
    //         }, // 数据标签防遮挡
    //         {
    //           type: 'interval-hide-overlap',
    //         }, // 数据标签文颜色自动调整
    //         {
    //           type: 'adjust-color',
    //         },
    //       ],
    //     },
    //   };

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
