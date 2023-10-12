import React, { useEffect, useState } from "react";
import { getDataById } from "../../../../api/service/api";
import { Button, Card, Col, Form, Row, Skeleton, Space } from "antd";
import HeaderPage from "../../category/HeaderPage";
import CreateAndEditModal from "./ModalOfSkills/CreateAndEditModal";
import { useCallback } from "react";
import iconPart from '../../../shared/Folder/Part.png'
import iconDot from '../../../shared/Folder/dot.png'
import Meta from "antd/es/card/Meta";
import './style.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setObjectId } from "../../../redux/_actions";
import { dataFakePartOfPractice } from "../../../../api/service/dataFake";

const PartOfPractice = (props) => {
  const { id } = props;
  const [dataPart, setDataPart] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [currentSite, setCurrentSite] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  
    const onclickShowListenStart = (data) => {
    dispatch(setObjectId(data.name))
    let arr = currentSite;
    arr.push(data.name);
    localStorage.setItem("breadcrumbs", JSON.stringify(arr));
}

  const onOpenModel = () => {
    setIsopen(true);
  };

  const handleSetDataFake = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setDataPart(dataFakePartOfPractice);
    }, 1000);
    if(dataPart.length){
      setIsLoading(false)
    }
  },[dataPart.length])

  useEffect(() => {
    handleSetDataFake();
    setTimeout(() => {
      setCurrentSite(JSON.parse(localStorage.getItem("breadcrumbs")))
    }, 1000);
    
  }, [handleSetDataFake]);

  const getPartOfPractice = () => {
    setIsLoading(true);
    getDataById(`practiceParts?practiceId=${id}`).then((res) => {
      setDataPart(res.data.data);
      setIsLoading(false);
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
                      <Meta title={item.name} className="card__meta" />
                      <Space size={"small"} className="card__btnOption">
                        <Button><b>Lession</b></Button>
                        <Button><b>Test</b></Button>
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
                        <img alt="example" width={10} height={10} src={`${iconDot}`}/>
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
