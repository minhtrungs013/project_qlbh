import React, { useState, useEffect } from 'react';
import "./product.css"
import { Space, Table, Tag, Button, Col, Row, Modal, Form, Input, Checkbox, Upload } from 'antd';
import { PicRightOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { getAllProduct } from "../../../api/service/ProductService";
import AddProduct from './addProduct/addProduct';
import UpdateProduct from './updateProduct/updateProduct';
import { getProductById } from "../../../api/service/ProductService";


export default function Product() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const userId = localStorage.getItem("userID");
    const [data, setData] = useState([])
    const [productId, setIdProductId] = useState({})
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Name product',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'image1',
            dataIndex: 'image1',
            key: 'image1',
            render: (text, record) => (
                <img
                    src={record.image1}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                />
            ),
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'active',
            dataIndex: 'active',
            key: 'active',
            render: (text, record) => (
                <Checkbox defaultChecked={record.active} onChange={onChange}></Checkbox>
            ),
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a> <EditOutlined onClick={() => showModalUpdate(record)} /></a>
                    <a><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];


    const getAllProduct1 = () => {
        getAllProduct(`product/`)
            .then((res) => {
                setData(res.data);
            });
    }

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const showModalUpdate = (productId) => {
        setIdProductId({...productId})
        setIsModalUpdate(true)

    };
    const showModal = (value) => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkUpdate = () => {
        form.resetFields();
        setIsModalUpdate(false);

    };

    const handleCancelUpdate = () => {
        form.resetFields();
        setIsModalUpdate(false);
    };

    useEffect(() => {
        getAllProduct1()
    }, []);

    return (
        <>
            <div className='product'>
                <div className='product__heading'>
                    <div className='product__deading'>
                        <PicRightOutlined className='product__deading-icon' />
                        <h3 className='product__deading-text'>Product Management</h3>
                    </div>
                    <div className='product__create'>
                        <Button type="primary" className='product__create-btn'
                            onClick={() => showModal()}>
                            Create
                        </Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
            <AddProduct
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                getAllProduct1={getAllProduct1}>
            </AddProduct>
            <UpdateProduct
                isModalUpdate={isModalUpdate}
                handleOkUpdate={handleOkUpdate}
                handleCancelUpdate={handleCancelUpdate}
                productId={productId}
                getAllProduct1={getAllProduct1}
                form={form}>
            </UpdateProduct>

        </>
    )
}
