import React, { useState } from 'react';
import "./product.css"
import { Space, Table, Tag, Button, Col, Row, Modal, Form, Input } from 'antd';
import { PicRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'Name product',
        dataIndex: 'Nameproduct',
        key: 'Nameproduct',
        render: (text) => <a>{text}</a>,
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
        title: 'status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
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
                <a><EditOutlined /></a>
                <a><DeleteOutlined /></a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        Nameproduct: 'John Brown',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        Nameproduct: 'Jim Green',
        price: 21,
        status: "action",
        quantity: 42,
        description: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    }, {
        key: '4',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '8',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '9',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '11',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '12',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '13',
        Nameproduct: 'Joe Black',
        price: 21,
        status: "action",
        quantity: 32,
        description: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },

];

export default function Product() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {

        console.e('Failed:', errorInfo.errorFields[0].errors[0]);
    };

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
            <Modal title="Create Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
                <Row>
                    <Col span={24} className='1name'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                Width: '100%',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Row>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="nameProduct"
                                        name="nameProduct"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your name Product!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="description"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your description!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="status"
                                        name="status"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your status!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="quantity"
                                        name="quantity"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your quantity!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="Tags"
                                        name="Tags"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Tags!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="Tags"
                                        name="Tags"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Tags!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal >
        </>
    )
}
