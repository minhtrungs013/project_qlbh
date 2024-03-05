import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import HeaderPage from "../category/HeaderPage";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import './partStyle.css'
import { dataFakePractice } from "../../../api/service/dataFake";
import axios from "axios";

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
    arr.push(e.name);
    localStorage.setItem("breadcrumbs", JSON.stringify(arr));
  };

  const upload = async (e) => {
    if (e.target.files) {
      let formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('files', e.target.files[i]);
      }
      console.log(formData);
      const res = await axios.post("http://192.168.227.96:5500/api/v1/accounts/upload", formData)
    }
  }

  return (
    <div className="main__application">
      <HeaderPage />

      <div className="section-wrapper">
        <input type="file" onChange={upload} placeholder="upload" style={{ display: 'block' }} multiple />
        <Row gutter={100} mt={10} style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
          {dataSkill?.map((item, index) => (
            <Col className="item-skill" span={5} key={index} onClick={() => handleSelect(item)}>
              <Link to={`/skill/${item.name}`}>
                <Card className="card-skill" cover={<img alt="example" src={item.imageURL} />} >
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
