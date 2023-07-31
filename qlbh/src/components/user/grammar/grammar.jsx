import { faRightLong, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllVocabularyCategory } from '../../../api/service/VocabularyCategory';
import "./grammar.css";

export default function Grammar() {
  const [data, setData] = useState([])
  const getVocabylaryCategory = () => {
    getAllVocabularyCategory(`vocabularyCategories`)
      .then((res) => {
        setData(res.data.data);

      });
  }
  useEffect(() => {
    getVocabylaryCategory()
  }, []);



  return (
    <div className='grammar'>
      <div className='grammar__heading'>
        <div className='grammar__deading'>
          <FontAwesomeIcon className='grammar__item-icon' icon={faSpellCheck} />
          <h3 className='grammar__deading-text'>Grammar</h3>
        </div>
        <div className='grammar__create'>
        </div>
      </div>
      <div>
        <Row gutter={1}>
          <Col span={16} offset={4} className=''>
            <Row gutter={24}>
              {data?.map((item) => (
                <Col span={8}  className=''>
                  <Link to="/bocabularydetails" className='grammar__body-item'>
                    <h3>
                      <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                      {item.name}
                    </h3>
                    <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
