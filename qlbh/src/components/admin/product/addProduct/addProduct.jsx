import React, { useEffect, useState } from 'react'
import { message, Button, Col, Row, Modal, Form, Input, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createProduct } from "../../../../api/service/ProductService";


export default function AddProduct({ isModalOpen, handleOk, handleCancel, getAllProduct1 }) {
    const [messageApi, contextHolder] = message.useMessage();
    const userId = localStorage.getItem("userID");
    const [form] = Form.useForm();
    const createProductSubmit = async (values) => {
        const data = {
            nameProduct: values.nameProduct,
            description: values.description,
            quantity: values.quantity,
            image1: values.image1,
            image2: values.image2,
            image3: values.image3,
            active: false,
            price: values.price
        }
        await createProduct(`product/${userId}`, data)
            .then((response) => {
                handleOk()
                getAllProduct1()
                form.resetFields();
                messageApi.open({
                    type: 'success',
                    content: "error.response.data.message",
                });
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: error.response.data.message,
                });
            });
    };


    const onFinishFailed = (errorInfo) => {
        messageApi.open({
            type: 'error',
            content:errorInfo.errorFields[0].errors[0],
        });
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>
            {contextHolder}
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
                            onFinish={createProductSubmit}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
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
                                        label="image1"
                                        name="image1"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your image1!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="image2"
                                        name="image2"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your image2!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        label="image3"
                                        name="image3"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your image3!',
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
                                        label="price"
                                        name="price"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your price!',
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
                                <Col span={12} className='1name'>
                                    <Form.Item
                                        name="upload"
                                        label="Upload"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        extra="long"
                                    >
                                        <Upload name="logo" action="/upload.do" listType="picture">
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
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
