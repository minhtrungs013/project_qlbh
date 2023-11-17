import React, { useEffect, useMemo, useState } from "react";
import { deleteDataById, getDataById } from "../../../../api/service/api";
import { Button, Card, Col, Form, Modal, Popover, Row, Skeleton, Space, Tag, message } from "antd";
import HeaderPage from "../../category/HeaderPage";
import CreateAndEditModal from "./ModalOfSkills/CreateAndEditModal";
import { useCallback } from "react";
import iconPart from '../../../shared/Folder/Part.png'
import iconDot from '../../../shared/Folder/dot.png'
import Meta from "antd/es/card/Meta";
import './style.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataTests, setPracticePartId } from "../../../redux/_actions";
import { dataFakePartOfPractice } from "../../../../api/service/dataFake";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const PartOfPractice = (props) => {
  const { id } = props;
  const [dataPart, setDataPart] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [currentSite, setCurrentSite] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [arrow, setArrow] = useState('Show');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  
    const onclickShowListenStart = (data) => {
      dispatch(setPracticePartId(data.id))
      dispatch(setDataTests(data.tests))
      let arr = currentSite;
      arr.push(data.name);
      localStorage.setItem("breadcrumbs", JSON.stringify(arr));
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

  const onOpenModel = () => {
    setIsopen(true);
  };

  const getPartOfPractice = useCallback(() => {
    setIsLoading(true);
    getDataById(`parts?practice-id=${id}`).then((res) => {
      setDataPart(res.data.data);
      setIsLoading(false);
    });
  },[id]);

  useEffect(() => {
    setCurrentSite(JSON.parse(localStorage.getItem("breadcrumbs")))
    if(id){
      getPartOfPractice();
    }
  }, [getPartOfPractice, id]);

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
    deleteDataById(`parts?id=${value.id}`).then((res) => {
      message.success("DELETE SUCCESSFULLY");
      getPartOfPractice();
    });
  };


  return (
    <div>
      <div className="main__application">
        <HeaderPage onCreate={() => onOpenModel()} />
        <div className="section-wrapper">

          <Row gutter={100} mt={10} style={{margin: "20px"}}>
          {isLoading ? dataFakePartOfPractice?.map((item, index) => (
                <Col span={4} key={index}>
                    <Card style={{ width: 200 }} className="card-item" cover={ isLoading ? <Skeleton.Image style={{width: "180px", height: "180px"}} active={isLoading} /> : <img
                    alt="example"
                    src={`${iconPart}`} />} >
                      <Meta  className="card__meta" />
                      <Space size={"small"} className="card__btnOption">
                        {/* <Button><b>Lession</b></Button>
                        <Button><b>Test</b></Button> */}
                      </Space>
                    </Card>
                </Col>
            )) : dataPart?.map((item, index) => (
                <Col span={4} key={index}>
                    <Card style={{ width: 200 }} className="card-item" cover={ <img alt="example" src={`${iconPart}`} /> } >
                      <Meta title={item.name} className="card__meta"/>
                      <Space size={"small"} className="card__btnOption">
                        <Button><b>Lession</b></Button>
                        <Link onClick={() => onclickShowListenStart(item)} to={`/skill/${currentSite}/test`}>
                          <Button><b>Test</b></Button>
                        </Link>
                      </Space>
                      <Space className="card__vectorDot">
                        <Popover placement="bottom" content={<div>
                            <Tag className="btn-edit" color="#2db7f5" onClick={() => onClickUpdate(item)}>Edit</Tag>
                            <Tag className="btn-delete" color="#f50" onClick={() => onClickDelete(item)}>Delete</Tag> </div>} arrow={mergedArrow}>
                            <img alt="example" width={10} height={10} src={`${iconDot}`}/>
                        </Popover>
                      </Space> 
                    </Card>
                </Col>
            ))}  
          </Row>
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
  );
};

PartOfPractice.propTypes = {};

export default PartOfPractice;
