import { faCaretLeft, faCaretRight, faLeftLong, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Radio, Row, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuestionsByVocabularyIds, sendVocabularyAnswers } from '../../../api/service/Question';
import "./question.css";

export default function Question({ listIdVocabularyId, checkShowQuestion }) {
    const [data, setData] = useState([])
    const userId = localStorage.getItem("userId");
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = useState();
    const [questionItem, setQuestionItem] = useState(0)
    const [listAnswers, setListAnswers] = useState([])

    const sendVocabularyAnswer = () => {
        const dataQuestionAnswers = {
            "userId": userId,
            "requestVocabularyAnswers": listAnswers
        }
        if (listAnswers.length !== data.length) {
            messageApi.open({
                type: 'warning',
                content: "You need to complete all the questions before submit!",
            });
            return
        }
        sendVocabularyAnswers(`vocabularyQuestions/sendVocabularyAnswers`, dataQuestionAnswers)
            .then((res) => {
                setListAnswers(res.data.data.vocabularyAnswers);
                messageApi.open({
                    type: 'success',
                    content: "Submit Successfully",
                });
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: "Contact admin for more information!",
                });
            });
    }

    const onChangeQuestionAnswer = (e, question) => {
        const answerIndex = listAnswers.findIndex((answer) => answer.questionId === question.id);

        if (answerIndex !== -1) {
            const updatedListAnswers = [...listAnswers];
            updatedListAnswers[answerIndex].userAnswer = e.target.value;
            setListAnswers(updatedListAnswers);
        } else {
            const answer = {
                questionId: question.id,
                userAnswer: e.target.value,
            };
            setListAnswers((prevListAnswers) => [...prevListAnswers, answer]);
        }

        setValue(e.target.value);
    };

    const checkAnswer = (idQuestion) => {
        const answer = listAnswers.find((answer) => answer.questionId === idQuestion);

        if (answer) {
            return setValue(answer.userAnswer);
        } else {
            setValue();
        }
    };

    const answerIscorrect = (value) => {
        const isCorrect = listAnswers[value]?.isCorrect;
        const isAnswered = listAnswers.length > 0;

        if (questionItem === value) {
            return "question__item action";
        } else if (isAnswered && isCorrect === undefined) {
            return "question__item";
        } else if (isAnswered && isCorrect) {
            return "question__item action_success";
        } else if (isAnswered && !isCorrect) {
            return "question__item action_fail";
        } else {
            return "question__item";
        }
    };

    const onClickQuestion = (idQuestion, value) => {
        setQuestionItem(value)
        checkAnswer(idQuestion)
    }

    const prvOrNext = (value, idQuestion) => {
        if (value === 0 && questionItem !== 0) {
            checkAnswer(idQuestion);
            setQuestionItem((prevQuestionItem) => prevQuestionItem - 1);
        } else if (value === 1 && questionItem + 1 < data.length) {
            checkAnswer(idQuestion);
            setQuestionItem((prevQuestionItem) => prevQuestionItem + 1);
        }
    };

    useEffect(() => {
        const getQuestionsByVocabularyId = () => {
            getQuestionsByVocabularyIds(`vocabularyQuestions`, listIdVocabularyId)
                .then((res) => {
                    const array = res.data.data;
                    array.sort(() => Math.random() - 0.5);
                    setData(res.data.data);
                });
        }
        getQuestionsByVocabularyId()
    }, [listIdVocabularyId]);

    return (
        <>
            {contextHolder}
            <Row gutter={1}>
                <Col span={20} offset={2} className=''>
                    <Row gutter={100}>
                        <Col span={6} className=''>
                            <div className='vocabulary__detail-left'>
                                <FontAwesomeIcon className='vocabulary__detail-icon' icon={faLeftLong}
                                    onClick={() => checkShowQuestion()} />
                                <h3>Question</h3>
                                <Row gutter={10} className='bbbb'>
                                    {data?.map((item, index) => (
                                        <Col span={4} className='' key={item.id}>
                                            <div className={answerIscorrect(index)}
                                                onClick={() => onClickQuestion(item.id, index)}>
                                                {index + 1}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <div className='checkQuantityCorrect'>
                                    <div> <FontAwesomeIcon className='faCircleCheck' icon={faCircleCheck} /> 5 Correct</div>
                                    <div> <FontAwesomeIcon className='faCircleXmark' icon={faCircleXmark} /> 5 Incorrect</div>
                                </div>
                            </div>
                        </Col>
                        <Col span={18} className=''>
                            <div className='question'>
                                <h2>Question {questionItem + 1}:
                                    <p>{data[questionItem]?.question} He ________ newspapers for ten years.
                                    </p>
                                </h2>
                                <Radio.Group onChange={(e) => onChangeQuestionAnswer(e, data[questionItem])} value={value}>
                                    <Space direction="vertical">
                                        <Radio value={data[questionItem]?.answers[0]} className=''>A. {data[questionItem]?.answers[0]}</Radio>
                                        <Radio value={data[questionItem]?.answers[1]} className=''>B. {data[questionItem]?.answers[1]}</Radio>
                                        <Radio value={data[questionItem]?.answers[2]} className=''>C. {data[questionItem]?.answers[2]}</Radio>
                                        <Radio value={data[questionItem]?.answers[3]} className=''>D. {data[questionItem]?.answers[3]}</Radio>
                                    </Space>
                                </Radio.Group>
                                {listAnswers[questionItem]?.correctAnswer !== undefined ? (
                                    <p className='correctAnswer'>The correct answer is:
                                        <p>{listAnswers[questionItem]?.correctAnswer}
                                        </p>
                                    </p>
                                ) : (<p></p>)}
                                <div className='question__action'>
                                    <button type="primary"
                                        size="large"
                                        disabled={questionItem === 0}
                                        className='question__button'
                                        onClick={() => prvOrNext(0, data[questionItem - 1]?.id)}>
                                        <FontAwesomeIcon className='faCaretLeft' icon={faCaretLeft} />
                                        Previous
                                    </button>
                                    {(questionItem + 1) === data.length ? (
                                        <button type="primary"
                                            size="large"
                                            disabled={listAnswers[questionItem]?.isCorrect !== undefined}
                                            className='question__button btn-submit'
                                            onClick={() => sendVocabularyAnswer()}>Submit</button>
                                    ) : (
                                        <button type="primary"
                                            size="large"
                                            className='question__button'
                                            onClick={() => prvOrNext(1, data[questionItem + 1]?.id)}>
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
        </>
    )
}
