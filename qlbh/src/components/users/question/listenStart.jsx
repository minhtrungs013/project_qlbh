import React, { useState, useEffect } from 'react'
import { Progress, Space } from 'antd';

export default function ListenStart({ onClickStart, status, countQuestion, countCorrect, countInCorrect, OnClickContinue,OnClickReview, onClickTryAgain }) {
    const [percent, setPercent] = useState(0)

    const onClickStartOrResult = () => {
        onClickStart()
    }
    
    useEffect(() => {
        setPercent(parseInt((countCorrect / countQuestion) * 100))
    }, [countCorrect])

    return (
        <div className='lStart'>
            <div className='lStart__bg'></div>
            <div className='lStart__data'>
                <div className='lStart__progress'>
                    <div className='lStart-progress-box'></div>
                    <div className='box-layer-2'></div>
                    <div className='box-layer-3'></div>
                    <div className='box-layer-4'></div>
                    <Space wrap className='box-layer-5'>
                        <Progress
                            type="circle"
                            percent={percent}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                        />
                    </Space>
                    {/* <h3 className='box-layer-5'> {percent}%</h3> */}

                </div>
                <div className='main-statistics'>
                    <div className='main-statistics-questions-start'>
                        <div className='main-stats-data-questions-stat-item item-total'>
                            <h3>{countQuestion}</h3>
                            <h2>Total</h2>
                        </div>
                        <div className='main-stats-data-questions-stat-item item-correct'>
                            <h3>{countCorrect}</h3>
                            <h2>Correct</h2>
                        </div>
                        <div className='main-stats-data-questions-stat-item item-incorrect'>
                            <h3>{countInCorrect}</h3>
                            <h2>Incorrect</h2>
                        </div>
                    </div>
                    <div className='main-statistics-questions-button'>


                        {(countCorrect + countInCorrect) === countQuestion ?
                            <>
                                <button className='main-statistics-questions-button-btn btn__review' onClick={() => OnClickReview()}> REVIEW</button>
                                {status === 'TESTING' ?
                                    <button className='main-statistics-questions-button-btn' onClick={() => OnClickContinue()}>CONTINUE</button>
                                    :
                                    <button className='main-statistics-questions-button-btn' onClick={() => onClickTryAgain()} >TRY AGAIN</button>

                                }

                            </>
                            : status === 'TESTING' ?
                                <>
                                    <button className='main-statistics-questions-button-btn' onClick={() => OnClickContinue()}>CONTINUE</button>
                                </>
                                :
                                <button className='main-statistics-questions-button-btn' onClick={() => onClickStartOrResult()}> START</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
