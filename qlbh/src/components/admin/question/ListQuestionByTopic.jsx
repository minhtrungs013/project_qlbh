import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import HeaderPage from '../category/HeaderPage'
import { useParams } from 'react-router-dom';
import { getAllData } from '../../../api/service/api';
import { Table } from 'antd';

const ListQuestionByTopic = props => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);
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
          title: "Type",
          dataIndex: "type",
          key: "type",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Level",
          dataIndex: "level",
          key: "level",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Image",
          dataIndex: "images",
          key: "images",
          render: (imgUrl) => <img width={100} alt={imgUrl} src={imgUrl} />,
        },
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (_, record) => (
        //     <Space size="middle" style={{ cursor: "pointer" }}>
        //       <Tag color="green" onClick={() => onClickUpdate(record)}>
        //         Edit
        //       </Tag>
        //       <Tag color="volcano" onClick={() => onClickDelete(record)}>
        //         Delete
        //       </Tag>
        //       <Tag color="geekblue">
        //         <NavLink to={`/detail-question/${record.id /** replace id = testId */}`}>Detail</NavLink>
        //       </Tag>
        //     </Space>
        //   ),
        // },
      ];

      const onOpenModel = () => {
        setIsopen(true);
      };

    const getDataQuestionByTopic = () => {
        getAllData(`questions?objectTypeId=${id}`).then((res) => {
          setData(res.data.data)
        });
      };

      useEffect(() => {
        getDataQuestionByTopic()
      },[])

  return (
    <div>
      <div className="main__application">
        <HeaderPage title={`Question of ${name}`} onBack={true} onCreate={() => onOpenModel()} />
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        {/* <CreateAndEditModal
          isOpen={isOpen}
          practiceId={id}
          onClose={() => {
            setIsopen(false);
            setIdItem("");
          }}
          title={idItem ? "Edit form" : "Add new item"}
          reloadData={() => getPartOfPractice()}
          form={form}
        /> */}
      </div>
    </div>
  )
}

ListQuestionByTopic.propTypes = {}

export default ListQuestionByTopic