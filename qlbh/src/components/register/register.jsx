import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css"
import { Col, Row, message } from 'antd';
import { registerAPI } from "../../api/service/AuthService";

export default function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("LoggedIn");
    const [data, setData] = useState({
        username: null,
        firstname: null,
        lastname: null,
        password: null,
        confirmPassword: null
    });

    const handleRegisterForm = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name", "value");
        const fieldValue = event.target.value;
        console.log(event);
        const newFormData = { ...data };
        newFormData[fieldName] = fieldValue;
        setData(newFormData);
    };
    useEffect(() => {
        if (isLoggedIn === 'true') {
            navigate("/");
        }
    }, [isLoggedIn]);

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const newAccount = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            password: data.password,
            image: "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg"
        };
        if (data.password !== data.confirmPassword) {
            messageApi.open({
                type: 'warning',
                content: 'Password does not match, please re-enter',
            });
        } else if (newAccount.username === null || newAccount.password === null
            || newAccount.firstname === null || newAccount.lastname === null
        ) {
            messageApi.open({
                type: 'warning',
                content: 'You need to enter all the information',
            });
        } else {
            console.log(newAccount);
            // await registerAPI('auth/register', newAccount)
            //     .then((response) => {
            //         localStorage.setItem("userID", response.data._id);
            //         localStorage.setItem("LoggedIn", true);
            //         navigate("/")
            //     })
            //     .catch((error) => {
            //         messageApi.open({
            //             type: 'error',
            //             content: error.response.data.message,
            //         });
            //     });
        }

    };

    return (
        <>
            {contextHolder}
            <div className='register'>
                <div className='register_body'>
                    <Row gutter={1}>
                        <Col span={12}>
                            <div className='register_left'>
                                <div className='register_img'>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='register_rigth'>
                                <h1 className='register_heading'> Register</h1>
                                <form onSubmit={handleRegisterSubmit} className='register_form'>
                                    <div className='register_item'>
                                        <label className='register_text'> User Name</label>
                                        <input type="text" className='register_input' name="username" onChange={handleRegisterForm} placeholder='User name' />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'> First name</label>
                                        <input type="text" className='register_input' name="firstname" onChange={handleRegisterForm} placeholder='First name' />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'> Last name</label>
                                        <input type="file" className='register_input' name="lastname" onChange={handleRegisterForm} placeholder='Last name' />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'> Password</label>
                                        <input type="password" className='register_input' name="password" onChange={handleRegisterForm} placeholder='password' />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Confrim password</label>
                                        <input type="password" className='register_input' name="confirmPassword" onChange={handleRegisterForm} placeholder='Confrim password' />
                                    </div>
                                    <div className='register_item'>
                                        <button type="submit" className='register_button'>Register</button>
                                    </div>
                                    <div className='register_item'>
                                        <span className="register_register-text ">Do not have an account?. </span>
                                        <Link className="register_item-link " to="/login">Login</Link>
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
