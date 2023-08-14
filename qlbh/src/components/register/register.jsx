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
        password: null,
        confirmPassword: null,
        surname: null,
        name: null,
        email: null,
        dateOfBirth: null,
        address: null,
        phone: null,
        age: null
    });

    const handleRegisterForm = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name", "value");
        const fieldValue = event.target.value;
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
            password: data.password,
            confirmPassword: data.confirmPassword,
            role: "user",
            surname: data.username,
            name: data.name,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            address: data.address,
            phone: data.phone,
            age: data.age
        };
        if (data.password !== data.confirmPassword) {
            messageApi.open({
                type: 'warning',
                content: 'Password does not match, please re-enter',
            });
        } else {
            await registerAPI('accounts/register', newAccount)
                .then((response) => {
                    navigate("/login")
                })
                .catch((error) => {
                    messageApi.open({
                        type: 'error',
                        content: error.response.data.message,
                    });
                });
        }

    };

    return (
        <>
            {contextHolder}
            <div className='register'>
                <div className='register_body'>
                    <h1 className='register_heading'> Register</h1>
                    <form onSubmit={handleRegisterSubmit} className='register_form'>
                        <Row gutter={1}>
                            <Col span={12}>
                                <div className='register_left'>
                                    <div className='register_item'>
                                        <label className='register_text'> User Name</label>
                                        <input type="text" className='register_input' name="username" onChange={handleRegisterForm} placeholder='User name' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Sur name</label>
                                        <input type="text" className='register_input' name="surname" onChange={handleRegisterForm} placeholder='Sur name' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>name</label>
                                        <input type="text" className='register_input' name="name" onChange={handleRegisterForm} placeholder='Name' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Address</label>
                                        <input type="text" className='register_input' name="address" onChange={handleRegisterForm} placeholder='Address' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Date of birth</label>
                                        <input type="date" className='register_input' name="dateOfBirth" onChange={handleRegisterForm} placeholder='>Date of birth' required />
                                    </div>
                                    <div className='register_item'>
                                        <button type="submit" className='register_button'>Register</button>
                                    </div>
                                    <div className='register_item'>
                                        <span className="register_register-text ">Do not have an account?. </span>
                                        <Link className="register_item-link " to="/login">Login</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='register_rigth'>
                                    <div className='register_item'>
                                        <label className='register_text'>Email</label>
                                        <input type="email" className='register_input' name="email" onChange={handleRegisterForm} placeholder='Email' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Phone</label>
                                        <input type="number" className='register_input' name="phone" onChange={handleRegisterForm} placeholder='Phone number' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Age</label>
                                        <input type="number" className='register_input' name="age" onChange={handleRegisterForm} placeholder='Age' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'> Password</label>
                                        <input type="password" className='register_input' name="password" onChange={handleRegisterForm} placeholder='Password' required />
                                    </div>
                                    <div className='register_item'>
                                        <label className='register_text'>Confrim password</label>
                                        <input type="password" className='register_input' name="confirmPassword" onChange={handleRegisterForm} placeholder='Confrim password' required />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        </>
    )
}
