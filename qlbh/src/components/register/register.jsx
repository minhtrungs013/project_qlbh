import { Col, Row, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../api/service/AuthService";
import {
  AGE_INCORRECT_FORMAT,
  CONFIRM_PASSWORD_INCORRECT,
  DEFAULT_IMAGE,
  PHONE_NUMBER_INCORRECT_FORMAT,
  REGEX, REGEX_BIRTHDAY, REGEX_NUMBER,
  ROLE_DEFAULT,
  SLASH,
  SPECIAL_CHARACTERS,
  TYPE_MESSAGE_ERROR,
  TYPE_MESSAGE_WARNING,
} from '../../commom/messageConstant';
import "./register.css";

export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);
  const [newUser, setNewUser] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    surname: null,
    name: null,
    role: ROLE_DEFAULT,
    email: null,
    dateOfBirth: null,
    address: null,
    imageURL: DEFAULT_IMAGE,
    phone: null,
    age: null
  });

  /**
   * Handle changes in the registration form fields and update the user data accordingly.
   * 
   * @param {Event} event - The event triggered by a form field change.
   */
  const handleRegisterForm = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  /**
   * Redirect the user to the home page if they are already logged in.
   *
   * This effect checks if the user is logged in and automatically navigates to the home page.
   *
   * @param {boolean} isLoggedIn - A boolean indicating the user's login status.
   * @param {function} navigate - A function to navigate to different pages.
   */
  useEffect(() => {
    if (isLoggedIn) {
      navigate(SLASH);
    }
  }, [isLoggedIn, navigate]);

  /**
   * Handle user registration form submission.
   *
   * @param {Event} event - The form submission event.
   */
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const CURRENT_DATE = new Date(`${year}-${month}-${day}`).getTime();
    const SECOND_DATE = new Date(newUser.dateOfBirth).getTime();

    if (REGEX.test(newUser.username) || REGEX.test(newUser.surname) || REGEX.test(newUser.name)) {
      showMessage(TYPE_MESSAGE_WARNING, SPECIAL_CHARACTERS)
      return
    }

    if (!REGEX_NUMBER.test(newUser.phone)) {
      showMessage(TYPE_MESSAGE_WARNING, PHONE_NUMBER_INCORRECT_FORMAT)
      return
    }

    if (!REGEX_NUMBER.test(newUser.age)) {
      showMessage(TYPE_MESSAGE_WARNING, AGE_INCORRECT_FORMAT)
      return
    }

    if (CURRENT_DATE === SECOND_DATE || CURRENT_DATE < SECOND_DATE) {
      showMessage(TYPE_MESSAGE_WARNING, REGEX_BIRTHDAY)
      return
    }

    if (newUser.password !== newUser.confirmPassword) {
      showMessage(TYPE_MESSAGE_WARNING, CONFIRM_PASSWORD_INCORRECT)
      return
    }

    await registerAPI('auth/register', newUser)
      .then((response) => {
        navigate("/login")
      })
      .catch((error) => {
        showMessage(TYPE_MESSAGE_ERROR,error.response.data.message)
      });
  };

  /**
   * Display a message using the specified type and content.
   *
   * @param {string} type - The message type (e.g., 'success', 'error', 'warning', 'info').
   * @param {string} message - The message content.
   */
  const showMessage = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
    });
  }

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
                    <label className='register_text'>Name</label>
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
                    <span className="register_register-text ">Do you already have an account? </span>
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
                    <input type="text" className='register_input' name="phone" onChange={handleRegisterForm} placeholder='Phone number' required />
                  </div>
                  <div className='register_item'>
                    <label className='register_text'>Age</label>
                    <input type="text" className='register_input' name="age" onChange={handleRegisterForm} placeholder='Age' required />
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
