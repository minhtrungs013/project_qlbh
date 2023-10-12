import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Space } from 'antd';
import HeaderPage from '../../../category/HeaderPage';
import Meta from 'antd/es/card/Meta';
import iconTest from '../../../../shared/Folder/test.png'
import iconDot from '../../../../shared/Folder/dot.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataFakeTest } from '../../../../../api/service/dataFake';

const Tests = () => {

  const practiceId = useSelector(state => state.practiceReducer.objectTypeId);
  const [dataTest, setDataTest] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    setDataTest(dataFakeTest)
  }, [practiceId]);
  
  const handleClickTestItem = (item, index) => {
    navigate('/question')
  }

  return (
    <div>
      <div className="main__application">
        <HeaderPage />
        <div className="section-wrapper">
          <Row gutter={100} mt={10} style={{margin: "20px"}}>
            {dataTest?.map((item, index) => (
                <Col span={4} key={index} onClick={() => handleClickTestItem(item, index)}>
                    <Card style={{ width: 200 }} className="card-item" cover={ <img alt="example" src={`${iconTest}`} /> } >
                      <Meta title={item.name} className="card__meta"/>
                      <Space className="card__vectorDot">
                        <img alt="example" width={10} height={10} src={`${iconDot}`}/>
                      </Space> 
                    </Card>
                </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

Tests.propTypes = {}

export default Tests