import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createProduct,
  updateProduct,
} from "../../../api/service/VocabularyService";
import { UploadOutlined } from "@ant-design/icons";

const arrType = [
  { value: "Listen", label: "Listen" },
  { value: "Read", label: "Read" },
  { value: "Speak", label: "Speak" },
  { value: "Write", label: "Write" },
];

const ModalPractice = (props) => {
  const { isOpen, title, form, reloadData, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const IdItem = form.getFieldValue("id");

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen) {
      setOptions(arrType);
    }
  }, [isOpen]);

  const handleUpdate = useCallback(
    (values) => {
      const formControl = {
        name: values.name,
        type: values.type,
        image: values.image,
      };
      setIsLoading(true);
      updateProduct(`practices/updateWithoutParts?id=${IdItem}`, formControl)
        .then((res) => {
          if (res.data) {
            handleCancel();
            message.success("UPDATE SUCCESS");
            reloadData();
          }
        })
        .catch(() => {
          message.error("Error");
        });
      setIsLoading(false);
    },
    [handleCancel, reloadData]
  );

  const handleCreate = (values) => {
    const formControl = {
      name: values.name,
      type: values.type,
      image: values.image,
    };
    setIsLoading(true);
    createProduct("practices/createWithoutParts", formControl).then((res) => {
      if (res.data) {
        reloadData();
        handleCancel();
        message.success("CREATE SUCCESS");
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

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    // return e?.fileList;
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

              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Type" name="type">
                <Select
                  allowClear
                  // value={[IdItem && form.getFieldValue('type') ? form.getFieldValue('type') : []]}
                  options={options}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Image" name="image" valuePropName="image" getValueFromEvent={normFile}>
                <Upload name="image" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

ModalPractice.propTypes = {};

export default ModalPractice;
