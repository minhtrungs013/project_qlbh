import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import HeaderPage from '../../admin/category/HeaderPage'
import { getAllData } from '../../../api/service/api'

const DataTable = ({columns, title, onBack, endpoint}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);

    const onOpenModel = () => {
        setIsopen(true);
      };

      const getData = () => {
        setIsLoading(true)
        getAllData(`${endpoint}`).then((res) => {
          setData(res.data.data)
          setIsLoading(false)
        });
      };

      useEffect(() => {
        getData()
      },[])

  return (
    <div>
        <HeaderPage title={title} onBack={onBack} onCreate={() => onOpenModel()} />
        <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
    </div>
  )
}

DataTable.propTypes = {}

export default DataTable