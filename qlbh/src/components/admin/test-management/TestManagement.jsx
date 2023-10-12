import React, { useCallback, useEffect, useState } from 'react'
import HeaderPage from '../category/HeaderPage'
import { Col, Row } from 'antd'
import Folder from '../../shared/Folder/Folder'
import iconExam from '../../shared/Folder/Exam.png'
import { Link } from 'react-router-dom'
const dataFake = [
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "listening",
    name: "Exam",
    image:
      "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Exam 1",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "reading",
    name: "Exam",
    image:
      "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Exam 2",
  },
  {
    id: "e01d2fb4-5aa1-467e-becb-5f497aee04fa",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "speaking",
    name: "Exam",
    image:
      "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Exam 3",
  },
  {
    id: "8d048a47-15ba-42cb-8798-468396e52fac",
    practiceId: "e3e65aea-049a-495c-8489-e2a685fd7ab3",
    path: "writing",
    name: "Exam",
    image:
      "https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.jpg?b=1&s=612x612&w=0&k=20&c=QFWZyHoAvAvcUz8tCHi4WufJEke-G1TFJO-KfZu7ErQ=",
    description: "Exam 4",
  },
];

const TestManagement = props => {

  const [dataSkill, setDataSkill] = useState([]);

  const handleSetDataFake = useCallback(() => {
    setDataSkill(dataFake);
  },[])

  useEffect(() => {
    handleSetDataFake();
  }, [handleSetDataFake]);

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