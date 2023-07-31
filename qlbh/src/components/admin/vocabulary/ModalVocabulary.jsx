import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { getAllVocabularyCategory } from "../../../api/service/VocabularyCategory";
import { createProduct, updateProduct } from "../../../api/service/VocabularyService";

const ModalVocabulary = (props) => {
  const { isOpen, title, form, reloadData, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [options, setOptions] = useState([]);
  const IdItem = form.getFieldValue("id");

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };


  useEffect(() => {
    if (IdItem) {
      setStatus(form.getFieldValue("isActive"));
    }
  }, [IdItem]);

  const handleUpdate = useCallback(
    (values) => {
      const formControl = {
        id: values.id,
        word: values.word,
        mean: values.mean,
        pronounce: values.pronounce,
        categoryIds: values.categoryIds,
        isActive: values.isActive,
      };
      setIsLoading(true);
      updateProduct(`vocabularies?id=${IdItem}`, formControl)
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
      id: values.id,
      word: values.word,
      mean: values.mean,
      pronounce: values.pronounce,
      categoryIds: values.categoryIds,
      isActive: values.isActive,
    };
    setIsLoading(true);
    createProduct("vocabularies/create", formControl).then((res) => {
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

  const handleChange = (e) => {
    setStatus(e.target.checked);
  };

  const getAllCategory = () => {
    getAllVocabularyCategory(`vocabularyCategories`).then((res) => {
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
      getAllCategory();
    }
  }, [isOpen]);

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

              <Form.Item label="Word" name="word">
                <Input />
              </Form.Item>

              <Form.Item label="Mean" name="mean">
                <Input />
              </Form.Item>

              <Form.Item label="Status" name="isActive">
                <Checkbox checked={status} onChange={handleChange}></Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Pronounce" name="pronounce">
                <Input />
              </Form.Item>

              <Form.Item label="Category" name="categoryIds">
                <Select
                  mode="multiple"
                  allowClear
                  value={[IdItem && form.getFieldValue('parentName') ? form.getFieldValue('parentName') : []]}
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

ModalVocabulary.propTypes = {};

export default ModalVocabulary;
