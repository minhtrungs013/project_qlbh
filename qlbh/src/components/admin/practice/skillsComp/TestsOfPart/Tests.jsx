import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Space } from 'antd';
import HeaderPage from '../../../category/HeaderPage';
import Meta from 'antd/es/card/Meta';
import iconTest from '../../../../shared/Folder/test.png'
import iconDot from '../../../../shared/Folder/dot.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const dataFake = [
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    name: "Test 1: Name of Test 11",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 1",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    name: "Test 2: Name of Test 2",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 2",
  },
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    name: "Test 3: Name of Test 3",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 3",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    name: "Test 4: Name of Test 4",
    image: "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Description 4",
  },
];

const Tests = () => {

  const practiceId = useSelector(state => state.practiceReducer.objectTypeId);
  const [dataTest, setDataTest] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    setDataTest(dataFake)
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