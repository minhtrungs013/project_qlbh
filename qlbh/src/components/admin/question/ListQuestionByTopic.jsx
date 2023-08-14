import React, { useEffect, useState } from 'react'
import HeaderPage from '../category/HeaderPage'
import { NavLink, useParams } from 'react-router-dom';
import { deleteDataById, getAllData } from '../../../api/service/api';
import { Table, Space, Tag, Form, Modal, message } from 'antd';
// import ProgressBar from '../../shared/ProgressBar/ProgressBar';
import NoImg from '../../../asset/no-image.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalCreateQuestionByTopic from './ModalCreateQuestionByTopic';
const ListQuestionByTopic = props => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);
    const [form] = Form.useForm();
    let { id, name } = useParams();

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
          render: (text) => <a href='no data'>{text}</a>,
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
          dataIndex: "images",
          key: "images",
          render: (imgUrl) => <img width={60} alt={imgUrl} src={`/static/media/${imgUrl}`} onError={handleImageError} />,
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
                <NavLink to={`/detail-question/${record.id}/${id}`}>Edit</NavLink>
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
        getAllData(`questions?objectTypeId=${id}`).then((res) => {
          setData(res.data.data)
          setIsLoading(false)
        });
      };

      useEffect(() => {
        getDataQuestionByTopic()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <div>
      <div className="main__application">
        <HeaderPage title={`Question of ${name}`} onBack={true} onCreate={() => onOpenModel()} />
        {/* <ProgressBar title={name} onBack={true}/> */}
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalCreateQuestionByTopic
          isOpen={isOpen}
          onClose={() => { setIsopen(false)}}
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