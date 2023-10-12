import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import HeaderPage from "../category/HeaderPage";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import './partStyle.css'
import { dataFakePractice } from "../../../api/service/dataFake";

const Practice = (props) => {
  const [dataSkill, setDataSkill] = useState([]);

  const handleSetDataFake = useCallback(() => {
    setDataSkill(dataFakePractice);
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
