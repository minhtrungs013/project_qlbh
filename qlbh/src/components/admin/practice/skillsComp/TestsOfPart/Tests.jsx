import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Modal, Popover, Row, Space, Tag, message } from 'antd';
import HeaderPage from '../../../category/HeaderPage';
import Meta from 'antd/es/card/Meta';
import iconTest from '../../../../shared/Folder/test.png'
import iconDot from '../../../../shared/Folder/dot.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDataQuestions, setObjectId } from '../../../../redux/_actions';
import { useCallback } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteDataById, getDataById } from '../../../../../api/service/api';
import ModalTestsExam from './ModalTestsExam';
import { useMemo } from 'react';

const Tests = () => {

  const practicePartId = useSelector(state => state.practiceReducer.practicePartId);
  // const listTestsItem = useSelector(state => state.practiceReducer.listTestsItem);
  const [dataTest, setDataTest] = useState([])
  const dispatch = useDispatch();
  const [currentSite, setCurrentSite] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idItem, setIdItem] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [arrow, setArrow] = useState('Show');
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onOpenModel = () => {
    setIsopen(true);
  };

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        partId: record.partId,
        name: record.name,
        type: record.type,
        totalQuestions: record.totalQuestions,
        questions: record.questions
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
    deleteDataById(`tests?id=${value.id}`).then((res) => {
      message.success("DELETE SUCCESSFULLY");
      getDataTest();
    });
  };

  const getDataTest = useCallback(() => {
    setIsLoading(true);
    getDataById(`tests?part-id=${practicePartId}`).then((res) => {
      setDataTest(res.data.data);
      setIsLoading(false);
    });
    setIsLoading(false);
  },[practicePartId])

  useEffect(() => {
    getDataTest()
    setCurrentSite(JSON.parse(localStorage.getItem("breadcrumbs")))
  }, [getDataTest]);
  
  const handleClickTestItem = (item, index) => {
    dispatch(setObjectId(item.id))
    dispatch(setDataQuestions(item.questions))
    let arr = currentSite;
    arr.push(item.name);
    localStorage.setItem("breadcrumbs", JSON.stringify(arr));
    navigate('/question')
  }

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <div>
      <div className="main__application">
        <HeaderPage onCreate={() => onOpenModel()} />
        <div className="section-wrapper">
          <Row gutter={100} mt={10} style={{margin: "20px"}}>
            {dataTest?.map((item, index) => (
                <div className='card-test'>
                <Col span={4} key={index} onClick={() => handleClickTestItem(item, index)}>
                    <Card style={{ width: 200 }} className="card-item" cover={ <img alt="example" src={`${iconTest}`} /> } >
                      <Meta title={item.name} className="card__meta"/>
                    </Card>
                </Col>
                <Space className="card__vectorDot_test">
                <Popover placement="bottom" content={<div>
                    <Tag className="btn-edit" color="#2db7f5" onClick={() => onClickUpdate(item)}>Edit</Tag>
                    <Tag className="btn-delete" color="#f50" onClick={() => onClickDelete(item)}>Delete</Tag> </div>} arrow={mergedArrow}>
                    <img alt="example" width={10} height={10} src={`${iconDot}`}/>
                </Popover>
              </Space>
                </div>
            ))}
          </Row>
        </div>
        <ModalTestsExam
          isOpen={isOpen}
          partId={practicePartId}
          onClose={() => {
            setIsopen(false);
            setIdItem("");
          }}
          idItem={idItem}
          title={idItem ? "Edit form" : "Add new item"}
          reloadData={() => getDataTest()}
          form={form}
        />
      </div>
    </div>
  )
}

Tests.propTypes = {}

export default Tests