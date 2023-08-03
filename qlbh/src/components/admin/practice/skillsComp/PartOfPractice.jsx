import React, { useCallback, useEffect, useState } from 'react'
import { deleteDataById, getDataById } from '../../../../api/service/api'
import { Form, Modal, Space, Table, Tag, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HeaderPage from '../../category/HeaderPage';
import CreateAndEditModal from './ModalOfSkills/CreateAndEditModal';
import ProgressBar from '../../../shared/ProgressBar/ProgressBar';

const PartOfPractice = (props) => {
  const { id, type } = props;
  const [dataPart, setDataPart] = useState([])
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idItem, setIdItem] = useState("");
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: '40%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
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
            <NavLink to={`/${type}/${record.id}/${record.name}/test`}>Test</NavLink>
          </Tag>
          <Tag color="green">
            <NavLink to={`/${type}/${id}/${record.id}/${record.name}/lession`}>Lession</NavLink>
          </Tag>
        </Space>
      ),
    },
  ];
  const onOpenModel = () => {
    setIsopen(true);
  };

  

  useEffect(() => {
    if(id){
      getPartOfPractice()
    }
  }, [id])
  
  const getPartOfPractice = () => {
    setIsLoading(true)
    getDataById(`practiceParts?practiceId=${id}`).then((res) => {
      setDataPart(res.data.data)
      setIsLoading(false)
    })
  }

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        practiceId: record.practiceId,
        name: record.name,
        description: record.description,
        image: record.image,
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

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Delete this item?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (value) => {
    deleteDataById(`practiceParts?id=${value.id}`).then((res) => {
      message.success("DELETE SUCCESSFULLY");
      getPartOfPractice();
    });
  };


  return (
    <div>
      <div className="main__application">
        <HeaderPage title={`Part of ${type}`} onCreate={() => onOpenModel()} />
        {/* <ProgressBar title={`Part ${type}`}/> */}
        <div className="section-wrapper">
          <Table columns={columns} dataSource={dataPart} rowKey={"id"} loading={isLoading} />
        </div>
        <CreateAndEditModal
          isOpen={isOpen}
          practiceId={id}
          onClose={() => {
            setIsopen(false);
            setIdItem("");
          }}
          title={idItem ? "Edit form" : "Add new item"}
          reloadData={() => getPartOfPractice()}
          form={form}
        />
      </div>
    </div>
  )
}

PartOfPractice.propTypes = {}

export default PartOfPractice