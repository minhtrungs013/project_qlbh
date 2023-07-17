import { faLeftLong, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuestionsByVocabularyIds , sendVocabularyAnswers } from '../../../api/service/Question';
import "./question.css";
import { async } from 'react-input-emoji';

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
            });
    }

    const sendVocabularyAnswers = () => {
        const data = {
            "userId": userId,
            "requestVocabularyAnswers": listAnswers
        }
        sendVocabularyAnswers(`vocabularyQuestions/sendVocabularyAnswers`, data)
            .then((res) => {
               console.log(res);
            })
            
    }

    const onChangeQuestionAnswer = (e, question) => {
        let answersQuestion = {
            questionId: "",
            userAnswer: ""
        }
        answersQuestion.questionId = question.id
        answersQuestion.userAnswer = e.target.value
        setListAnswers([...listAnswers, answersQuestion])
        setValue(e.target.value)
    };

    const checkAnswer = (idQuestion) => {
        if (listAnswers.length > 0) {
            for (let i = 0; i < listAnswers.length; i++) {
                if (idQuestion === listAnswers[i].questionId) {
                 return  setValue(listAnswers[i].userAnswer)

                }
            }
            return setValue()

        } else {
            console.log(idQuestion);
            setValue()
        }
    }

    const onClickQuestion = (idQuestion, value) => {
        setQuestionItem(value)
        checkAnswer(idQuestion)
    }

    const prvOrNext = (value, idQuestion) => {
        if (value === 0 && questionItem !== 0) {
            checkAnswer(idQuestion)
            setQuestionItem(questionItem - 1)
        } else if (value === 1 && (questionItem + 1) < data.length) {
            checkAnswer(idQuestion)
            setQuestionItem(questionItem + 1)

        }
    }

    useEffect(() => {
        getVocabylaryCategory()
    }, [listIdVocabularyId]);


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
                                        <div className={questionItem === index ? "question__item action" : "question__item"} onClick={() => onClickQuestion(item.id, index)}>
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
                            <Radio.Group onChange={(e) => onChangeQuestionAnswer(e, data[questionItem])} value={value}>
                                <Space direction="vertical">
                                    <Radio value={data[questionItem]?.answers[0]}>A. {data[questionItem]?.answers[0]}</Radio>
                                    <Radio value={data[questionItem]?.answers[1]}>B. {data[questionItem]?.answers[1]}</Radio>
                                    <Radio value={data[questionItem]?.answers[2]}>C. {data[questionItem]?.answers[2]}</Radio>
                                    <Radio value={data[questionItem]?.answers[3]}>D. {data[questionItem]?.answers[3]}</Radio>
                                </Space>
                            </Radio.Group>
                            <div className='question__action'>
                                <button type="primary" size="large" disabled={questionItem === 0} className='question__button' onClick={() => prvOrNext(0, data[questionItem - 1]?.id)}>
                                    <FontAwesomeIcon className='faCaretLeft' icon={faCaretLeft} />
                                    Previous
                                </button>
                                {(questionItem + 1) === data.length ? (
                                    <button type="primary" size="large" className='question__button btn-submit' onClick={() => sendVocabularyAnswers()}>Submit</button>
                                ) : (
                                    <button type="primary" size="large" className='question__button' onClick={() => prvOrNext(1, data[questionItem + 1]?.id)}>
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
