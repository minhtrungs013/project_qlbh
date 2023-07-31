import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { createCategory, updateCategory } from '../../../api/service/Category';

const ModalCategory = props => {
    const { isOpen, title, form, Id, reloadData, onClose } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false)
    const IdItem = form.getFieldValue('id')

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }


    const handleUpdate = useCallback((values) => {
        const formControl = {
            id: values.id,
            name: values.name,
            isActive: status
        }        
        setIsLoading(true);
        updateCategory(`vocabularyCategories?id=${IdItem}`, formControl).then((res) => {
            if(res.data){
                handleCancel();
                message.success("UPDATE SUCCESS");
                reloadData();
            }
        }).catch(() => {
            message.error("Error")
        })
        setIsLoading(false);
    }, [handleCancel, reloadData])

    const handleCreate = (values) => {
        const formControl = {
            id: values.id,
            name: values.name,
            isActive: status,
        }
        setIsLoading(true);
        createCategory("vocabularyCategories/create", formControl).then((res) => {
            if(res.data){
                reloadData();
                handleCancel();
                message.success("CREATE SUCCESS");
            }
        })
        setIsLoading(false);
    }

    const onFinish = (values) => {
        if (values.id) {
            handleUpdate(values)
        } else {
            handleCreate(values)
        }
    }

    useEffect(() => {
      if(IdItem){
        setStatus(form.getFieldValue('isActive'))
      }
    }, [IdItem])
    

    const handleChange = (e) => {
        setStatus(e.target.checked);
    }

    return (
        <div>
            <Modal
                title={title}
                open={isOpen}
                className="form-create"
                form={form}
                onCancel={handleCancel}
                footer={[
                    <Button form="myForm" key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button form="myForm" key="submit" type="primary" htmlType="submit" loading={isLoading}>
                        Lưu
                    </Button>,
                ]}
            >
               <Form id="myForm" form={form} onFinish={onFinish}>
                    <Form.Item hidden={true} name="id"><Input /></Form.Item>

                    <Form.Item label="Name" name="name" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="isActive" >
                        <Checkbox checked={status} onChange={handleChange}></Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

ModalCategory.propTypes = {

};

export default ModalCategory;