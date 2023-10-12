import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import HeaderPage from "../category/HeaderPage";
import { Link } from "react-router-dom";
import iconListening from "../../shared/Folder/listening.png";
import iconReading from "../../shared/Folder/reading.png";
import iconWriting from "../../shared/Folder/writing.png";
import iconSpeaking from "../../shared/Folder/speaking.png";
import Meta from "antd/es/card/Meta";
import './partStyle.css'

const dataFake = [
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "listening",
    name: "Listening",
    image: iconListening,
    description: "Listening 1",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "reading",
    name: "Reading",
    image: iconReading,
    description: "Reading 2",
  },
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "speaking",
    name: "Speaking",
    image: iconWriting,
    description: "Speaking 3",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "writing",
    name: "Writing",
    image: iconSpeaking,
    description: "Writing 4",
  },
];

const Practice = (props) => {
  const [dataSkill, setDataSkill] = useState([]);

  const handleSetDataFake = useCallback(() => {
    setDataSkill(dataFake);
  }, []);

  useEffect(() => {
    handleSetDataFake();
  }, [handleSetDataFake]);

  const handleSelect = (e) => {
    let arr = [];
    arr.push(e.path);
    localStorage.setItem("breadcrumbs", JSON.stringify(arr));
  };

  return (
    <div className="main__application">
      <HeaderPage />
      <div className="section-wrapper">
        <Row gutter={100} mt={10} style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
          {dataSkill?.map((item, index) => (
            <Col className="item-skill" span={5} key={index} onClick={() => handleSelect(item)}>
              <Link to={`/skill/${item.path}`}>
                <Card className="card-skill" cover={ <img alt="example" src={item.image} /> } >
                  <Meta title={item.name} description={item.description} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

Practice.propTypes = {};

export default Practice;
