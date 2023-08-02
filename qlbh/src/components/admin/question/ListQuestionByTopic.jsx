import React, { useEffect, useState } from 'react'
import HeaderPage from '../category/HeaderPage'
import { NavLink, useParams } from 'react-router-dom';
import { getAllData } from '../../../api/service/api';
import { Table, Space, Tag, Form } from 'antd';
import ProgressBar from '../../shared/ProgressBar/ProgressBar';
import NoImg from '../../../asset/no-image.png';
import ModalQuestion from './ModalQuestion';
const ListQuestionByTopic = props => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);
    const [idItem, setIdItem] = useState("");
    const [form] = Form.useForm();
    let { id, name } = useParams();

    const columns = [
        {
          title: "STT",
          dataIndex: "id",
          key: "id",
          width: "10%",
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
          width: "10%",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Level",
          dataIndex: "level",
          key: "level",
          width: "10%",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Option Answers",
          dataIndex: "questions",
          key: "questions",
          width: "30%",
          render: (arrOption) => (
            <>
              {arrOption !== null && arrOption?.map((item, index) => {
                return (
                  <ul key={index}>
                  <li>{item.answerA}</li>
                  <li>{item.answerB}</li>
                  <li>{item.answerC}</li>
                  <li>{item.answerD}</li>
              </ul>
                )
              })}
            </>
          )
        },
        {
          title: "Correct Answers",
          dataIndex: "questions",
          key: "questions",
          width: "10%",
          render: (arrOption) => (
            <span>
              {arrOption !== null && arrOption?.map((item, index) => {
                return (
                  <a key={index}>{item.correctAnswer}</a>
                )
              })}
            </span>
          )
        },
        {
          title: "Image",
          dataIndex: "images",
          key: "images",
          render: (imgUrl) => <img width={60} alt={"No Image"} src={imgUrl} onError={handleImageError} />,
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle" style={{ cursor: "pointer" }}>
              <Tag color="volcano" /**onClick={() => onClickDelete(record)} */>
                Delete
              </Tag>
              <Tag color="geekblue">
                <NavLink to={`/detail-question/${record.id}`}>Detail</NavLink>
              </Tag>
            </Space>
          ),
        },
      ];

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
      },[])

  return (
    <div>
      <div className="main__application">
        <HeaderPage title={`Question of ${name}`} onBack={true} onCreate={() => onOpenModel()} />
        {/* <ProgressBar title={name} onBack={true}/> */}
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        {/* <ModalQuestion
          isOpen={isOpen}
          onClose={() => {
            setIsopen(false);
            setIdItem("");
          }}
          title={id ? "Edit form" : "Add new item"}
          reloadData={() => getDataQuestionByTopic()}
          form={form}
        /> */}
      </div>
    </div>
  )
}

ListQuestionByTopic.propTypes = {}

export default ListQuestionByTopic