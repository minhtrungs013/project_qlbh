import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Col, Row, Modal, Form, Input, Checkbox, message, Upload } from 'antd';
import { updateProduct, getProductById } from "../../../../api/service/ProductService";

export default function UpdateProduct({ isModalUpdate, handleOkUpdate, handleCancelUpdate, productId, getAllProduct1, form }) {
    const userId = localStorage.getItem("userID");
    const [messageApi, contextHolder] = message.useMessage();

    const updateProductSubmit = async (values) => {
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
        await updateProduct(`product/${""}`, data)
            .then((response) => {
                handleOkUpdate()
                getAllProduct1()
                form.resetFields();
                messageApi.open({
                    type: 'success',
                    content: "update product successfully",
                });
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: error.response.data.message,
                });
            });
    }

    const onFinishFailed = (errorInfo) => {
        messageApi.open({
            type: 'error',
            content: errorInfo.errorFields[0].errors[0],
        });
    };

    const onChange = (e) => {
        console.log(e.target.value);
    };

    return (
        <>
            {contextHolder}
            <Modal title="update Product" open={isModalUpdate} onOk={handleOkUpdate} onCancel={handleCancelUpdate} width={800}>
                <Row>
                    <Col span={24} className='1name'>
                        <Form form={form} >
                            <Col span={12} className='1name'>
                                <Input placeholder="Basic usage" name="nameProduct" value={productId?.nameProduct} onChange={onChange} />
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Modal >
        </>
    )
}


{/* <Form
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
onFinish={updateProductSubmit}
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
            <Input value={productId.nameProduct} />
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
    {/* <Col span={12} className='1name'>
        <Form.Item
            label="active"
            name="active"
        >
            <Checkbox  />
        </Form.Item>
    </Col> */}
//     <Col span={12} className='1name'>
//         <Form.Item
//             wrapperCol={{
//                 offset: 8,
//                 span: 16,
//             }}
//         >
//             <Button type="primary" htmlType="submit">
//                 Submit
//             </Button>
//         </Form.Item>
//     </Col>
// </Row>
// </Form> */}