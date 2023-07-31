import { faCaretLeft, faCaretRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Radio, Row, Space, message, Spin } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { sendVocabularyAnswers, GetQuestionsByObjectTypeId } from '../../../api/service/Question';
import { useSelector } from 'react-redux';
import ListenStart from '../practice/practiceQuestion/listenStart';
import "./question.css";

export default function Question() {
    const [data, setData] = useState([])
    const audioPlayerRef = useRef(null);
    const userId = localStorage.getItem("userId");
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = useState(null);
    const [questionItem, setQuestionItem] = useState(0)
    const [listAnswers, setListAnswers] = useState([])
    const [showTranscipt, setShowTranscript] = useState(false)
    const [startQuestion, setStartQuestion] = useState(false)
    const [countCorrect, setCountCorrect] = useState(0)
    const [countInCorrect, setCountInCorrect] = useState(0)
    const [loading, setLoading] = useState(false)
    const practiceType = useSelector(state => state.practiceReducer.practiceType);
    const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);

    const onClickStart = () => {
        setStartQuestion(!startQuestion)
    }

    const changeSource = (value) => {
        if (!audioPlayerRef.current) {
            return;
        }

        if (!data || !data[value]) {
            return;
        }

        const audioQuestion = data[value]?.audioQuestion;
        if (!audioQuestion) {
            return;
        }
        audioPlayerRef.current.src = `/static/media/${audioQuestion}`;
        audioPlayerRef.current.load();
        audioPlayerRef.current.play();
    };



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
                isCorrect: true
            };
            setListAnswers((prevListAnswers) => [...prevListAnswers, answer]);
        }
        if (practiceType === 'listen') {
            setShowTranscript(true)
        }
        setValue(e.target.value);
    };

    const checkAnswer = (idQuestion) => {
        const answer = listAnswers.find((answer) => answer.questionId === idQuestion);

        if (answer) {
            if (practiceType === 'listen') {
                setShowTranscript(true)
            }
            return setValue(answer.userAnswer);
        } else {
            if (practiceType === 'listen') {
                setShowTranscript(false)
            }
            setValue(null);
        }
    };

    const answerIscorrect = (value, index) => {
        const isAnswered = listAnswers.length > 0;
        const answer = listAnswers.find((answer) => answer.questionId === value);
        let resultClass = "question__item";

        if (questionItem === index) {
            resultClass += " action";
        } else if (isAnswered) {
            if (answer?.isCorrect === true) {
                resultClass += " action_success";
            } else if (answer?.isCorrect === false) {
                resultClass += " action_fail";
            }
        }

        return resultClass;
    };

    const onClickQuestion = (idQuestion, value) => {
        setQuestionItem(value)
        checkAnswer(idQuestion)
        changeSource(value)
    }

    const prvOrNext = (value, idQuestion) => {
        if (value === 0 && questionItem !== 0) {
            checkAnswer(idQuestion);
            changeSource(questionItem - 1)
            setQuestionItem((prevQuestionItem) => prevQuestionItem - 1);
        } else if (value === 1 && questionItem + 1 < data.length) {
            checkAnswer(idQuestion);
            changeSource(value)
            setQuestionItem((prevQuestionItem) => prevQuestionItem + 1);
        }
    };

    useEffect(() => {
        setLoading(true)
        const GetQuestionsById = () => {
            GetQuestionsByObjectTypeId(`questions?objectTypeId=${objectTypeId}`)
                .then((res) => {
                    setLoading(false)
                    const array = res.data.data;
                    array.sort(() => Math.random() - 0.5);
                    setData(array);
                    changeSource(0)
                });
        }
        GetQuestionsById()
    }, []);


    useEffect(() => {
        setCountCorrect(listAnswers.reduce((count, item) => count + (item.isCorrect ? 1 : 0), 0))
        setCountInCorrect(listAnswers.reduce((count, item) => count + (!item.isCorrect ? 1 : 0), 0))
    }, [listAnswers]);

    return (
        <>
            {contextHolder}
            <h1 className='pListen__heading'>Fighting my friend!</h1>
            {loading ?
                <div className="example">
                    <Spin />
                </div> :
                <Row gutter={1}>
                    <Col span={16} offset={4} className=''>
                        <Row gutter={24}>
                            <Col span={6} className=''>
                                <div className='vocabulary__detail-left'>
                                    <h3>Question</h3>
                                    <Row gutter={10} className='bbbb'>
                                        {data?.map((item, index) => (
                                            <Col span={4} className='' key={item.id}>
                                                <div className={answerIscorrect(item.id, index)}
                                                    onClick={() => onClickQuestion(item.id, index)}>
                                                    {index + 1}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                    <div className='checkQuantityCorrect'>
                                        <div> <FontAwesomeIcon className='faCircleCheck' icon={faCircleCheck} /> {countCorrect} Correct</div>
                                        <div> <FontAwesomeIcon className='faCircleXmark' icon={faCircleXmark} /> {countInCorrect} InCorrect</div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={18} className=''>
                                {!startQuestion ?
                                    <ListenStart onClickStart={onClickStart}></ListenStart>
                                    :
                                    <>
                                        <div className='question'>
                                            <div className='question-item' >
                                                <div>
                                                    <h2>Question {questionItem + 1}:
                                                        <p>{data[questionItem]?.textQuestion}
                                                        </p>
                                                    </h2>
                                                    <Radio.Group onChange={(e) => onChangeQuestionAnswer(e, data[questionItem])} value={value}>
                                                        <Space direction="vertical">
                                                            <Radio disabled={practiceType === 'listen' && value !== null} value={data[questionItem]?.optionAnswers?.answerA} className=''> {data[questionItem]?.optionAnswers?.answerA}</Radio>
                                                            <Radio disabled={practiceType === 'listen' && value !== null} value={data[questionItem]?.optionAnswers?.answerB} className=''> {data[questionItem]?.optionAnswers?.answerB}</Radio>
                                                            <Radio disabled={practiceType === 'listen' && value !== null} value={data[questionItem]?.optionAnswers?.answerC} className=''> {data[questionItem]?.optionAnswers?.answerC}</Radio>
                                                            <Radio disabled={practiceType === 'listen' && value !== null} value={data[questionItem]?.optionAnswers?.answerD} className=''> {data[questionItem]?.optionAnswers?.answerD}</Radio>
                                                        </Space>
                                                    </Radio.Group>
                                                    {listAnswers[questionItem]?.correctAnswer !== undefined && practiceType === 'vocabulary' ? (
                                                        <p className='correctAnswer'>The correct answer is:
                                                            <p>{listAnswers[questionItem]?.correctAnswer}
                                                            </p>
                                                        </p>
                                                    ) : (<p></p>)}
                                                </div>
                                                <div style={{ marginRight: "30px" }}>
                                                    <img className='question-item-img' src={data[questionItem]?.images[0]} alt="" />
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "end", marginBottom: "15px" }}>
                                                <audio controls ref={audioPlayerRef}>
                                                    <source src={`/static/media/${data[questionItem]?.audioQuestion}`} type="audio/mpeg"></source>
                                                </audio>
                                            </div>
                                            {showTranscipt && practiceType === 'listen' ?
                                                <>
                                                    <div className='Lquestion__action'>
                                                        <div className='Transcript'>
                                                            <span>Transcript :</span>
                                                            <p>A. There are some tables and chairs outdoors.</p>
                                                            <p>B. There are some tables and chairs outdoors.</p>
                                                            <p>C. There are some tables and chairs outdoors.</p>
                                                            <p>D. There are some tables and chairs outdoors.</p>

                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <></>
                                            }
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
                                    </>
                                }

                            </Col>
                        </Row>
                    </Col>
                </Row>
            }

        </>
    )
}
