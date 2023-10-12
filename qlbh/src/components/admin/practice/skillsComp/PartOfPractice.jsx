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

const dataFake = [
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: 'path 1',
    name: "Part 1: Name of Part 11",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 1",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: 'path 2',
    name: "Part 2: Name of Part 2",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 2",
  },
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: 'path 3',
    name: "Part 3: Name of Part 3",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 3",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: 'path 4',
    name: "Part 4: Name of Part 4",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 4",
  },
];

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
      setDataPart(dataFake);
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
          {isLoading ? dataFake?.map((item, index) => (
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
