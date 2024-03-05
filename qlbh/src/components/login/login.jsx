import { Checkbox, Col, Row, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/service/AuthService";
import {
  ACCESS_TOKEN,
  ENTER_ALL_INFORMATION,
  REGEX,
  SLASH,
  TYPE_MESSAGE_ERROR,
  TYPE_MESSAGE_WARNING,
  USER_NAME_CHARACTERS,
} from '../../commom/messageConstant';
import { setLoggedIn, setUser } from '../redux/_actions/user.actions';
import "./login.css";

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.userReducer.loggedIn);
  const [userLogin, setUserLogin] = useState({
    username: null,
    password: null
  });

  /**
   * Handles form input changes and updates the user's data accordingly.
   *
   * @param {Event} event - The event object representing the form input change event.
   */
  const handleLoginForm = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserLogin((prevUser) => ({
      ...prevUser,
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
   * Handles the submission of a form, attempting to log in with the provided username and password.
   *
   * @param {Event} event - The event object representing the form submission.
   * @returns {Promise<void>} A Promise that resolves when the login process is complete.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the provided username matches a regular expression (REGEX).
    if (REGEX.test(userLogin.username)) {
      showMessage(TYPE_MESSAGE_WARNING, USER_NAME_CHARACTERS)
      return
    }

    // Check if either the username or password is null.
    if (userLogin.username === null || userLogin.password === null) {
      showMessage(TYPE_MESSAGE_WARNING, ENTER_ALL_INFORMATION)
      return
    }
    await loginAPI('auth/login', userLogin)
      .then((response) => {
        if (response) {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.tokens.accessToken)
          dispatch(setLoggedIn(true))
          dispatch(setUser(response.data.data.information))
          navigate(SLASH)
        }
      })
      .catch((error) => {
        showMessage(TYPE_MESSAGE_ERROR, error.response?.data?.message)
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
                    <input type="text" className='login_input' name="username" onChange={handleLoginForm} placeholder='User name' />
                  </div>
                  <div className='login_item'>
                    <label className='login_text'> Password</label>
                    <input type="password" className='login_input' name="password" onChange={handleLoginForm} placeholder='password' />
                  </div>
                  <div className='login_item'>
                    <Checkbox className='login_check'></Checkbox>
                    <span className='login_check-text'>Remember me</span>
                  </div>
                  <div className='login_item'>
                    <button type="submit" className='login_button'>Login</button>
                  </div>
                  <div className='login_item'>
                    <span className="login_register-text ">Do not have an account? </span>
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
