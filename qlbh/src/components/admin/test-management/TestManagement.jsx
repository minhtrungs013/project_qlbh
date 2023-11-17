import React, { useCallback, useEffect, useState } from 'react'
import HeaderPage from '../category/HeaderPage'
import { Col, Row } from 'antd'
import Folder from '../../shared/Folder/Folder'
import iconExam from '../../shared/Folder/Exam.png'
import { Link } from 'react-router-dom'
// import { dataFakeTestManagement } from '../../../api/service/dataFake'
import { getAllData } from '../../../api/service/api/index';


const TestManagement = props => {

  const [dataSkill, setDataSkill] = useState([]);

  // const handleSetDataFake = useCallback(() => {
  //   setDataSkill(dataFakeTestManagement);
  // },[])

  const getDataTest = useCallback(() => {
    getAllData(`tests?page=1&size=10`).then((res) => {
      if(res){
        setDataSkill(res.data.data);
      }
  });
  },[])

  useEffect(() => {
    getDataTest();
  }, [getDataTest]);

  const handleSelect = (e) => {
    let arr = [];
    arr.push(e.path)
    localStorage.setItem('breadcrumbs', JSON.stringify(arr));
  }

  return (
    <div className="main__application">
      <HeaderPage />
      <div className="section-wrapper">

          <Row gutter={100} mt={10} style={{margin: "20px"}}>
          {dataSkill?.map((item, index) => (
                <Col span={4} key={index} onClick={() => handleSelect(item)}>
                  <Link to={`/skill/${item.path}`}>
                    <Folder lableName={item.name} url={`${iconExam}`} />
                  </Link>
                </Col>
            ))}  
          </Row>
        </div>
    </div>
  )
}

TestManagement.propTypes = {}

export default TestManagement