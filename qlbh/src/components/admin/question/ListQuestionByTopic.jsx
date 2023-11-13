import React, { useEffect, useState, useRef } from 'react'
import HeaderPage from '../category/HeaderPage'
import { NavLink } from 'react-router-dom';
import { deleteDataById, getAllData } from '../../../api/service/api';
import { Table, Space, Tag, Form, Modal, message } from 'antd';
// import ProgressBar from '../../shared/ProgressBar/ProgressBar';
import NoImg from '../../../asset/no-image.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalCreateQuestionByTopic from './ModalCreateQuestionByTopic';
import { useSelector, useDispatch } from 'react-redux';
// import { setQuestionId } from '../../redux/_actions';

const ListQuestionByTopic = props => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [form] = Form.useForm();
  const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);
  // const dispatch = useDispatch();
  const audioPlayerRef = useRef(null);
  const onClickSetQuestionId = (record) => {
    // dispatch(setQuestionId(record.id))
  }
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
      title: "Audio Question",
      dataIndex: "audioQuestion",
      key: "audioQuestion",
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
      render: (text) => <a href='no data'>{text}</a>,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text) => <a href='no data'>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "imageUrls",
      key: "imageUrls",
      render: (imageUrls) => (
        <>
          {imageUrls && imageUrls.length > 0 &&
            <img
              width={60}
              alt={imageUrls}
              src={imageUrls[0]}
              onError={handleImageError}
            />
          }
        </>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{ cursor: "pointer" }}>
          <Tag color="volcano" onClick={() => onClickDelete(record)}>
            Delete
          </Tag>
          <Tag color="geekblue">
            <NavLink to={`/practice/skill/question/details`} onClick={() => onClickSetQuestionId(record)}>Edit</NavLink>
          </Tag>
        </Space>
      ),
    },
  ];

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to delete this item?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (value) => {
    deleteDataById(`questions?id=${value.id}`).then((res) => {
      message.success("SUCCESS");
      getDataQuestionByTopic();
    });
  };

  const handleImageError = (err) => {
    err.target.src = NoImg
  };

  const onOpenModel = () => {
    setIsopen(true);
  };

  const getDataQuestionByTopic = () => {
    setIsLoading(true)
    getAllData(`questions?objectTypeId=${objectTypeId}`).then((res) => {
      setData(res.data.data)
      setIsLoading(false)
    });
  };

  useEffect(() => {
    getDataQuestionByTopic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="main__application">
        <HeaderPage onBack={true} onCreate={() => onOpenModel()} />
        {/* <ProgressBar title={name} onBack={true}/> */}
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalCreateQuestionByTopic
          isOpen={isOpen}
          onClose={() => { setIsopen(false) }}
          title={"Add new item"}
          reloadData={() => getDataQuestionByTopic()}
          form={form}
        />
      </div>
    </div>
  )
}

ListQuestionByTopic.propTypes = {}

export default ListQuestionByTopic