import React, { useRef, useEffect, useState } from "react";
import "./chat.css"
import { SearchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { userChats } from "../../api/ChatRequests";
import Profile from "./profile/profile";
import ChatBox from "./ChatBox/ChatBox";
import { io } from "socket.io-client";

export default function Chat() {

    const socket = useRef();
    const userId = localStorage.getItem("userID");
    const [text, setText] = useState("");
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);


    const setUserID = (value) => {
        localStorage.setItem("userID", value);
    }
    const onchangrUserID = (value) => {
        setText(value);
    }
    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
            console.log(users);
            setOnlineUsers(users);
        });
    }, [userId]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data);
        }

        );
    }, []);

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(userId);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [userId]);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== userId);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };




    console.log(chats);

    return (
        <>
            <div className="chat__left">
                <Row gutter={1}>
                    <Col span={4} className='name3'>
                        <div id="plist" className="people-list">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-search" /></span>
                                </div>
                                <input type="text" className='chat__search_item' placeholder='Sreach...' onChange={(value) => (onchangrUserID(value.target.value))} />
                                    <button onClick={() => {
                                       setUserID(text)
                                    }} >aaaa</button>
                                <div className='chat__search_item-icon'>
                                    <SearchOutlined  />
                                </div>
                            </div>
                            <ul id='style-1' className="Chat-list1">
                                {chats.map((chat) => (
                                    <div onClick={() => {
                                        setCurrentChat(chat);
                                    }}>
                                        <Profile
                                            data={chat}
                                            currentUser={userId}
                                            online={checkOnlineStatus(chat)}
                                        ></Profile>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </Col>
                    <Col span={20} className='name3'>
                        <ChatBox
                            chat={currentChat}
                            currentUser={userId}
                            setSendMessage={setSendMessage}
                            receivedMessage={receivedMessage}
                        />

                        {/* <div className="chat">
                            <div className="chat-header clearfix">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                        </a>
                                        <div className="chat-about">
                                            <h6 className="m-b-0">Aiden Chavez</h6>
                                            <small>Last seen: 2 hours ago</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 hidden-sm text-right">
                                        <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera" /></a>
                                        <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image" /></a>
                                        <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs" /></a>
                                        <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-history">
                                <ul className="m-b-0">
                                    <li className="clearfix">
                                        <div className="message-data text-right">
                                            <span className="message-data-time">10:10 AM, Today</span>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                        </div>
                                        <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="message-data">
                                            <span className="message-data-time">10:12 AM, Today</span>
                                        </div>
                                        <div className="message my-message">Are we meeting today?</div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="message-data">
                                            <span className="message-data-time">10:15 AM, Today</span>
                                        </div>
                                        <div className="message my-message">Project has been already finished and I have results to show you.</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="chat-message clearfix">
                                <div className="input-group mb-0">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-send" /></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Enter text here..." />
                                </div>
                            </div>
                        </div> */}
                    </Col>
                </Row>
            </div>

        </>
    )
}
