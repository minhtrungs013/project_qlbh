import React, { useEffect, useState } from 'react'
import {  Route, Routes, useLocation  } from "react-router-dom";
import { Col, Row } from 'antd';
import Navbar from './navbar/navbar';
import Product from './product/product';
import Home from './home/home';
import './admin.css';
import Chat from './chat/chat';
import Category from './category/category';
import Vocabulary from './vocabulary/vocabulary';
import Practice from './practice/practice';
import Question from './question/question';
import NavigationNew from './navigation/NavigationNew';
import DetailQuestion from './question/DetailQuestion';
import PartOfPractice from './practice/skillsComp/PartOfPractice';
import { getAllData } from '../../api/service/api';
import Tests from './practice/skillsComp/TestsOfPart/Tests';
import ListQuestionByTopic from './question/ListQuestionByTopic';
import Lession from './lession/Lession';
import TestManagement from './test-management/TestManagement';




export default function Admin() {
  const [checkNavigate, setCheckNavigate] = useState(false)
  const [dataPractice, setDataPractice] = useState([])
  let { pathname } = useLocation();
  const token = localStorage.getItem('token')

  function handleClick() {
    if (checkNavigate === false) {
      setCheckNavigate(true)
    } else {
      setCheckNavigate(false)

    }
  }


  const getDataPractice = () => {
    getAllData(`practices`).then((res) => {
        if(res){
          setDataPractice(res.data.data);
        }
    });
  };

  useEffect(() => {
    if(token){
      getDataPractice()
    }
  }, [token])
  

  return (
    <Row gutter={1}>
      <Col span={checkNavigate ? 1 : 3} className='name'>
        {/* <Navigation check={checkNavigate} selectedKeys={pathname + '-key'}></Navigation> */}
        <NavigationNew check={checkNavigate} selectedKeys={pathname + '-key'}></NavigationNew>
      </Col>
      <Col span={checkNavigate ? 23 : 21} className='name1'>
        <Navbar onClick={handleClick} ></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/product" element={<Product />} />
        </Routes>

        {/* <Routes>
          <Route path="/practice" element={<Practice />} />
        </Routes> */}
          {/* SubMenu Practice */}
          <Routes>
            <Route path="/skill/listening" element={<PartOfPractice id={dataPractice.filter(f=>f.type === "listen")[0]?.id} type={"listening"} />} />
          </Routes>
          <Routes>
            <Route path="/skill/reading" element={<PartOfPractice id={dataPractice.filter(f=>f.type === "read")[0]?.id} type={"reading"} />} />
          </Routes>
          <Routes>
            <Route path="/skill/speaking" element={<PartOfPractice id={dataPractice.filter(f=>f.type === "speak")[0]?.id} type={"speaking"} />} />
          </Routes>
          <Routes>
            <Route path="/skill/writing" element={<PartOfPractice id={dataPractice.filter(f=>f.type === "write")[0]?.id} type={"writing"} />} />
          </Routes>
          {/* SubMenu Practice */}
         
          {/* Route to Test of Part */}

          <Routes>
            <Route path={`/skill`} element={<Practice/>}/>
          </Routes>

          <Routes>
            <Route path={`/skill/:currentSite/test`} element={<Tests/>}/>
          </Routes>
          <Routes>
            <Route path={`/skill/lession`} element={<Lession/>}/>
          </Routes>
          <Routes>
            <Route path={`/reading/:id/:name/test`} element={<Tests/>}/>
          </Routes>
          <Routes>
            <Route path={`/reading/:partId/:id/:name/lession`} element={<Tests/>}/>
          </Routes>
          <Routes>
            <Route path={`/speaking/:id/:name/test`} element={<Tests/>}/>
          </Routes>
          <Routes>
            <Route path={`/speaking/:partId/:id/:name/lession`} element={<Tests/>}/>
          </Routes>
          <Routes>
            <Route path={`/writing/:id/:name/test`} element={<Tests/>}/>
          </Routes>
          <Routes>
            <Route path={`/writing/:partId/:id/:name/lession`} element={<Tests/>}/>
          </Routes>

          {/* Route to Test of Part */}

          {/* Route to Question follow topic */}
          <Routes>
            <Route path={`/practice/skill/question`} element={<ListQuestionByTopic />}/>
          </Routes>

        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Routes>
          <Route path="/category" element={<Category />} />
        </Routes>
        <Routes>
          <Route path="/vocabulary" element={<Vocabulary/>}/>
        </Routes>
        <Routes>
          <Route path="/question" element={<Question/>}/>
        </Routes>
        <Routes>
          <Route path="/lession" element={<Lession />} />
        </Routes>
        <Routes>
          <Route path={`/practice/skill/question/details`} element={<DetailQuestion/>}/>
        </Routes>
        <Routes>
          <Route path="/exam" element={<TestManagement/>}/>
        </Routes>
      </Col>
    </Row>
  )
}
