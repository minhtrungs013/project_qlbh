import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../shared/table/DataTable';
import { useParams } from 'react-router-dom';
import { Form, Modal, Space, Table, Tag, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteDataById, getAllData, getDataById } from '../../../api/service/api';
import HeaderPage from '../category/HeaderPage';
import ModalLession from './ModalLession';
import { async } from 'react-input-emoji';

const Lession = ({practicePartId}) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [form] = Form.useForm();
  const [ dataPart, setDataPart ] = useState("")

  let { id, partId } = useParams();


  const onOpenModel = () => {
    setIsopen(true);
  };

  const getPartById = () => {
    getDataById(`practiceParts?practiceId=${partId}`).then((res) => {
      setDataPart(res.data.data)
    });
  };

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        name: record.name,
        practicePartId: record.practicePartId
      };
      form.setFieldsValue(formControl);
      setIsopen(true);
    },
    [form]
  );

  const onClickUpdate = useCallback(
    (value) => {
      setIdItem(value.id);
      onClickOpenModal(value);
    },
    [onClickOpenModal]
  );

  const getAllDataLession = useCallback(() => {
    if(id) {
      setIsLoading(true)
    getAllData(`partLessons?practicePartId=${practicePartId ? practicePartId : id}`).then(async(res) => {
          const { data } = await getDataById(`practiceParts?practiceId=${partId}`)
          if(data.data){
            res.data.data.forEach((e, i, arr) => {
              arr[i]["partName"] =  data.data.filter(f => f.id === e.practicePartId)[0]
            });
          }
          setData(res.data.data);
          setIsLoading(false)      
    });
    }
  },[id]);

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
    deleteDataById(`partLessons?id=${value.id}`).then((res) => {
      message.success("SUCCESS");
      getAllDataLession();
    });
  };

  useEffect(() => {
    getAllDataLession();
  }, []);

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
          title: "Part",
          dataIndex: "partName",
          key: "partName",
          render: (text) => <a>{text.name}</a>,
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

  return (
    <div>
      <div className="main__application">
        <HeaderPage title="Lession" onCreate={() => onOpenModel()} onBack={true} />
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalLession
          isOpen={isOpen}
          onClose={() => {
            setIsopen(false);
            setIdItem("");
          }}
          partId={partId}
          title={idItem ? "Edit form" : "Add new item"}
          reloadData={() => getAllDataLession()}
          form={form}
        />
      </div>
        {/* <DataTable 
            columns={columns}
            endpoint={`partLessons?practicePartId=${practicePartId ? practicePartId : id}`}
            onBack={true}
            isEdit={true}
        /> */}
    </div>
  )
}

Lession.propTypes = {}

export default Lession