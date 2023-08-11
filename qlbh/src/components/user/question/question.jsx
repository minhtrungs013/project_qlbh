import { faCaretLeft, faCaretRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Radio, Row, Space, message, Spin, Progress, Image } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { sendAnswers, GetHistory, GetQuestionsByObjectTypeId } from '../../../api/service/Question';
import { useSelector } from 'react-redux';
import ListenStart from '../practice/practiceQuestion/listenStart';
import "./question.css";
import * as img from "../../../asset/img/index"

export default function Question() {
    console.log(img);
    const [data, setData] = useState([])
    const [chillData, setChillData] = useState([])
    const audioPlayerRef = useRef(null);
    const userId = '7d3bba49-91b7-4645-b143-dc14a0f49e6b';
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = useState([]);
    const [questionItem, setQuestionItem] = useState(0)
    const [listAnswers, setListAnswers] = useState([])
    const [showTranscipt, setShowTranscript] = useState(false)
    const [startQuestion, setStartQuestion] = useState(false)
    const [countCorrect, setCountCorrect] = useState(0)
    const [countInCorrect, setCountInCorrect] = useState(0)
    const [countQuestion, setCountQuestion] = useState(0)
    const [dataHistory, setDataHistory] = useState([])
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const practiceType = useSelector(state => state.practiceReducer.practiceType);
    const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);

    const onClickStart = () => {
        setValue([])
        setStartQuestion(!startQuestion)
    }
    const onsubmit = () => {
        if (countQuestion === listAnswers.length) {
            getHistoryByTestId()
            setTimeout(() => {
                setStartQuestion(!startQuestion)
            }, 200);
        }
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
    };

    const sendAnswerQuestion = (userAnswer, question, id) => {
        const dataQuestionAnswers = {
            "userId": userId,
            "questionId": question.id,
            "childQuestionId": id,
            "userAnswer": userAnswer
        }
        sendAnswers(`testHistories/sendAnswer`, dataQuestionAnswers)
            .then((res) => {
                if (practiceType === 'listen') {
                    setShowTranscript(true)
                }
                setListAnswers((prevListAnswers) => [...prevListAnswers, res.data.data]);
                setShowTranscript(true)

            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: "Contact admin for more information!",
                });
            });
    }

    const onChangeQuestionAnswer = (e, question, id) => {
        const data = {
            id: id,
            value: e.target.value
        }
        const tesst = value.find((item) => item.id === id)
        if (tesst) {
            return
        }
        setValue([...value, data]);
        sendAnswerQuestion(e.target.value, question, id)
    };

    const checkAnswer = (idQuestion) => {
        const answer = data.find(item => item.id === idQuestion);

        if (answer && value !== undefined) {
            const allQuestionsAnswered = answer?.questions?.every(question =>
                value.some(item => item.id === question.id)
            );

            if (allQuestionsAnswered || status === "DONE") {
                setShowTranscript(true);
            } else {
                setShowTranscript(false);
            }
        } else {
            setShowTranscript(false);
        }
    };

    const answerIscorrect = (value, index) => {
        const isAnswered = listAnswers.length > 0;
        const chillQuestion = data[questionItem].questions.find(item => item.id === value.id);
        const indexChill = chillData.findIndex(e => e.id === chillQuestion?.id);
        const isCurrentQuestion = indexChill === index;

        if (isCurrentQuestion) {
            return "question__item action";
        }

        if (isAnswered) {
            const findAnswer = (predicate) => {
                const answer = listAnswers.find(answer => predicate(answer));
                if (answer) {
                    return answer.correct ? "question__item action_success" : "question__item action_fail";
                }
                return null;
            };

            const result = findAnswer(answer =>
                answer.childQuestions?.some(a => a.id === value.id)
            ) || findAnswer(answer => answer.childQuestionId === value.id);

            if (result) {
                return result;
            }
        }

        return "question__item";
    };

    const onClickQuestion = (chillQuestion, value) => {
        const index = data.findIndex(e => e.id === chillQuestion.idQuestion)
        setQuestionItem(index)
        checkAnswer(chillQuestion.idQuestion)
        changeSource(value)
    }

    const prvOrNext = (value, idQuestion) => {
        if (value === 0 && questionItem !== 0) {
            checkAnswer(idQuestion);
            changeSource(questionItem - 1)
            setQuestionItem((prevQuestionItem) => prevQuestionItem - 1);
        } else if (value === 1 && questionItem + 1 < data.length) {
            checkAnswer(idQuestion);
            changeSource(questionItem + 1)
            setQuestionItem((prevQuestionItem) => prevQuestionItem + 1);
        }
    };

    useEffect(() => {
        setLoading(true)
        GetQuestionsById();
        getHistoryByTestId();
    }, []);

    const checkColorPercent = (item) => {
        const countCorrect = item?.userAnswers.reduce((count, item) => count + (item.correct ? 1 : 0), 0)
        const percent = parseInt((countCorrect / countQuestion) * 100)
        if (percent === 0 && percent < 50) {
            return 'red'
        } else if (percent > 49 && percent < 75) {
            return '#f29f05'
        } else if (percent > 74) {
            return '#52c41a'
        } else {
            return 'red'
        }
    }

    const checkColorResults = (id, value) => {
        const answer = listAnswers.find((answer) => answer.questionId === id);
        let isValueCorrect;
        let isAnswerCorrect;
        let userAnswer;
        if (answer && answer.childQuestions && answer.childQuestions[0]) {
            isAnswerCorrect = answer?.answerContent === answer?.childQuestions[0]?.correctAnswer;
            isValueCorrect = answer?.childQuestions[0]?.correctAnswer === value;
            userAnswer = answer?.answerContent === value
        }
        else {
            isAnswerCorrect = answer?.userAnswer === answer?.correctAnswer;
            isValueCorrect = answer?.correctAnswer === value;
            userAnswer = answer?.userAnswer === value

        }

        if (isAnswerCorrect && isValueCorrect) {
            return "#52c41a";
        } else if (!isAnswerCorrect && userAnswer) {
            return "red";
        } else if (!isAnswerCorrect && isValueCorrect) {
            return "#52c41a";
        } else {
            return "";
        }
    }

    const checkPercent = (item) => {
        const countCorrect = item?.userAnswers.reduce((count, item) => count + (item.correct ? 1 : 0), 0)
        return parseInt((countCorrect / countQuestion) * 100)

    }

    const showHistory = (item) => {
        if (status === "TESTING") {
            return
        }
        if (listAnswers.length < 1) {
            setStatus("DONE")
        }
        const dataAnswer = item.userAnswers.map(item => ({
            id: item?.childQuestions[0]?.id,
            value: item?.answerContent
        }));
        setValue(dataAnswer);
        setListAnswers(item.userAnswers)
        setCountCorrect(item.userAnswers.reduce((count, item) => count + (item.correct ? 1 : 0), 0))
        setCountInCorrect(item.userAnswers.reduce((count, item) => count + (!item.correct ? 1 : 0), 0))
        if (startQuestion) {
            setStartQuestion(false)
        }
    }

    const OnClickContinue = () => {
        getHistoryByTestId()
        setStartQuestion(!startQuestion)
        setShowTranscript(false)

    }

    const OnClickReview = () => {
        changeSource(0)
        setQuestionItem(0)
        checkAnswer(data[0].id)
        setStartQuestion(!startQuestion)

    }


    const onClickTryAgain = () => {
        setStatus("TESTING")
        setStartQuestion(!startQuestion)
        setListAnswers([])
        setValue([])
        changeSource(0)
        setQuestionItem(0)
        setShowTranscript(false)
        setCountCorrect(0)
        setCountInCorrect(0)
    }

    const GetQuestionsById = () => {
        GetQuestionsByObjectTypeId(`questions?objectTypeId=${objectTypeId}`)
            .then((res) => {
                setLoading(false)
                setData(res.data.data);
                const chillData = res.data.data.flatMap(test =>
                    test.questions.map(question => ({
                        id: question?.id,
                        idQuestion: question.questionId

                    }))
                );
                setChillData(chillData);
                const totalQuestions = res.data.data.reduce((total, test) => total + test.questions.length, 0);
                setCountQuestion(totalQuestions)
                changeSource(0)
            }).catch((error) => {
                console.log(error);
            })
    }

    const getHistoryByTestId = () => {
        GetHistory(`testHistories?testId=${objectTypeId}&userId=${userId}`)
            .then((res) => {
                const historyTesting = res.data.data.find((item) => item.status === "TESTING");
                const historyDone = res.data.data.filter((item) => item.status === "DONE");
                if (historyTesting) {
                    setStatus(historyTesting?.status)
                    setListAnswers(historyTesting?.userAnswers || [])
                    const missingElement = data.find(test =>
                        test.questions.some(question =>
                            !historyTesting?.userAnswers.some(answer =>
                                answer.childQuestions[0]?.id === question.id
                            )
                        )
                    );

                    if (missingElement) {
                        const missingIndex = data.findIndex(test => test.id === missingElement.id);
                        changeSource(missingIndex);
                        setQuestionItem(missingIndex);
                    }

                    const dataAnswer = historyTesting?.userAnswers.map(item => ({
                        id: item?.childQuestions[0]?.id,
                        value: item?.answerContent
                    }));
                    setValue(dataAnswer);

                } else {
                    const lastIndex = historyDone.length - 1;
                    setStatus(historyDone[lastIndex]?.status)
                    setListAnswers(historyDone[lastIndex]?.userAnswers || [])
                    const dataAnswer = historyDone[lastIndex]?.userAnswers.map(item => ({
                        id: item?.childQuestions[0]?.id,
                        value: item?.answerContent
                    }));
                    setValue(dataAnswer);
                    setQuestionItem(0)
                    changeSource(0)
                }

                if (historyDone) {
                    const reversedArray = historyDone.reverse();
                    setDataHistory(reversedArray || [])
                }

            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (listAnswers.length > 0) {
            setCountCorrect(listAnswers.reduce((count, item) => count + (item.correct ? 1 : 0), 0))
            setCountInCorrect(listAnswers.reduce((count, item) => count + (!item.correct ? 1 : 0), 0))
        }
    }, [listAnswers]);


    const getValue = (item) => {
        const data = value?.find((a) => a?.id === item?.id)
        if (data) {
            return data?.value
        } else {
            return null
        }
    }

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
                                <div className='vocabulary__detail-left' >
                                    <h3>Question</h3>
                                    <Row gutter={10} className='bbbb'>
                                        {chillData?.map((item, index) => (
                                            <Col span={4} className='' key={item.id}>
                                                <div className={answerIscorrect(item, index)}
                                                    onClick={() => onClickQuestion(item, index)}>
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
                                <div className=''>
                                    <h3 className='history__heading'>History</h3>
                                    {dataHistory.length > 0 ?
                                        <ul className='history__list' id='history'>
                                            {dataHistory?.map((item, index) => (
                                                <li className='history__item' onClick={() => showHistory(item)}>
                                                    {index === 0 ? "Latest" : 'test ' + (dataHistory.length - (index))}
                                                    <Progress percent={checkPercent(item)} size="small" strokeColor={checkColorPercent(item)} />
                                                </li>
                                            ))}
                                        </ul>
                                        :
                                        <h4>...</h4>
                                    }

                                </div>
                            </Col>
                            <Col span={18} className=''>
                                {!startQuestion ?
                                    <ListenStart onClickStart={onClickStart}
                                        status={status}
                                        countQuestion={countQuestion}
                                        countCorrect={countCorrect}
                                        countInCorrect={countInCorrect}
                                        OnClickContinue={OnClickContinue}
                                        OnClickReview={OnClickReview}
                                        onClickTryAgain={onClickTryAgain}></ListenStart>
                                    :
                                    <>
                                        <div className='question'>
                                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
                                                <audio controls ref={audioPlayerRef}>
                                                    <source src={`/static/media/${data[questionItem]?.audioQuestion}`} type="audio/mpeg"></source>
                                                </audio>
                                            </div>
                                            <div className='question-item' >
                                                <div className='Chill__question' id='chill'>
                                                    {data[questionItem]?.questions?.map((item, index) => (
                                                        <div >
                                                            <h2>Question: {chillData.findIndex((a) => a.id === item.id) +1}
                                                                <p>{item.textQuestion}
                                                                </p>
                                                            </h2>
                                                            <Radio.Group onChange={(e) => onChangeQuestionAnswer(e, data[questionItem], item.id)} value={getValue(item)}>
                                                                <Space direction="vertical">
                                                                    <Radio value={item.answerA} className=''>A. {item.answerA} </Radio>
                                                                    <Radio value={item.answerB} className=''>B. {item.answerB}</Radio>
                                                                    <Radio value={item.answerC} className=''>C. {item.answerC}</Radio>
                                                                    {
                                                                        item.answerD ? <Radio value={item.answerD} className=''>D. {item.answerD}</Radio> : <></>
                                                                    }
                                                                </Space>
                                                            </Radio.Group>
                                                            {listAnswers[questionItem]?.correctAnswer !== undefined && practiceType === 'vocabulary' ? (
                                                                <p className='correctAnswer'>The correct answer is:
                                                                    <p>{listAnswers[questionItem]?.correctAnswer}
                                                                    </p>
                                                                </p>
                                                            ) : (<p></p>)}
                                                        </div>))}
                                                </div>
                                                {data[questionItem]?.images[0] !== undefined ?
                                                    <div style={{ marginRight: "0" }}>
                                                        <img className='question-item-img' src={`/static/media/${data[questionItem]?.images[0]}`} alt="" />
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </div>

                                            {showTranscipt && practiceType === 'listen' && data[questionItem]?.transcript === null ?
                                                <>
                                                    <div className='Lquestion__action'>
                                                        <div className='Transcript'>
                                                            <span>Transcript :</span>
                                                            <p style={{ color: checkColorResults(data[questionItem]?.id, data[questionItem]?.questions[0]?.answerA) }}>
                                                                A. {data[questionItem]?.questions[0]?.answerA}
                                                            </p>
                                                            <p style={{ color: checkColorResults(data[questionItem]?.id, data[questionItem]?.questions[0]?.answerB) }}>
                                                                B. {data[questionItem]?.questions[0]?.answerB}
                                                            </p>
                                                            <p style={{ color: checkColorResults(data[questionItem]?.id, data[questionItem]?.questions[0]?.answerC) }}>
                                                                C. {data[questionItem]?.questions[0]?.answerC}
                                                            </p>
                                                            {data[questionItem]?.questions[0]?.answerD ?
                                                                <p style={{ color: checkColorResults(data[questionItem]?.id, data[questionItem]?.questions[0]?.answerD) }}>
                                                                    D. {data[questionItem]?.questions[0]?.answerD}
                                                                </p>
                                                                :
                                                                <></>
                                                            }


                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    {showTranscipt && practiceType === 'listen' && data[questionItem]?.transcript !== null ?
                                                        <>
                                                            <div className='Transcript'>
                                                                <span>Transcript :</span>
                                                                <p>{data[questionItem]?.transcript}</p>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                </>
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
                                                    <>
                                                        {status === "DONE" ?
                                                            <button type="primary"
                                                                size="large"
                                                                disabled={countQuestion !== listAnswers.length}
                                                                className='question__button btn-submit'
                                                                onClick={() => onClickStart()}
                                                            >Results</button>

                                                            :
                                                            <button type="primary"
                                                                size="large"
                                                                disabled={countQuestion !== listAnswers.length}
                                                                className='question__button btn-submit'
                                                                style={{backgroundColor: countQuestion !== listAnswers.length ?  "#f4f4f4" : '' , boxShadow: 'none', color: "black"}}
                                                                onClick={() => onsubmit()}
                                                            >Finish</button>
                                                        }
                                                    </>

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
                    </Col >
                </Row >
            }
        </>
    )
}
