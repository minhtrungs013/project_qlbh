import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Space, Spin, Table, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import "./profile.css";
import { faAddressCard, faArrowUpRightDots, faBars, faBook, faCalendarDays, faEnvelope, faKey, faLocationDot, faPen, faPersonWalkingLuggage, faPhoneVolume, faSpellCheck, faUpload, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { changePasswordAPI } from "../../../api/service/AuthService";
import { getUser, updateUser } from "../../../api/service/UserService";
import { handleUpload } from '../../../utils/utils';
import { setLoggedIn, setRoleUser, setUser } from '../../redux/_actions/user.actions';



export default function Profile() {
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showChangeUser, setShowChangeUser] = useState(false)
    const [loading, setLoading] = useState(false)
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
    const noImage = "https://www.dropbox.com/scl/fi/j2jzyxg6q9hw9shxhe6m4/no-image.png?rlkey=zc2jnd2rdyb9oxe20bfmklcnz&raw=1"
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
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

    const handleUpdateUserForm = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name", "value");
        const fieldValue = event.target.value;
        const newFormData = { ...newData };
        newFormData[fieldName] = fieldValue;
        setNewData(newFormData);
    };

    const [newPassword, setNewPassword] = useState({
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null,
    });

    const handleChangePasswordForm = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name", "value");
        const fieldValue = event.target.value;
        const newFormData = { ...newPassword };
        newFormData[fieldName] = fieldValue;
        setNewPassword(newFormData);
    };

    useEffect(() => {
        if (userId) {
            getUserById()
        }
    }, [userId])

    const getUserById = () => {
        getUser(`users?id=${userId}`).then((res) => {
            if (res) {
                setDataUser(res.data.data)
                setNewData(res.data.data?.userInfo)
                setShowChangeUser(false)
                setLoading(false)
                setTimeout(() => {
                    setLoadingImage(false)
                }, 1000);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const changePassword = () => {
        setShowChangePassword(!showChangePassword)
    }
    const handleChangePassword = () => {
        changePasswordAPI(`users/change-password?id=${userId}`, newPassword).then((res) => {
            if (res) {
                dispatch(setUser(null))
                dispatch(setRoleUser(null))
                dispatch(setLoggedIn(false))
                navigate("/login");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const changeUser = () => {
        cancelCourse()
        setShowChangeUser(!showChangeUser)

    }
    const handleUpdateUser = () => {
        setLoading(true)
        updateUser(`user-infos?user-id=${userId}`, newData).then((res) => {
            if (res) {
                getUserById()
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    const handleFileChange = async (event) => {
        setLoadingImage(true)
        const selectedFile = event.target.files
        const image = await handleUpload(selectedFile, code, URIPath)

        if (image === "Invalid Access Token") {
            window.location.href = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=lntimln3hpjnwx4&redirect_uri=${encodeURIComponent(URIPath)}&response_type=code`
        } else if (image === "Image name already exists") {
            messageApi.open({
                type: 'warning',
                content: image,
            });
            setLoadingImage(false)
        } else {
            newData.imageURL = image[0]
            handleUpdateUser()
            setCode("")
        }
    };

    function convertToISODate(dateString) {
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

    const cancelCourse = () => {
        document.getElementById("create-course-form").reset();
    }

    const showDeleteConfirm = () => {
        setLoading(true)
        confirm({
            title: 'Note',
            icon: <ExclamationCircleFilled />,
            content: 'Changing your password you will have to log in again!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setLoading(false)
                handleChangePassword()
            },
            onCancel() {
                // setShowChangePassword(false)
                setLoading(false)
            },
        });
    };

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

    return (
        <div>
            {contextHolder}
            <Row >
                <Col span={16} offset={4}>
                    <h2 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faAddressCard} /> Profile</h2>
                    <div>
                        <Row gutter={45}>
                            <Col span={6}>
                                <div className='profile_item'>
                                    <img src={dataUser?.userInfo?.imageURL ? dataUser?.userInfo?.imageURL : noImage} className='profile_item_img' alt="" />
                                    {loadingImage && <Spin className='antIcon' indicator={loadImage} />}
                                    <div className='upload'>
                                        <FontAwesomeIcon icon={faUpload} className='faUpload' />
                                        <input type="file" className='inputfile' onChange={handleFileChange} />
                                    </div>
                                    <div className='profile_body-name-left'>
                                        <FontAwesomeIcon className='profile_body-name-icon' icon={faUser} />
                                        <h2 > Minh Trung</h2>
                                    </div>

                                </div>
                            </Col>
                            <Col span={18}>
                                <div className='profile_item'>
                                    <div className='profile_body'>
                                        <Row gutter={24}>
                                            <Col span={12}>
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
                                            </Col>
                                            <Col span={12}>
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
                                                                        <span >Confim New Password</span>
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
                                                                <div className='profile__btn btn_submit' onClick={() => showDeleteConfirm()}>Submit
                                                                    {loading && <Spin style={{ paddingLeft: '10px' }} indicator={antIcon} />}
                                                                </div>
                                                            </li>
                                                        }
                                                    </ul>
                                                </form>
                                            </Col>
                                        </Row>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h2 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faArrowUpRightDots} /> Statistics </h2>
                        <Row gutter={24}>
                            <Col span={12}>
                                <h3 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faPen} /> Practice </h3>
                                <div className='profile_item'>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <h3 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faBook} /> Vocabulary </h3>
                                <div className='profile_item'>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <h3 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faSpellCheck} /> Grammar </h3>
                                <div className='profile_item'>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <h3 style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faBars} /> Test </h3>
                                <div className='profile_item'>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
