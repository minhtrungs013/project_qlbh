import React, { useCallback, useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Modal, Space, Table, Tag, message } from "antd";
import HeaderPage from "../category/HeaderPage";
import {
  deleteProductById,
  getAllVocabulary,
} from "../../../api/service/VocabularyService";
import ModalPractice from "./ModalPractice";

const Practice = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imgUrl) => <img width={100} alt={imgUrl} src={imgUrl} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{ cursor: "pointer" }}>
          <Tag color="green" onClick={() => onClickUpdate(record)}>
            Edit
          </Tag>
          <Tag color="volcano" onClick={() => onClickDelete(record)}>
            Delete
          </Tag>
        </Space>
      ),
    },
  ];
  const onOpenModel = () => {
    setIsopen(true);
  };

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        name: record.name,
        type: record.type,
        image: record.image,
      };
      form.setFieldsValue(formControl);
      setIsopen(true);
    },
    [form]
  );

  const onClickUpdate = useCallback(
    (value) => {
      setId(value.id);
      onClickOpenModal(value);
    },
    [onClickOpenModal]
  );

  const reload = useCallback(() => {
    setIsLoading(true);
    getAllVocabulary("practices").then((res) => {
      setData(res.data.data);
      setIsLoading(false);
    });
  }, []);

  const getAllData = () => {
    setIsLoading(true)
    getAllVocabulary(`practices`).then((res) => {
          setData(res.data.data);
          setIsLoading(false)      
    });
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "SURE?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (value) => {
    deleteProductById(`practices?id=${value.id}`).then((res) => {
      message.success("SUCCESS");
      reload();
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <div className="main__application">
        <HeaderPage title="PRACTICE" onCreate={() => onOpenModel()} />
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalPractice
          isOpen={isOpen}
          onClose={() => {
            setIsopen(false);
            setId("");
          }}
          title={id ? "Edit form" : "Add new item"}
          reloadData={() => reload()}
          form={form}
        />
      </div>
    </div>
  );
};

Practice.propTypes = {};

export default Practice;
