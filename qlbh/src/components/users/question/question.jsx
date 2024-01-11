import { LoadingOutlined } from '@ant-design/icons';
import { faCaretLeft, faCaretRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Radio, Space, Spin, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetHistory, sendAnswers } from '../../../api/service/QuestionService';
import { COLOR_FAIL, COLOR_SUCCESS, CONTACT_ADMIN, DEFAULT_IMAGE, EMPTY, STATUS_HISTORY_DONE, STATUS_HISTORY_TESTING, TYPE_MESSAGE_ERROR } from '../../../commom/messageConstant';
import { setObjectId, setQuestionsByTestId } from '../../redux/_actions/practice.actions';
import ListenStart from './listenStart';
import "./question.css";

export default function Question() {
    const [data, setData] = useState([])
    const [value, setValue] = useState([]);
    const [dataTest, setDataTest] = useState([])
    const [chillData, setChillData] = useState([])
    const [listAnswers, setListAnswers] = useState([])
    const [status, setStatus] = useState('')
    const [countCorrect, setCountCorrect] = useState(0)
    const [questionItem, setQuestionItem] = useState(0)
    const [countQuestion, setCountQuestion] = useState(0)
    const [countInCorrect, setCountInCorrect] = useState(0)
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [loadingAnswer, setLoadingAnswer] = useState(false)
    const [startQuestion, setStartQuestion] = useState(false)
    const [showTranscipt, setShowTranscript] = useState(false)
    const audioPlayerRef = useRef(null);
    const dispatch = useDispatch();
    const practiceType = useSelector(state => state.practiceReducer.practiceType);
    const questionsRedux = useSelector(state => state.practiceReducer.questions);
    const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);
    const userId = useSelector(state => state.userReducer.userId);
    const practicePart = useSelector(state => state.practiceReducer.practicePart);
    const practicePartId = useSelector(state => state.practiceReducer.practicePartId);
    const [idTest, setIdTest] = useState(objectTypeId)
    const [questions, setQuestions] = useState(questionsRedux)

    /**
     * Changes the audio source of the audio player.
     *
     * @param {number} value The index of the audio source to change to.
     */
    const changeSource = (value) => {
        // Check if the audio player reference exists.
        if (!audioPlayerRef.current) {
            return;
        }
        // Check if the data exists and if the audio source is valid.
        if (!data || !data[value] || data[value]?.audioURL) {
            return;
        }

        // Set the audio player source and load the audio file.
        audioPlayerRef.current.src = data[value]?.audioURL;
        audioPlayerRef.current.load();
    };

    /**
     * Sends an answer to a question to the API.
     *
     * @param {string} userAnswer The user's answer to the question.
     * @param {object} question The question object.
     * @param {number} id The ID of the child question.
     */
    const sendAnswerQuestion = (userAnswer, question, id) => {
        const dataQuestionAnswers = {
            "userId": userId,
            "questionId": question.id,
            "childQuestionId": id,
            "userAnswer": userAnswer
        }

        sendAnswers(`testHistories/sendAnswer`, dataQuestionAnswers)
            .then((res) => {
                setListAnswers((prevListAnswers) => [...prevListAnswers, res.data.data]);
                setLoadingAnswer(false)
            })
            .catch((error) => {
                showMessage(TYPE_MESSAGE_ERROR, CONTACT_ADMIN)
            });
    }

    /**
     * Changes the value of a question answer and sends the answer to the API.
     *
     * @param {object} e The event object.
     * @param {object} question The question object.
     * @param {number} id The ID of the child question.
     */
    const onChangeQuestionAnswer = (e, question, id) => {
        const data = {
            id: id,
            value: e.target.value
        }
        const tesst = value.find((item) => item.id === id)
        if (tesst) {
            return
        }
        setLoadingAnswer(true)
        setValue([...value, data]);
        sendAnswerQuestion(e.target.value, question, id)
    };

    /**
     * Checks if the user has answered all of the questions for the given question ID.
     *
     * @param {number} idQuestion The ID of the question to check.
     */
    const checkAnswer = (idQuestion) => {
        // Find the question object in the data array.
        const answer = data.find(item => item.id === idQuestion);
        // If the question object exists and the value array is not undefined, then check if all of the questions have been answered.
        if (answer && value !== undefined) {
            const allQuestionsAnswered = answer?.questionDetails?.every(question =>
                value.some(item => item.id === question.id)
            );
            // If all of the questions have been answered or the status is STATUS_HISTORY_DONE, then set the showTranscript flag to true and the loadingAnswer flag to false.
            if (allQuestionsAnswered || status === STATUS_HISTORY_DONE) {
                setShowTranscript(true);
                setLoadingAnswer(false)
            } else {
                // Otherwise, set the showTranscript flag to false and the loadingAnswer flag to false.
                setShowTranscript(false);
                setLoadingAnswer(false)
            }
        } else {
            // If the question object does not exist or the value array is undefined, then set the showTranscript flag to false and the loadingAnswer flag to false.
            setShowTranscript(false);
            setLoadingAnswer(false)
        }
    };

    /**
     * Checks if the given answer is correct and returns the corresponding class name.
     *
     * @param {object} value The answer object.
     * @param {number} index The index of the answer in the value array.
     * @returns {string} The class name to apply to the answer element.
     */
    const answerIscorrect = (value, index) => {
        // Check if any answers have been submitted.
        const isAnswered = listAnswers.length > 0;
        // Find the chill question object for the given answer.
        const chillQuestion = data[questionItem].questionDetails?.find(item => item.id === value.id);
        // Find the index of the chill question in the chillData array.
        const indexChill = chillData.findIndex(e => e.id === chillQuestion?.id);
        // Check if the current answer is for the current question.
        const isCurrentQuestion = indexChill === index;
        // If the current answer is for the current question, return the "question__item action" class name.
        if (isCurrentQuestion) {
            return "question__item action";
        }
        // If any answers have been submitted, then check if the given answer has been answered.
        if (isAnswered) {
            // Find the answer object for the given answer, using either the questionDetails array or the childQuestionId property.
            const findAnswer = (predicate) => {
                const answer = listAnswers.find(answer => predicate(answer));
                if (answer) {
                    return answer.correct ? "question__item action_success" : "question__item action_fail";
                }
                return null;
            };

            const result = findAnswer(answer =>
                answer.questionDetails?.some(a => a.id === value.id)
            ) || findAnswer(answer => answer.childQuestionId === value.id);
            // If the answer has been answered, then return the corresponding class name.
            if (result) {
                return result;
            }
        }
        // Otherwise, return the default class name.
        return "question__item";
    };

    /**
     * Sets the current question item, checks if all of the questions for the current question have been answered, and changes the audio source of the audio player.
     *
     * @param {object} chillQuestion The chill question object.
     */
    const onClickQuestion = (chillQuestion, value) => {
        // Find the index of the current question item in the data array.
        const index = data.findIndex(e => e.id === chillQuestion.idQuestion)
        // Set the current question item.
        setQuestionItem(index)
        // Check if all of the questions for the current question have been answered.
        checkAnswer(chillQuestion.idQuestion)
        // Change the audio source of the audio player.
        changeSource(index)
    }

    /**
     * Navigates to the previous or next question item, depending on the value parameter.
     *
     * @param {number} value The direction to navigate in. 0 for previous, 1 for next.
     * @param {number} idQuestion The ID of the current question.
     */
    const prvOrNext = (value, idQuestion) => {
        // If the value is 0 and the current question item is not 0, then navigate to the previous question item.
        if (value === 0 && questionItem !== 0) {
            checkAnswer(idQuestion);
            changeSource(questionItem - 1)
            setQuestionItem((prevQuestionItem) => prevQuestionItem - 1);
        }
        // If the value is 1 and the current question item is less than the length of the data array, then navigate to the next question item.
        else if (value === 1 && questionItem + 1 < data.length) {
            checkAnswer(idQuestion);
            changeSource(questionItem + 1)
            setQuestionItem((prevQuestionItem) => prevQuestionItem + 1);
        }
    };

    /**
     * Checks the color of the results for the given ID and value.
     *
     * @param {number} id The ID of the question or answer.
     * @param {string} value The value of the answer.
     * @returns {string} The color of the results, either `COLOR_SUCCESS`, `COLOR_FAIL`, or `EMPTY`.
     */
    const checkColorResults = (id, value) => {
        // Find the answer object for the given ID.
        const answer = listAnswers?.find((answer) => answer?.questionDetails?.find((item) => item.id === id) || answer?.childQuestionId === id);
        // Check if the answer object exists.
        if (!answer) {
            return EMPTY;
        }

        let isValueCorrect;
        let isAnswerCorrect;
        let userAnswer;
        if (answer && answer.questionDetails && answer.questionDetails[0]) {
            isAnswerCorrect = answer?.answerContent === answer?.questionDetails[0]?.correctAnswer;
            isValueCorrect = answer?.questionDetails[0]?.correctAnswer === value;
            userAnswer = answer?.answerContent === value
        }
        else {
            isAnswerCorrect = answer?.userAnswer === answer?.correctAnswer;
            isValueCorrect = answer?.correctAnswer === value;
            userAnswer = answer?.userAnswer === value

        }
        // Return the color of the results, depending on the values of isAnswerCorrect and isValueCorrect.
        if (isAnswerCorrect && isValueCorrect) {
            return COLOR_SUCCESS;
        } else if (!isAnswerCorrect && userAnswer) {
            return COLOR_FAIL;
        } else if (!isAnswerCorrect && isValueCorrect) {
            return COLOR_SUCCESS;
        } else {
            return EMPTY;
        }
    }

    /**
     * Starts the test or practice session.
     */
    const onClickStart = () => {
        setValue([])
        setStartQuestion(!startQuestion)
        setShowTranscript(false)
    }

    /**
     * Submits the test or practice session.
     */
    const onsubmit = () => {
        if (countQuestion === listAnswers.length) {
            getHistoryByTestId()
            setTimeout(() => {
                setStartQuestion(!startQuestion)
            }, 200);
        }
    }

    /**
     * Continues to the next test or practice session.
     */
    const OnClickContinue = () => {
        getHistoryByTestId()
        setStartQuestion(!startQuestion)
        setShowTranscript(false)

    }

    /**
     * Reviews the test or practice session.
     */
    const OnClickReview = () => {
        changeSource(0)
        setQuestionItem(0)
        checkAnswer(data[0].id)
        setStartQuestion(!startQuestion)

    }

    /**
     * Retakes the test or practice session.
     */
    const onClickTryAgain = () => {
        setStatus(STATUS_HISTORY_TESTING)
        setStartQuestion(!startQuestion)
        setListAnswers([])
        setValue([])
        changeSource(0)
        setQuestionItem(0)
        setShowTranscript(false)
        setCountCorrect(0)
        setCountInCorrect(0)
    }

    /**
     * Sets the test ID, questions, and value array, and dispatches the `setQuestionsByTestId` and `setObjectId` actions.
     *
     * @param {object} item The test question object.
     */
    const onClickTestQuestion = (item) => {
        if (item === null || item.id === idTest) {
            return
        }
        // Set the test ID and questions.
        setIdTest(item?.id)
        setQuestions(item?.questions)
        // Clear the value array.
        setValue([])
        // Dispatch the `setQuestionsByTestId` and `setObjectId` actions.
        dispatch(setQuestionsByTestId(item?.questions))
        dispatch(setObjectId(item?.id))
        // Set the startQuestion flag to false.
        setStartQuestion(false)
    }

    /**
     * Gets the questions for the current test ID.
     */
    const GetQuestionsById = () => {
        if (questions) {
            // Set the data and chillData state variables.
            setData(questions);
           
            const chillData = questions?.flatMap(test =>
                test.questionDetails?.map(question => ({
                    id: question?.id,
                    idQuestion: question.questionId

                }))
            );
            setChillData(chillData);
            // Calculate the total number of questions.
            const totalQuestions = questions?.reduce((total, test) => total + test.questionDetails?.length, 0);
            setCountQuestion(totalQuestions)
            // Change the audio source to the first question.
            changeSource(0)
            // Set the loading flag to false after 500 milliseconds.
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }

    /**
     * Gets the history for the current test ID.
     */
    const getHistoryByTestId = () => {
        GetHistory(`testHistories?testId=${idTest}&user-id=${userId}`)
            .then((res) => {
                // Find the history testing and history done objects.
                const historyTesting = res.data.data.find((item) => item.status === STATUS_HISTORY_TESTING);
                const historyDone = res.data.data.filter((item) => item.status === STATUS_HISTORY_DONE);
                // If a history testing object exists, then set the status, listAnswers, and value state variables.
                if (historyTesting) {
                    setStatus(historyTesting?.status)
                    setListAnswers(historyTesting?.userAnswers || [])
                    // Find the first question that the user has not answered yet.
                    const missingElement = data.find(test =>
                        test.questionDetails.some(question =>
                            !historyTesting?.userAnswers.some(answer =>
                                answer.questionDetails[0]?.id === question.id
                            )
                        )
                    );
                    // If a missing element is found, then change the audio source and question item to the missing element.
                    if (missingElement) {
                        const missingIndex = data.findIndex(test => test.id === missingElement.id);
                        changeSource(missingIndex);
                        setQuestionItem(missingIndex);
                    }

                    const dataAnswer = historyTesting?.userAnswers.map(item => ({
                        id: item?.questionDetails[0]?.id,
                        value: item?.answerContent
                    }));
                    // Set the value state variable to the user's answers.
                    setValue(dataAnswer);
                } else {
                    // If a history testing object does not exist, then find the last history done object and set the status, listAnswers, and value state variables.
                    const lastIndex = historyDone.length - 1;
                    setStatus(historyDone[lastIndex]?.status)
                    setListAnswers(historyDone[lastIndex]?.userAnswers || [])

                    const dataAnswer = historyDone[lastIndex]?.userAnswers.map(item => ({
                        id: item?.questionDetails[0]?.id,
                        value: item?.answerContent
                    }));
                    // Set the value state variable to the user's answers.
                    setValue(dataAnswer);
                    // Change the audio source and question item to the first question.
                    setQuestionItem(0)
                    changeSource(0)
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    /**
     * UseEffect hook that gets the questions and test history for the current test ID when the questions and test ID state variables change.
     */
    useEffect(() => {
        setLoading(true)
        GetQuestionsById();
        getHistoryByTestId();
    }, [questions, idTest]);

    /**
     * Updates the `dataTest` state variable whenever the `practicePart` and `practicePartId` state variables change.
     */
    useEffect(() => {
        if (practicePart !== null && practicePart.length > 0) {
            // Filter the practicePart array to find the part with the matching practicePartId.
            const part = practicePart.filter((item) => item.id === practicePartId)
            // Set the dataTest state variable to the tests for the matching part.
            setDataTest(part[0]?.tests)
        }
    }, [practicePart, practicePartId]);

    /**
     * Updates the `showTranscript`, `countCorrect`, and `countInCorrect` state variables whenever the `listAnswers`, `data`, and `questionItem` state variables change.
     */
    useEffect(() => {
        if (listAnswers) {
            // Find the question for the current question item.
            const question = data?.find((item) => item?.id === data[questionItem]?.id)
            // If the question exists, check if all of the questions for the current question item have been answered correctly.
            if (question) {
                // If the question detail has a child question ID, then use that ID to compare to the list of answers. Otherwise, use the question detail ID.
                const isSubset = question.questionDetails?.every(item1 =>
                    listAnswers.some(item2 => item1.id === (item2?.questionDetails && item2?.questionDetails[0]?.id !== undefined ? item2?.questionDetails[0]?.id : item2.childQuestionId))
                );
                // If all of the questions for the current question item have been answered correctly, set the showTranscript state variable to true.
                if (isSubset) {
                    setShowTranscript(true)
                }
            }
            // Count the number of correct and incorrect answers in the listAnswers array.
            setCountCorrect(listAnswers.reduce((count, item) => count + (item.correct ? 1 : 0), 0))
            setCountInCorrect(listAnswers.reduce((count, item) => count + (!item.correct ? 1 : 0), 0))
        }

    }, [listAnswers, data, questionItem]);

    /**
     * Gets the value of the item with the given ID.
     *
     * @param {object} item The item to get the value of.
     * @returns {string|null} The value of the item, or null if the item does not exist.
     */
    const getValue = (item) => {
        const data = value?.find((a) => a?.id === item?.id)
        if (data) {
            return data?.value
        } else {
            return null
        }
    }

    /**
     * Returns a LoadingOutlined Ant Design icon.
     *
     * @returns {React.ReactElement} A LoadingOutlined Ant Design icon.
     */
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    /**
     * Handles image errors by setting the image source to the default image.
     */
    const handleImageError = () => {
        document.getElementById("myImage").src = DEFAULT_IMAGE;
    };

    /**
     * Display a message using the specified type and content.
     *
     * @param {string} type - The message type (e.g., 'success', 'error', 'warning', 'info').
     * @param {string} message - The message content.
     */
    const showMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    return (
        <>
            {contextHolder}
            <h1 className='pListen__heading'>Fighting my friend!</h1>
            {loading ?
                <div className="example">
                    <Spin />
                </div> :
                <div>
                    <div className='row'>
                        <div className='col l-3 m-12 c-12 hide-on-mobile-tablet' >
                            <div className='vocabulary__detail-left' >
                                <h3>Question</h3>
                                <div id='history' className='row bbbb sm-gutter question__list'>
                                    {chillData?.map((item, index) => (
                                        <div className='col l-2 l-2-4-t m-2 c-2 ' key={item.id}>
                                            <div className={loadingAnswer ? answerIscorrect(item, index) + ' disabled-div' : answerIscorrect(item, index)}
                                                onClick={() => onClickQuestion(item, index)}>
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='checkQuantityCorrect'>
                                    <div> <FontAwesomeIcon className='faCircleCheck' icon={faCircleCheck} /> {countCorrect} Correct</div>
                                    <div> <FontAwesomeIcon className='faCircleXmark' icon={faCircleXmark} /> {countInCorrect} InCorrect</div>
                                </div>
                            </div>
                            <h3 style={{ textAlign: 'left' }}>Practices</h3>
                            <div className='' >
                                <div className='row sm-gutter' style={{ padding: '5px' }}>
                                    {dataTest?.map((item) => (
                                        <div className='col l-4 m-4 c-4'>
                                            <div onClick={() => onClickTestQuestion(item)} className={item.id === idTest ? 'question__test-item test_action' : 'question__test-item'} >
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='col l-9 m-12 c-12'>
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
                                                <source src={data[questionItem]?.audioURL} type="audio/mpeg"></source>
                                            </audio>
                                        </div>
                                        <div className='question-item' >
                                            <div className='Chill__question' id='chill'>
                                                {data[questionItem]?.questionDetails && data[questionItem]?.questionDetails?.map((item, index) => (
                                                    <div key={item.id} >
                                                        <h3 >Question {chillData.findIndex((a) => a.id === item.id) + 1}: {item.contentQuestion}
                                                        </h3>
                                                        <Radio.Group onChange={(e) => onChangeQuestionAnswer(e, data[questionItem], item.id)} value={getValue(item)}>
                                                            <Space direction="vertical">
                                                                <Radio value={item?.answers?.A} style={{ color: checkColorResults(item.id, item?.answers?.A) }} className=''>A. {data[questionItem]?.questionDetails.length > 0 && item?.answers?.A} </Radio>
                                                                <Radio value={item?.answers?.B} style={{ color: checkColorResults(item.id, item?.answers?.B) }} className=''>B. {data[questionItem]?.questionDetails.length > 0 && item?.answers?.B}</Radio>
                                                                <Radio value={item?.answers?.C} style={{ color: checkColorResults(item.id, item?.answers?.C) }} className=''>C. {data[questionItem]?.questionDetails.length > 0 && item?.answers?.C}</Radio>
                                                                {
                                                                    item?.answers?.D && <Radio value={item?.answers?.D} style={{ color: checkColorResults(item?.id, item?.answers?.D) }} className=''>D. {data[questionItem]?.questionDetails.length > 0 && item?.answers?.D}</Radio>
                                                                }
                                                            </Space>
                                                        </Radio.Group>
                                                        {listAnswers[questionItem]?.correctAnswer !== undefined && practiceType === 'vocabulary' &&
                                                            <p className='correctAnswer'>The correct answer is:
                                                                <p>{listAnswers[questionItem]?.correctAnswer}
                                                                </p>
                                                            </p>}
                                                    </div>))}
                                            </div>
                                            {data[questionItem]?.imageURLs && data[questionItem]?.imageURLs[0] !== undefined &&
                                                <div style={{ marginRight: "0" }}>
                                                    <img id="myImage" className='question-item-img' src={data[questionItem]?.imageURLs[0]} alt="" onError={handleImageError} />
                                                </div>
                                            }
                                        </div>

                                        {showTranscipt && practiceType === 'listen' && data[questionItem]?.transcript === null ?
                                            <>
                                                <div className='Lquestion__action'>
                                                    {data[questionItem]?.questionDetails && data[questionItem]?.questionDetails?.map((item, index) => (
                                                        <div className='Transcript'>
                                                            <span>Transcript :</span>
                                                            <p style={{ color: checkColorResults(item?.id, item?.answers?.A) }}>
                                                                A. {item?.answers?.A}
                                                            </p>
                                                            <p style={{ color: checkColorResults(item?.id, item?.answers?.B) }}>
                                                                B. {item?.answers?.B}
                                                            </p>
                                                            <p style={{ color: checkColorResults(item?.id, item?.answers?.C) }}>
                                                                C. {item?.answers?.C}
                                                            </p>
                                                            {item?.answers?.D &&
                                                                <p style={{ color: checkColorResults(item?.id, item?.answers?.D) }}>
                                                                    D. {item?.answers?.D}
                                                                </p>
                                                            }

                                                        </div>))}
                                                </div>
                                            </>
                                            :
                                            <>
                                                {showTranscipt && practiceType === 'Listen' && data[questionItem]?.transcript !== null &&
                                                    <>
                                                        <div className='Transcript'>
                                                            <span>Transcript :</span>
                                                            <p>{data[questionItem]?.transcript}</p>
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                        {showTranscipt ?
                                            <div className='question__action'>
                                                {questionItem !== 0 &&
                                                    <button type="primary"
                                                        size="large"
                                                        disabled={questionItem === 0}
                                                        className='question__button'
                                                        onClick={() => prvOrNext(0, data[questionItem - 1]?.id)}>
                                                        <FontAwesomeIcon className='faCaretLeft' icon={faCaretLeft} />
                                                        Previous
                                                    </button>
                                                }
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
                                                            countQuestion === listAnswers.length &&
                                                            <button type="primary"
                                                                size="large"
                                                                disabled={countQuestion !== listAnswers.length}
                                                                className='question__button btn-submit'
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
                                            :
                                            loadingAnswer &&
                                            <><Spin indicator={antIcon} /><span>Waiting...</span></>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        <div className='col l-3 m-12 c-12 hide-on-pc show-on-mobile-tablet' >
                            <h3>Question</h3>
                            <div id='history' className='row bbbb sm-gutter question__list'>
                                {chillData?.map((item, index) => (
                                    <div className='col l-2 l-2-4-t m-2 c-2 ' key={item.id}>
                                        <div className={answerIscorrect(item, index)}
                                            onClick={() => onClickQuestion(item, index)}>
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ textAlign: 'left', paddingLeft: '10px' }}>Practices</h3>
                            <div className='' >
                                <div className='row sm-gutter' style={{ padding: '5px' }}>
                                    {dataTest?.map((item) => (
                                        <div className='col l-4 m-4 c-4'>
                                            <div onClick={() => onClickTestQuestion(item)} className={item.id === idTest ? 'question__test-item test_action' : 'question__test-item'} >
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
