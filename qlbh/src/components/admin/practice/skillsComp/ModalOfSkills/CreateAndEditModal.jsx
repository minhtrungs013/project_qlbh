import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, message, Modal, Row, Select, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createData,
  getAllData,
  updateData,
} from "../../../../../api/service/api";
import { DEFAULT_IMAGE } from "../../../../../commom/messageConstant";
import { handleUpload } from "../../../../../utils/utils";
const CreateAndEditModal = (props) => {
  const { isOpen, title, form, reloadData, onClose, practiceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([])
  const [loadingSpin, setLoadingSpin] = useState(false)
  const IdItem = form.getFieldValue("id");
  const [messageApi, contextHolder] = message.useMessage();
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
        id: IdItem,
        practiceId: values.practiceId,
        name: values.name,
        description: values.description,
        imageURL: form.getFieldValue('imageURL') ? form.getFieldValue('imageURL') : "abc",
      };
      setIsLoading(true);
      updateData(`parts`, formControl)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [IdItem, handleCancel, reloadData]
  );

  const uploadButton = useMemo(() => {
    return <>
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    </>
  }, [])

  const handleCreate = (values) => {
    const formControl = {
      practiceId: practiceId,
      name: values.name,
      description: values.description,
      imageURL: image,
    };
    setIsLoading(true);
    createData("parts", formControl).then((res) => {
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
    setLoadingSpin(true)
    const files = event.target?.files
    const images = await handleUpload(files)
    setImage(images[0])
    setLoadingSpin(false)

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
              {IdItem && <Form.Item label="Practice Group" name="practiceId">
                <Select
                  allowClear
                  options={dataPractice}
                ></Select>
              </Form.Item>}
              <Form.Item>
                <img className='Description_item_img' src={image.length > 0 ? image : DEFAULT_IMAGE} alt="" />
                {loadingSpin ?
                  <Spin indicator={antIcon} />
                  :
                  <div className='Description_upload'>
                    <FontAwesomeIcon icon={faUpload} className='Description_faUpload' />
                    <input type="file" className='Description_inputfile' onChange={handleFileChange} />
                  </div>
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

CreateAndEditModal.propTypes = {};

export default CreateAndEditModal;
