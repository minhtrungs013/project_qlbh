import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  createData,
  getAllData,
  updateData,
} from "../../../../../api/service/api";

const CreateAndEditModal = (props) => {
  const { isOpen, title, form, reloadData, onClose, practiceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const IdItem = form.getFieldValue("id");
  const [dataPractice, setDataPractice] = useState([]);

  const handleCancel = useCallback(() => {
    onClose();
    form.resetFields();
  },[form, onClose]);

  const getDataPractice = () => {
    getAllData(`practices`).then((res) => {
      const _options = [];
      res.data.data.forEach((e, i) => {
        _options.push({
          value: e.id,
          label: e.name,
        });
      });
      setDataPractice(_options);
    });
  };

  useEffect(() => {
    if (isOpen) {
      getDataPractice();
    }
  }, [isOpen]);

  const handleUpdate = useCallback(
    (values) => {
      const formControl = {
        practiceId: values.practiceId,
        name: values.name,
        description: values.description,
        image: values.image,
      };
      setIsLoading(true);
      updateData(`practiceParts?id=${IdItem}`, formControl)
        .then((res) => {
          if (res.data) {
            handleCancel();
            message.success("UPDATE SUCCESSFULLY");
            reloadData();
          }
        })
        .catch(() => {
          message.error("Error");
        });
      setIsLoading(false);
    },
    [IdItem, handleCancel, reloadData]
  );

  const handleCreate = (values) => {
    const formControl = {
      practiceId: practiceId,
      name: values.name,
      description: values.description,
      image: values.image,
    };
    setIsLoading(true);
    createData("practiceParts/create", formControl).then((res) => {
      if (res.data) {
        reloadData();
        handleCancel();
        message.success("CREATE SUCCESSFULLY");
      }
    });
    setIsLoading(false);
  };

  const onFinish = (values) => {
    if (values.id) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
  };

  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        className="form-create"
        width={800}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            form="myForm"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Lưu
          </Button>,
        ]}
      >
        <Form id="myForm" form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item hidden={true} name="id">
                <Input />
              </Form.Item>

              <Form.Item label="Name" name="name" 
                rules={[
                  {
                    required: true,
                    message: 'Please input this field!',
                  },
                ]}
                >
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Image" name="image">
                <Input />
              </Form.Item>
              {IdItem && <Form.Item label="Practice Group" name="practiceId">
                <Select
                  allowClear
                  options={dataPractice}
                ></Select>
              </Form.Item>}
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

CreateAndEditModal.propTypes = {};

export default CreateAndEditModal;
