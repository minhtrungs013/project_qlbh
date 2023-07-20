import React from 'react'
import "./practice.css"
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
export default function Practice() {
    return (
        <div>
            <Row gutter={1} >
                <Col span={15} offset={4} className=''>
                    <h1 className='practice__heading'>Practice </h1>
                    <Row gutter={1} mt={10}>
                        <Col span={5} offset={1}>
                            <Link to={'/practice/listen'} className='practice__link'>
                                <div className='practice'>
                                    <img className='practice_img' src="https://img.freepik.com/premium-photo/retro-microphone-with-headphone-notes-music-pink-pastel-background-podcast-listening-entertainment-musical-studio-karaoke-concept-minimal-cartoon-cute-smooth-3d-rendering-illustration_598821-1564.jpg" alt="" />
                                    <h2>Listening</h2>

                                </div>
                            </Link>
                        </Col>
                        <Col span={5} offset={1}>
                            <Link to={'/practice/read'} className='practice__link'>
                                <div className='practice'>
                                    <img className='practice_img' src="https://t4.ftcdn.net/jpg/03/56/37/73/360_F_356377341_iNUSwlD4J7U4P0IKAHF9e1Gw70ixTHu1.webp" alt="" />
                                    <h2>Reading</h2>

                                </div>
                            </Link>
                        </Col>
                        <Col span={5} offset={1}>
                            <Link to={'/practice/speak'} className='practice__link'>
                                <div className='practice'>
                                    <img className='practice_img' src="https://img.freepik.com/photos-premium/micro-meet-conference-forum-people-reunion-formation-apprentissage-coaching_33807-1833.jpg?w=2000" alt="" />
                                    <h2>Speaking</h2>

                                </div>
                                
                            </Link>
                        </Col>
                        <Col span={5} offset={1}>
                            <Link to={'/practice/write'} className='practice__link'>
                                <div className='practice'>
                                    <img className='practice_img' src="https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=" alt="" />
                                    <h2>Writing</h2>

                                </div>
                            </Link>
                        </Col>


                    </Row>
                </Col>
            </Row>
        </div>

    )
}
