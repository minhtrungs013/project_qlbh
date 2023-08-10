import { faBook, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllVocabularyCategory } from '../../../api/service/VocabularyCategory';
import VocabularyDetailUser from '../vocabularyDetailUser/vocabularyDetailUser';
import { useDispatch } from 'react-redux';
import { setPracticeType } from '../../redux/_actions';
import "./homeUser.css";
import test from "../../../asset/p1_test02/test2_6.png"
import test1 from "../../../asset/p3_test1/p3_test1_1-2-3.mp3"

export default function VocabularyUser() {
  const [data, setData] = useState([])
  const [showVocabularyDetail, setShowVocabularyDetail] = useState(false)
  const [vocabularyDetailId, setVocabularyDetailId] = useState(null)
  const dispatch = useDispatch();

  console.log(test1);

  const showVocabulary = (idvocabulary) => {
    setShowVocabularyDetail(!showVocabularyDetail)
    setVocabularyDetailId(idvocabulary)
    dispatch(setPracticeType('vocabulary'));

  }

  useEffect(() => {
    const getVocabylaryCategory = () => {
      getAllVocabularyCategory(`vocabularyCategories`)
        .then((res) => {
          setData(res.data.data);
        }).catch((Error) => {
          console.log(Error)
        })
    }
    getVocabylaryCategory()
  }, []);

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
                  <Col span={8} className='' key={item.id}>
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
