import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { faAddressCard, faCalendarDays, faEnvelope, faKey, faLocationDot, faPersonWalkingLuggage, faPhoneVolume, faUpload, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { changePasswordAPI } from "../../../api/service/AuthService";
import { getUser, updateUser } from "../../../api/service/UserService";
import {
    AGE_INCORRECT_FORMAT,
    CONFIRM_CHANGE_PASSWORD,
    CONFIRM_PASSWORD_INCORRECT,
    CONTACT_ADMIN,
    DEFAULT_IMAGE,
    IMAGE_NANE_EXISTS,
    INVALID_TOKEN,
    PHONE_NUMBER_INCORRECT_FORMAT,
    REGEX, REGEX_BIRTHDAY,
    REGEX_NUMBER,
    SPECIAL_CHARACTERS,
    TYPE_MESSAGE_ERROR,
    TYPE_MESSAGE_WARNING
} from '../../../commom/messageConstant';
import { handleUpload } from '../../../utils/utils';
import { setLoggedIn, setUser } from '../../redux/_actions/user.actions';
import "./profile.css";



export default function Profile() {
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showChangeUser, setShowChangeUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [loadingImage, setLoadingImage] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [dataUser, setDataUser] = useState({})
    const userId = useSelector(state => state.userReducer.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUri = location.search;
    const parts = currentUri.split("?code=");
    const [code, setCode] = useState(parts[1] === undefined ? "" : parts[1]);
    const URIPath = `http://localhost:3000${location.pathname}`;
    const { confirm } = Modal;

    const [newData, setNewData] = useState({
        surname: null,
        name: null,
        email: null,
        dateOfBirth: null,
        address: null,
        phone: null,
        imageURL: null,
        age: null
    });

    const [newPassword, setNewPassword] = useState({
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null,
    });

    /**
     * Handle form input changes and update the user's data.
     *
     * @param {Event} event - The event object representing the form input change.
     */
    const handleUpdateUserForm = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setNewData((prevNewUser) => ({
            ...prevNewUser,
            [name]: value,
        }));
    };

    /**
     * Handle form input changes and update the password data.
     *
     * @param {Event} event - The event object representing the form input change.
     */
    const handleChangePasswordForm = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setNewPassword((prevNewUser) => ({
            ...prevNewUser,
            [name]: value,
        }));
    };

    /**
     * Gets the user by ID from the API.
     *
     * @param {string} userId - The ID of the user to get.
     * @returns {void}
     */
    const getUserById = (userId) => {
        getUser(`users?id=${userId}`).then((res) => {
            if (res) {
                setDataUser(res.data.data)
                setNewData(res.data.data?.userInfo)
                setShowChangeUser(false)
                setLoading(false)
                setTimeout(() => {
                    setLoadingImage(false)
                    setLoadingData(false)
                }, 1000);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (userId) {
            setLoadingData(true)
            getUserById(userId)
        }
    }, [userId])

    /**
     * Toggles the visibility of the change password form.
     *
     * @returns {void}
     */
    const changePassword = () => {
        setShowChangePassword(!showChangePassword)
    }

    /**
     * Changes the user's password.
     *
     * @param {string} userId - The ID of the user to change the password for.
     * @param {string} newPassword - The new password.
     * @returns {void}
     */
    const handleChangePassword = () => {
        changePasswordAPI(`users/change-password?id=${userId}`, newPassword).then((res) => {
            if (res) {
                dispatch(setUser(null))
                dispatch(setLoggedIn(false))
                navigate("/login");
            }
        }).catch((error) => {
            showMessage(TYPE_MESSAGE_ERROR, CONTACT_ADMIN)
        })
    }

    /**
     * Cancels the current course and toggles the visibility of the change user form.
     *
     * @returns {void}
     */
    const changeUser = () => {
        cancelCourse()
        setNewData(dataUser?.userInfo)
        setShowChangeUser(!showChangeUser)
    }

    /**
     * Updates the user's information.
     *
     * @param {string} userId - The ID of the user to update.
     * @param {object} newData - The new user information.
     * @returns {void}
     */
    const handleUpdateUser = () => {
        setLoading(true)

        const today = new Date()
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const CURRENT_DATE = new Date(`${year}-${month}-${day}`).getTime();
        const SECOND_DATE = new Date(newData.dateOfBirth).getTime();

        if (REGEX.test(newData.surname) || REGEX.test(newData.name)) {
            showMessage(TYPE_MESSAGE_WARNING, SPECIAL_CHARACTERS)
            setLoading(false)
            return
        }

        if (!REGEX_NUMBER.test(newData.phone)) {
            showMessage(TYPE_MESSAGE_WARNING, PHONE_NUMBER_INCORRECT_FORMAT)
            setLoading(false)
            return
        }

        if (!REGEX_NUMBER.test(newData.age)) {
            showMessage(TYPE_MESSAGE_WARNING, AGE_INCORRECT_FORMAT)
            setLoading(false)
            return
        }

        if (CURRENT_DATE === SECOND_DATE || CURRENT_DATE < SECOND_DATE) {
            showMessage(TYPE_MESSAGE_WARNING, REGEX_BIRTHDAY)
            setLoading(false)
            return
        }

        updateUser(`user-infos?user-id=${userId}`, newData).then((res) => {
            if (res) {
                getUserById(userId)
            }
        }).catch((error) => {
            showMessage(TYPE_MESSAGE_ERROR, CONTACT_ADMIN)
        })
    }

    /**
     * Handles the file change event.
     * This function handles the file change event by uploading the selected file to Dropbox. If the upload is successful, the function will update the user's image URL in the state and call the handleUpdateUser function to save the changes.
     * If the upload fails due to an invalid access token, the function will redirect the user to the Dropbox login page. If the upload fails because the image name already exists, the function will display a warning message. 
     * 
     * @param {Event} event - The file change event.
     * @returns {void}
     */
    const handleFileChange = async (event) => {
        setLoadingImage(true)
        const selectedFile = event.target.files
        const data = await handleUpload(selectedFile, code, URIPath)

        if (data === INVALID_TOKEN) {
            window.location.href = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=lntimln3hpjnwx4&redirect_uri=${encodeURIComponent(URIPath)}&response_type=code`
        } else if (data === IMAGE_NANE_EXISTS) {
            showMessage(TYPE_MESSAGE_WARNING, data)
            setLoadingImage(false)
        } else {
            newData.imageURL = data[0]
            handleUpdateUser()
            setCode("")
        }
    };

    /**
     * Convert a date string in the format "dd-mm-yyyy" to ISO date format "yyyy-mm-dd".
     *
     * @param {string} dateString - The date string to convert.
     * @returns {string | undefined} The date in ISO format, or undefined if the input is invalid.
     */
    const convertToISODate = (dateString) => {
        if (dateString) {
            const parts = dateString.split('-');
            if (parts.length === 3) {
                const day = parts[0];
                const month = parts[1];
                const year = parts[2];
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
        }
    }

    /**
     * Reset the content of the "create course" form by clearing its input fields.
     */
    const cancelCourse = () => {
        const form = document.getElementById("create-course-form");

        if (form) {
            form.reset();
        }
    };

    /**
     * Show a confirmation dialog for changing the user's password.
     * If the user confirms, the password change process is initiated.
     */
    const showChangePasswordConfirm = () => {
        setLoading(true)

        if (newPassword.newPassword !== newPassword.confirmNewPassword) {
            showMessage(TYPE_MESSAGE_WARNING, CONFIRM_PASSWORD_INCORRECT)
            setLoading(false)
            return
        }

        confirm({
            title: 'Note',
            icon: <ExclamationCircleFilled />,
            content: CONFIRM_CHANGE_PASSWORD,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setLoading(false)
                handleChangePassword()
            },
            onCancel() {
                setLoading(false)
            },
        });
    };

    /**
     * Loading spinner icon with a larger size and bold font.
     *
     */
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#000000',
            }}
            spin
        />
    );

    /**
     * Loading spinner icon with a larger size and bold font.
     *
     */
    const loadImage = (
        <LoadingOutlined
            style={{
                fontSize: 50,
                fontWeight: 600,
                color: '#5c5c5c',
            }}
            spin
        />
    );

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
            <h2 className='profile__heading-tb-mb' style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faAddressCard} /> Profile</h2>
            <div>
                <div className='row no-gutters center'>
                    <div className='col l-3 m-11 c-11 mb20'>
                        {loadingData ?
                            <div style={{ textAlign: "center", paddingBottom: '30px' }}>
                                <Spin />
                            </div>
                            :
                            <div className='profile_item mr m-mr'>
                                <div className='profile_item-body'>
                                    <img src={dataUser?.userInfo?.imageURL ? dataUser?.userInfo?.imageURL : DEFAULT_IMAGE} className='profile_item_img' alt="" />
                                    {loadingImage && <Spin className='antIcon' indicator={loadImage} />}
                                    <div className='upload upload-tb-mb'>
                                        <FontAwesomeIcon icon={faUpload} className='faUpload' />
                                        <input type="file" className='inputfile' onChange={handleFileChange} />
                                    </div>
                                    <div className='profile_body-name-left'>
                                        <FontAwesomeIcon className='profile_body-name-icon' icon={faUser} />
                                        <h2 >{dataUser?.userInfo?.surname + " " + dataUser?.userInfo?.name}</h2>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='col l-9 m-11 c-11'>
                        {loadingData ?
                            <div style={{ textAlign: "center", paddingBottom: '30px' }}>
                                <Spin />
                            </div>
                            :
                            <div className='profile_item ml m-ml'>
                                <div className='profile_body'>
                                    <div className='row no-gutters '>
                                        <div className='col l-6 m-6 c-12 mb20' >
                                            <div className='mr c-mr'>
                                                <ul className='profile_body-list'>
                                                    <li className='profile_body-Heading'>
                                                        <h2 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faAddressCard} /> Profile</h2>
                                                        {!showChangeUser ?
                                                            <div className='profile__btn' onClick={() => changeUser()}>Edit...</div>
                                                            :
                                                            <div className='profile__btn btn_cancel' onClick={() => changeUser()}>Cancel</div>
                                                        }
                                                    </li>
                                                </ul>
                                                <form action="" id="create-course-form">
                                                    <ul className='profile_body-list'>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faUser} />
                                                                <span >Name</span>
                                                            </div>
                                                            <input type="text" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="name" disabled={!showChangeUser} defaultValue={dataUser?.userInfo?.name} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faUser} />
                                                                <span >Sur Name</span>
                                                            </div>
                                                            <input type="text" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="surname" disabled={!showChangeUser} defaultValue={dataUser?.userInfo?.surname} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faEnvelope} />
                                                                <span >Email</span>
                                                            </div>
                                                            <input type="email" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="email" disabled={!showChangeUser} defaultValue={dataUser?.userInfo?.email} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faCalendarDays} />
                                                                <span >Date Of Birth</span>
                                                            </div>
                                                            <input type="date" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="dateOfBirth" disabled={!showChangeUser} defaultValue={convertToISODate(dataUser?.userInfo?.dateOfBirth)} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faLocationDot} />
                                                                <span >Address</span>
                                                            </div>
                                                            <input type="text" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="address" disabled={!showChangeUser} defaultValue={dataUser?.userInfo?.address} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faPhoneVolume} />
                                                                <span >Phone Number</span>
                                                            </div>
                                                            <input type="text" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="phone" disabled={!showChangeUser} defaultValue={dataUser?.userInfo?.phone} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faPersonWalkingLuggage} />
                                                                <span >Age</span>
                                                            </div>
                                                            <input type="text" className={showChangeUser ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} onChange={handleUpdateUserForm} name="age" disabled={!showChangeUser} defaultValue={dataUser?.userInfo?.age} />
                                                        </li>
                                                        {showChangeUser &&
                                                            <li className='profile_body-sub'>
                                                                <div className='profile__btn btn_submit' onClick={() => handleUpdateUser()}>Submit
                                                                    {loading && <Spin style={{ paddingLeft: '10px' }} indicator={antIcon} />}
                                                                </div>
                                                            </li>
                                                        }
                                                    </ul>
                                                </form>
                                            </div>
                                        </div>
                                        <div className='col l-6 m-6 c-12'>
                                            <div className='ml c-ml'>
                                                <ul className='profile_body-list'>
                                                    <li className='profile_body-Heading'>
                                                        <h2 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faAddressCard} /> Account</h2>
                                                        {!showChangePassword ?
                                                            <div className='profile__btn' onClick={() => changePassword()}>Change Password</div>
                                                            :
                                                            <div className='profile__btn btn_cancel' onClick={() => changePassword()}>Cancel</div>
                                                        }
                                                    </li>
                                                </ul>
                                                <form action="">
                                                    <ul className='profile_body-list'>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faUser} />
                                                                <span >User Name</span>
                                                            </div>
                                                            <input type="text" className='profile_body-text' name='username' disabled={!showChangePassword} value={dataUser.username} />
                                                        </li>
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faKey} />
                                                                <span >{showChangePassword && 'Old'} Password</span>
                                                            </div>
                                                            {showChangePassword ?
                                                                <input type="password" name='oldPassword' onChange={handleChangePasswordForm} className='profile_body-text profile_body-text-active' required />
                                                                :
                                                                <span className='profile_body-text'>*********</span>
                                                            }

                                                        </li>
                                                        {showChangePassword &&
                                                            <>
                                                                <li className='profile_body-item'>
                                                                    <div className='profile_body-name'>
                                                                        <FontAwesomeIcon className='profile_body-name-icon' icon={faKey} />
                                                                        <span >New Password</span>
                                                                    </div>
                                                                    <input type="password" name='newPassword' onChange={handleChangePasswordForm} className={showChangePassword ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} disabled={!showChangePassword} required />
                                                                </li>
                                                                <li className='profile_body-item'>
                                                                    <div className='profile_body-name'>
                                                                        <FontAwesomeIcon className='profile_body-name-icon' icon={faKey} />
                                                                        <span >Confim Password</span>
                                                                    </div>
                                                                    <input type="password" name='confirmNewPassword' onChange={handleChangePasswordForm} className={showChangePassword ? 'profile_body-text profile_body-text-active ' : 'profile_body-text'} disabled={!showChangePassword} required />
                                                                </li>
                                                            </>
                                                        }
                                                        <li className='profile_body-item'>
                                                            <div className='profile_body-name'>
                                                                <FontAwesomeIcon className='profile_body-name-icon' icon={faUserShield} />
                                                                <span >Role</span>
                                                            </div>
                                                            <input type="text" className='profile_body-text' disabled={true} value={dataUser.role} />
                                                        </li>
                                                        {showChangePassword &&
                                                            <li className='profile_body-sub'>
                                                                <div className='profile__btn btn_submit' onClick={() => showChangePasswordConfirm()}>Submit
                                                                    {loading && <Spin style={{ paddingLeft: '10px' }} indicator={antIcon} />}
                                                                </div>
                                                            </li>
                                                        }
                                                    </ul>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
