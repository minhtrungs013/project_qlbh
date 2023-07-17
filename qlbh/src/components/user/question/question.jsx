import { faLeftLong, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuestionsByVocabularyIds } from '../../../api/service/Question';
import "./question.css";

export default function Question({ listIdVocabularyId }) {
    const [data, setData] = useState([])
    const userId = localStorage.getItem("userId");

    const [value, setValue] = useState();
    const [questionItem, setQuestionItem] = useState(0)

    const [listAnswers, setListAnswers] = useState([])


    const getVocabylaryCategory = () => {
        getQuestionsByVocabularyIds(`vocabularyQuestions`, listIdVocabularyId)
            .then((res) => {
                setData(res.data.data);
                // setQuestionItem(res.data.data[0])
            });
    }

    const onChangeQuestionAnswer = (e, question) => {
        let answersQuestion = {
            questionId: "",
            userAnswer: ""
          }
        console.log('radio checked', e.target.value, question);
        answersQuestion.questionId = question.id
        answersQuestion.userAnswer =  e.target.value
        setListAnswers([...listAnswers, answersQuestion])

    };


    useEffect(() => {
        getVocabylaryCategory()
    }, [listIdVocabularyId]);

    const onClickQuestion = (value) => {
        setQuestionItem(value)
        
    }

    const prvOrNext = (value) => {
        if (value === 0 && questionItem !== 0) {
            setQuestionItem(questionItem - 1)
        } else if (value === 1 && (questionItem + 1) < data.length) {
            setValue('')
            setQuestionItem(questionItem + 1)
        }
    }

    return (
        <Row gutter={1}>
            <Col span={20} offset={2} className=''>
                <Row gutter={100}>
                    <Col span={6} className=''>
                        <div className='vocabulary__detail-left'>
                            <FontAwesomeIcon className='vocabulary__detail-icon' icon={faLeftLong} />
                            <h3>Question</h3>
                            <Row gutter={10} className='bbbb'>
                                {data?.map((item, index) => (
                                    <Col span={4} className=''>
                                        <div className={questionItem === index ? "question__item action" : "question__item"} onClick={() => onClickQuestion(index)}>
                                            {index + 1}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                    <Col span={18} className=''>
                        <div className='question'>
                            <h2>Question {questionItem + 1}:  <p>   {data[questionItem]?.question} He ________ newspapers for ten years.</p></h2>
                            <Radio.Group onChange={(e) => onChangeQuestionAnswer(e, data[questionItem])} >
                                <Space direction="vertical">
                                    <Radio value={data[questionItem]?.answers[0]}>A. {data[questionItem]?.answers[0]}</Radio>
                                    <Radio value={data[questionItem]?.answers[1]}>B. {data[questionItem]?.answers[1]}</Radio>
                                    <Radio value={data[questionItem]?.answers[2]}>C. {data[questionItem]?.answers[2]}</Radio>
                                    <Radio value={data[questionItem]?.answers[3]}>D. {data[questionItem]?.answers[3]}</Radio>
                                </Space>
                            </Radio.Group>
                            <div className='question__action'>
                                <button type="primary" size="large" disabled={questionItem === 0} className='question__button' onClick={() => prvOrNext(0)}>
                                    <FontAwesomeIcon className='faCaretLeft' icon={faCaretLeft} />
                                    Previous
                                </button>
                                {(questionItem + 1) === data.length ? (
                                    <button type="primary" size="large" className='question__button btn-submit' onClick={() => prvOrNext(1)}>Submit</button>
                                ) : (
                                    <button type="primary" size="large" className='question__button' onClick={() => prvOrNext(1)}>
                                        Next
                                        <FontAwesomeIcon className='faCaretRight' icon={faCaretRight} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
