import React, { useEffect, useState } from 'react'
import { Form, Space, Table, Tag } from 'antd'
import HeaderPage from '../../admin/category/HeaderPage'
import { getAllData } from '../../../api/service/api'
import { useCallback } from 'react'

const DataTable = ({columns, title, onBack, endpoint, isEdit}) => {
    const [data, setData] = useState([])
    const [columnsTable, setColumnsTable] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);
    const [id, setId] = useState("");
    const [form] = Form.useForm();

    const onOpenModel = () => {
        setIsopen(true);
      };


      const onClickOpenModal = useCallback(
        (record = {}) => {      
          // const formControl = {
          //   id: record.id,
          //   name: record.name,
          //   type: record.type,
          //   image: record.image,
          // };
          // form.setFieldsValue(formControl);
          // console.log(formControl);
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

      const HandleAction = () => {
        let arrColumns = [];
        if(columns && isEdit) {
          let objAction = {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle" style={{ cursor: "pointer" }}>
                <Tag color="green" onClick={() => onClickUpdate(record)}>
                  Edit
                </Tag>
              </Space>
            ),
          }
          arrColumns.push(...columns, objAction)
          setColumnsTable(arrColumns);
        } else {
          setColumnsTable(columns)
        }
      }

      const getData = () => {
        setIsLoading(true)
        getAllData(`${endpoint}`).then((res) => {
          setData(res.data.data)
          setIsLoading(false)
        });
      };

      useEffect(() => {
        getData()
        HandleAction()
      },[])

  return (
    <div>
        <HeaderPage title={title} onBack={onBack} onCreate={() => onOpenModel()} />
        <Table columns={columnsTable} dataSource={data} rowKey={"id"} loading={isLoading} />
    </div>
  )
}

DataTable.propTypes = {}

export default DataTable