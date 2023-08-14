import { Checkbox, Col, Row, message } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, getUser } from "../../api/service/AuthService";
import { useDispatch } from 'react-redux';
import { setUser, setRoleUser } from '../redux/_actions/user.actions';
import "./login.css";

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const isLoggedIn = localStorage.getItem("LoggedIn");
    const dispatch = useDispatch();
    useEffect(() => {
        if (isLoggedIn === 'true') {
            navigate("/");
        }
    }, [isLoggedIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username === null || password === null) {
            messageApi.open({
                type: 'warning',
                content: 'You need to enter all the information',
            });
        } else {
            await loginAPI('accounts/login', { username, password })
                .then((response) => {
                    getUser(`users?accountId=${response.data.data.id}`).then((res) => {
                        dispatch(setUser(res.data.data))
                    })
                    dispatch(setRoleUser(response.data.data.role))
                    localStorage.setItem("LoggedIn", true);
                    navigate("/")
                })
                .catch((error) => {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data,
                    });
                });
        }

    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>
            {contextHolder}
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
        </>

    )
}
