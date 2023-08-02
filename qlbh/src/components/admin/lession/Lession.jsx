import React, { useEffect } from 'react'
import DataTable from '../../shared/table/DataTable';
import { useParams } from 'react-router-dom';

const Lession = ({practicePartId}) => {

  let { id, name } = useParams();
    useEffect(() => {
      if(practicePartId) console.log(practicePartId)
    }, [practicePartId])
    

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
          title: "practicePartId",
          dataIndex: "practicePartId",
          key: "practicePartId",
          render: (text) => <a>{text}</a>,
        },
      ];

  return (
    <div>
        <DataTable 
            columns={columns}
            endpoint={`partLessons?practicePartId=${practicePartId ? practicePartId : id}`}
            onBack={true}
        />
    </div>
  )
}

Lession.propTypes = {}

export default Lession