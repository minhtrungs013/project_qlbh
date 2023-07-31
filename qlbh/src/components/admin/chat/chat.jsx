import React, { useRef, useEffect, useState } from "react";
import "./chat.css"
import { SearchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { userChats } from "../../../api/ChatRequests";
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

    const onchangrUserID = (value) => {
        setText(value);
    }
    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
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

                                <div className='chat__search_item-icon'>
                                    <SearchOutlined />
                                </div>
                            </div>
                            <ul id='style-1' className="chat-list">
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
                    </Col>
                </Row>
            </div>

        </>
    )
}
