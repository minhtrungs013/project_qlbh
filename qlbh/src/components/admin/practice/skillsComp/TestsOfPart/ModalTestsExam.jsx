import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { createData, updateData } from "../../../../../api/service/api";

const arrType = [
  { value: "Listen", label: "Listen" },
  { value: "Read", label: "Read" },
  { value: "Speak", label: "Speak" },
  { value: "Write", label: "Write" },
];

const ModalTestsExam = (props) => {
    const { isOpen, title, form, reloadData, onClose, partId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const IdItem = form.getFieldValue("id");
    const [options, setOptions] = useState([]);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          id: IdItem,
          partId: partId,
          name: values.name,
          type: values.type,
        };
        setIsLoading(true);
        updateData(`tests`, formControl)
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
      [IdItem, handleCancel, partId, reloadData]
    );

    const handleCreate = (values) => {
      const formControl = {
        partId: partId,
        name: values.name,
        type: values.type,
      };
      setIsLoading(true);
      createData("tests", formControl).then((res) => {
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
              </Col>
              <Col span={12}>
                 <Form.Item label="Type" name="type"
                    rules={[
                      {
                        required: true,
                        message: 'Please input this field!',
                      },
                    ]}
                  > 
                    <Select 
                        allowClear
                        value={[IdItem && form.getFieldValue('type') ? form.getFieldValue('type') : []]} 
                        options={options}  
                    ></Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
};

ModalTestsExam.propTypes = {};

export default ModalTestsExam;
