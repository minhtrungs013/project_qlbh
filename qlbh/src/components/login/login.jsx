import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import { Checkbox, Col, Row } from 'antd';
import axios from 'axios'
export default function Login() {
    const navigate = useNavigate();
    const API = axios.create({ baseURL: 'http://localhost:5000' });
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const userData = {
        username: "",
        password: ""
    }

    const [data, setData] = useState(userData);


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Kiểm tra thông tin đăng nhập
        if (username !== null && password !== null) {
            setData({ username: username, password: password })
            try {
                setIsLoggedIn(true);
                const response = await API.post('/auth/login',data);
                localStorage.setItem("userID", response.data._id);
                localStorage.setItem("LoggedIn", isLoggedIn);
                navigate("/")
                console.log('Đăng nhập thành công!', response.data._id);
                // setData(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        } else {
            console.log('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className='login'>
            <div className='login_body'>
                <Row gutter={1}>
                    <Col span={12}>
                        <div className='login_left'>
                            <div className='login_img'>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='login_rigth'>
                            <h1 className='login_heading'> Login</h1>
                            <form onSubmit={handleSubmit} className='login_form'>
                                <div className='login_item'>
                                    <label className='login_text'> User Name</label>
                                    <input type="text" className='login_input' onChange={handleUsernameChange} placeholder='User name' />
                                </div>
                                <div className='login_item'>
                                    <label className='login_text'> Password</label>
                                    <input type="password" className='login_input' onChange={handlePasswordChange} placeholder='password' />
                                </div>
                                <div className='login_item'>
                                    <Checkbox className='login_check'></Checkbox>
                                    <span className='login_check-text'>Remember me</span>
                                </div>
                                <div className='login_item'>
                                    <button type="submit" className='login_button'>Login</button>
                                </div>
                                <div className='login_item'>
                                    <span className="login_register-text ">Do not have an account?. </span>
                                    <Link className="login_item-link " to="/register">Create an account</Link>
                                </div>
                            </form>
                        </div>

                    </Col>
                </Row>


            </div>
        </div>
    )
}
