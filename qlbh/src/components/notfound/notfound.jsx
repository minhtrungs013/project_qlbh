import React, { useEffect } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Notfound() {
    const navigate = useNavigate()
    useEffect(() => {
       setTimeout(() => {
        navigate(-1)
       },1000)
    }, []);
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
        />
    )
}
