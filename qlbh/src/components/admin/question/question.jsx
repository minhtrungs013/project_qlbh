import React, { useCallback, useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Modal, Space, Table, Tag, message } from "antd";
import HeaderPage from "../category/HeaderPage";
import ModalQuestion from "./ModalQuestion";
import { NavLink } from 'react-router-dom';
import { deleteDataById, getAllData } from "../../../api/service/api";

const Question = (props) => {
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <a href="no data">{text}</a>,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text) => <a href="no data">{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
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
          <Tag color="geekblue">
            <NavLink to={`/detail-question/${record.id /** replace id = testId */}`}>Detail</NavLink>
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
    getAllData("questions").then((res) => {
      setData(res.data.data);
      setIsLoading(false);
    });
  }, []);

  const getDataQuestion = () => {
    setIsLoading(true)
    getAllData(`questions`).then((res) => {
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
    deleteDataById(`practices?id=${value.id}`).then((res) => {
      message.success("SUCCESS");
      reload();
    });
  };

  useEffect(() => {
    getDataQuestion();
  }, []);

  return (
    <div>
      <div className="main__application">
        <HeaderPage title="QUESTION" onCreate={() => onOpenModel()} />
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalQuestion
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

Question.propTypes = {};

export default Question;
