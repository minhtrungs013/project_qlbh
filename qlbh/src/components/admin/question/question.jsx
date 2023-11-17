import React, { useCallback, useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Modal, Space, Table, Tag, message } from "antd";
import HeaderPage from "../category/HeaderPage";
import ModalQuestion from "./ModalQuestion";
import { NavLink } from 'react-router-dom';
import { deleteDataById, getAllData } from "../../../api/service/api";
import { useRef } from "react";
import noImage from '../../../asset/no-image.png'
import { useDispatch, useSelector } from "react-redux";
import { setQuestionId } from "../../redux/_actions";

const TextCustom = ({ children, ...props }) => (
  <span className='text' {...props} style={{color: '#1677ff'}}>
    {children}
  </span>
)
// eslint-disable-next-line no-unused-vars
const ImgCustom = ({ children, ...props }) => (
  <div className='text' {...props} style={{width: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
    {children}
  </div>
)

const Question = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const audioPlayerRef = useRef(null);
  const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);
  const dispatch = useDispatch()

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
      title: "Audio",
      dataIndex: "audioURL",
      key: "audioURL",
      render: (text) => <>
      <div style={{ display: "flex", justifyContent: "left", marginBottom: "15px" }}>
        <audio controls ref={audioPlayerRef}>
          <source src={text} type="audio/mpeg"></source>
        </audio>
      </div>
    </>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <TextCustom>{text}</TextCustom>,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text) => <TextCustom>{text}</TextCustom>,
    },
    {
      title: "Image",
      dataIndex: "imageURLs",
      key: "imageURLs",
      width: "20%",
      render: (imgUrl) => <img width={100} alt="" src={noImage} />, /** replace image into noImage */
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
          <Tag color="geekblue" onClick={() => dispatch(setQuestionId(record.id))}>
            <NavLink to={`/question/detail-question`}>Detail</NavLink>
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

  const getDataQuestion = () => {
    setIsLoading(true)
    getAllData(`questions?object-type-id=${objectTypeId}&page=1&size=10`).then((res) => {
          setData(res.data.data);
          setIsLoading(false)      
    }).catch((err) => {
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
      getDataQuestion();
    });
  };

  useEffect(() => {
    getDataQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="main__application">
        <HeaderPage onCreate={() => onOpenModel()} />
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
          reloadData={() => getDataQuestion()}
          form={form}
        />
      </div>
    </div>
  );
};

Question.propTypes = {};

export default Question;
