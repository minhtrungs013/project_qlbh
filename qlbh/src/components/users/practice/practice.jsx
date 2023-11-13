import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPractices } from '../../../api/service/PracticeService';
import { setPracticeId, setPracticeType } from '../../redux/_actions/practice.actions';
import "./practice.css";

export default function Practice() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    /**
     * Sets the practice ID and type.
     *
     * @param {object} practice The practice to set the ID and type of.
     */
    const handleSetId = (practice) => {
        dispatch(setPracticeId(practice?.id));
        dispatch(setPracticeType(practice?.type));
    }

    /**
     * Gets all practices from the API.
     */
    const getAllPractices = () => {
        getPractices(`practices`)
            .then((res) => {
                setLoading(false)
                setData(res.data.data);
            }).catch((Error) => {
                console.log(Error);
            })
    }

    /**
     * UseEffect hook that gets all practices from the API on mount.
     */
    useEffect(() => {
        setLoading(true)
        getAllPractices()
    }, []);

    return (
        <div >
            <h1 className='practice__heading'>Practice </h1>
            {loading ?
                <div className="example">
                    <Spin />
                </div> :
                <>
                    <div className='test row ' >
                        {data?.map((item) => (
                            <div className='col l-2 m-5 c-6' key={item.id}>
                                <Link to={`/practice/part`} className='practice__link'>
                                    <div className='practice'>
                                        <img className='practice_img' onClick={() => handleSetId(item)} src={item.imageURL} alt=""  loading="eager" />
                                        <h2>{item.name}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            }

        </div>
    )
}