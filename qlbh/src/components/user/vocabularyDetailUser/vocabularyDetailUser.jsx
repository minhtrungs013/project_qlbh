import { faLeftLong, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { getVocabylaryByCategoryId } from '../../../api/service/VocabularyService';
import "./vocabularyDetailUser.css";

export default function VocabularyDetailUser({ vocabularyDetailId, showVocabulary }) {
  const [data, setData] = useState([])
  const [voice, setVoice] = useState([]);

  const getVocabylaryCategory = () => {
    getVocabylaryByCategoryId(`vocabularies/getByCategoryId?categoryId=${vocabularyDetailId}`)
      .then((res) => {
        setData(res.data.data);
      });
  }

  const speakerVocabulary = (value) => {
    
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.voice = voice;
    utterance.rate = 0.8;
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance);
  }



  useEffect(() => {
    const Voice = window.speechSynthesis.getVoices().find(voice => voice.name === "Google US English");
    setVoice(Voice)
    getVocabylaryCategory()
  }, [vocabularyDetailId]);
  
  return (

    <Row gutter={1}>
      <Col span={20} offset={2} className=''>
        <Row gutter={100}>
          <Col span={6} className=''>
            <div className='vocabulary__detail-left'>
              <FontAwesomeIcon className='vocabulary__detail-icon' icon={faLeftLong} onClick={() => showVocabulary()} />
              <h3>Constants</h3>
              <h1>0/10</h1>
              <h2>Results</h2>
            </div>
          </Col>
          <Col span={18} className=''>
            <div className='vocabulary__detail-right'>
              <Row gutter={24} justify={"space-between"} style={{ padding: "6vh 6ch" }}>
                {data?.map((item) => (
                  <Col span={5}  >
                    <div className='vocabulary__item-body'>
                      <FontAwesomeIcon className='vocabulary__item-body-icon' icon={faVolumeHigh} onClick={() => speakerVocabulary(item.word)} />
                      <h2>{item.word}</h2>
                      <h4>{item.pronounce === null ? "..." : item.pronounce}</h4>
                      <h3>{item.mean}</h3>
                    </div>
                  </Col>
                ))}
              </Row>
              <button type="primary" size="large" className='vocabulary__button'>Play Game</button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
