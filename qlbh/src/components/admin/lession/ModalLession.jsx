import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { createData, getDataById, updateData } from "../../../api/service/api";

const ModalLession = (props) => {
  const { isOpen, title, form, reloadData, onClose, partId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const IdItem = form.getFieldValue("id");

  const handleCancel = useCallback(() => {
    onClose();
    form.resetFields();
  },[form, onClose]);

  const getPartById = () => {
    getDataById(`practiceParts?practiceId=${partId}`).then((res) => {
      const _options = [];
      res.data.data.forEach((e, i) => {
        _options.push({
            value: e.id ,
            label: e.name
        })
      });
      setOptions(_options);
    });
  };

  useEffect(() => {
    if (isOpen) {
        getPartById()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleUpdate = useCallback(
    (values) => {
      const formControl = {
        name: values.name,
        practicePartId: values.practicePartId
      };
      setIsLoading(true);
      updateData(`partLessons?id=${IdItem}`, formControl)
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
    [IdItem, handleCancel, reloadData]
  );

  const handleCreate = (values) => {
    const formControl = {
      name: values.name,
      practicePartId: values.practicePartId,
    };
    setIsLoading(true);
    createData("partLessons/create", formControl).then((res) => {
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

  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        className="form-create"
        width={600}
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
            <Col span={24}>
              <Form.Item hidden={true} name="id">
                <Input />
              </Form.Item>

              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Part" name="practicePartId">
                <Select
                  allowClear
                  value={[IdItem && form.getFieldValue('practicePartId') ? form.getFieldValue('practicePartId') : []]}
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

ModalLession.propTypes = {};

export default ModalLession;
