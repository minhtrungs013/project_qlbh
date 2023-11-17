import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  createData,
  getAllData,
  updateData,
} from "../../../../../api/service/api";
import { useLocation } from "react-router-dom";
import { handleUpload } from "../../../../../utils/utils";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../question/DetailQuestion";
import { useMemo } from "react";
const CreateAndEditModal = (props) => {
  const { isOpen, title, form, reloadData, onClose, practiceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [images, setImages] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
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

  const handleCancelReview = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setImages(newFileList);

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
  },[])

  const handleCreate = (values) => {
    const formControl = {
      practiceId: practiceId,
      name: values.name,
      description: values.description,
      imageURL: form.getFieldValue('imageURL') ? form.getFieldValue('imageURL') : "abc",
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

  const CustomButtonFile = useMemo(() => {
    return <>
       <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={images}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {images.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelReview}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  },[images, previewImage, previewOpen, previewTitle, uploadButton])

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
                {/* <img className='Description_item_img' src={newImage ? newImage : form.getFieldValue("imageURL")} alt="" />
                {loadingSpin ?
                  <Spin indicator={antIcon} />
                  :
                  <div className='Description_upload'>
                    <FontAwesomeIcon icon={faUpload} className='Description_faUpload' />
                    <input type="file" className='Description_inputfile' onChange={handleFileChange} />
                  </div>
                } */}
                {CustomButtonFile}
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
