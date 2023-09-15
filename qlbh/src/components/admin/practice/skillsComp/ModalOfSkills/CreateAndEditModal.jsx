import { Button, Col, Form, Input, message, Modal, Row, Select, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  createData,
  getAllData,
  updateData,
} from "../../../../../api/service/api";
import { useLocation } from "react-router-dom";
import { handleUpload } from "../../../../../utils/utils";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingOutlined } from '@ant-design/icons';
const CreateAndEditModal = (props) => {
  const { isOpen, title, form, reloadData, onClose, practiceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [loadingSpin, setLoadingSpin] = useState(false)
  const IdItem = form.getFieldValue("id");
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const currentUri = location.search;
  const parts = currentUri.split("?code=");
  const [code, setCode] = useState(parts[1] === undefined ? "" : parts[1]);
  const URIPath = `http://localhost:3000${location.pathname}`;
  const [dataPractice, setDataPractice] = useState([]);
  const handleCancel = useCallback(() => {
    onClose();
    form.resetFields();
  }, [form, onClose]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

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
        image: form.getFieldValue('image'),
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
      image: form.getFieldValue('image'),
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

  const handleFileChange = async (event) => {
    const checkType = event.target?.files[0]?.type.indexOf("image") !== -1
    if (checkType) {
      setLoadingSpin(true)
    } else {
      messageApi.open({
        type: 'warning',
        content: "Please choose the correct format file",
      });
      return
    }
    const selectedFile = event.target.files
    const image = await handleUpload(selectedFile, code, URIPath)
    if (image === "Invalid Access Token") {
      window.location.href = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=lntimln3hpjnwx4&redirect_uri=${encodeURIComponent(URIPath)}&response_type=code`
    } else if (image === "Image already exists") {
      messageApi.open({
        type: 'warning',
        content: image,
      });
      setLoadingSpin(false)
    } else {
      setNewImage(image)
      form.setFieldValue('image', image[0])
      setLoadingSpin(false)
      setCode("")
    }
  }

  return (
    <div>
      {contextHolder}
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
              <Form.Item>
                <img className='Description_item_img' src={newImage ? newImage : form.getFieldValue("image")} alt="" />
                {loadingSpin ?
                  <Spin indicator={antIcon} />
                  :
                  <div className='Description_upload'>
                    <FontAwesomeIcon icon={faUpload} className='Description_faUpload' />
                    <input type="file" className='Description_inputfile' onChange={handleFileChange} />
                  </div>
                }
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
