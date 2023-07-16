import React, { useState, useEffect } from 'react';
import "./homeUser.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'antd';
import { getAllVocabularyCategory } from '../../../api/service/VocabularyCategory';
import VocabularyDetailUser from '../vocabularyDetailUser/vocabularyDetailUser';

export default function VocabularyUser() {
  const [data, setData] = useState([])
  const [showVocabularyDetail, setShowVocabularyDetail] = useState(false)
  const [vocabularyDetailId, setVocabularyDetailId] = useState(null)


  const getVocabylaryCategory = () => {
    getAllVocabularyCategory(`vocabularyCategories`)
      .then((res) => {
        setData(res.data.data);
      });
  }
  useEffect(() => {
    getVocabylaryCategory()
  }, []);

  const showVocabulary = (idvocabulary) => {
    setShowVocabularyDetail(!showVocabularyDetail)
    setVocabularyDetailId(idvocabulary)
  }

  return (
    <div className='vocabulary'>
      <div className='vocabulary__heading'>
        <div className='vocabulary__deading'>
          <FontAwesomeIcon className='vocabulary__item-icon' icon={faBook} />
          <h3 className='vocabulary__deading-text'>Vocabulary</h3>
        </div>
        <div className='vocabulary__create'>
        </div>
      </div>
      <div>
        {!showVocabularyDetail ? (
          <Row gutter={1}>
            <Col span={16} offset={4} className=''>
              <Row gutter={24}>
                {data?.map((item) => (
                  <Col span={8} className=''>
                    <div onClick={() => showVocabulary(item.id)} className='vocabulary__body-item'>
                      <h3>
                        <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                        {item.name}
                      </h3>
                      <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>) : (
          <VocabularyDetailUser vocabularyDetailId={vocabularyDetailId} showVocabulary={showVocabulary}> </VocabularyDetailUser>
        )}
      </div >
    </div >
  )
}
