import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { deleteDataById, getDataById } from '../../../../../api/service/api';
import { Button, Form, Modal, Space, Table, Tag, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HeaderPage from '../../../category/HeaderPage';
import ModalTestsExam from './ModalTestsExam';
import ProgressBar from '../../../../shared/ProgressBar/ProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import { setObjectId } from '../../../../redux/_actions';

const Tests = () => {

  const practiceId = useSelector(state => state.practiceReducer.practicePartId);
  const practiceType = useSelector(state => state.practiceReducer.practiceType);
  const [dataTest, setDataTest] = useState([])
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onclickShowListenStart = (data) => {
    dispatch(setObjectId(data.id))
}

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "20%",
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
      width: "30%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "30%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle" style={{ cursor: "pointer" }}>
          <Tag color="green" onClick={() => onClickUpdate(record)}>
            Edit
          </Tag>
          <Tag color="volcano" onClick={() => onClickDelete(record)}>
            Delete
          </Tag>
          <Tag color="geekblue">
            <NavLink to={`/practice/skill/question`} onClick={()=> onclickShowListenStart(record)}>Question</NavLink>
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
        practicePartId: record.practicePartId,
        name: record.name,
        type: record.type,
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
    deleteDataById(`partTests?id=${value.id}`).then((res) => {
      message.success("DELETE SUCCESSFULLY");
      getTestById();
    });
  };

  const getTestById = () => {
    if (practiceId) {
      setLoading(true);
      getDataById(`partTests?userId=8fd15fce-57b9-404b-962c-d04faee931dc&practicePartId=${practiceId}`).then((result) => {
        setDataTest(result.data.data);
        setLoading(false);
      });

    }
  };

  useEffect(() => {
    getTestById();
  }, []);

  return (
    <div>
      <div className="main__application">
        <HeaderPage title={`Test of ${practiceType}`} onCreate={() => onOpenModel()} onBack={true} />
        {/* <ProgressBar title={`Test of ${name}`} onBack={true}/> */}
        <div className="section-wrapper">
          <Table columns={columns} dataSource={dataTest} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalTestsExam
          isOpen={isOpen}
          partId={""}
          onClose={() => {
            setIsopen(false);
            setIdItem("");
          }}
          idItem={idItem}
          title={idItem ? "Edit form" : "Add new item"}
          reloadData={() => getTestById()}
          form={form}
        />
      </div>
    </div>
  )
}

Tests.propTypes = {}

export default Tests