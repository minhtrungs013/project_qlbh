import React, { useState } from 'react'

export default function ListenStart({ onClickStart }) {
    const [showResult, setShowResult] = useState(true)
    const onClickStartOrResult = () => {
        onClickStart()
        setShowResult(false)
    }

    return (
        <div className='lStart'>
            <div className='lStart__bg'></div>
            <div className='lStart__data'>
                <div className='lStart__progress'>
                    <div className='lStart-progress-box'></div>
                    <div className='box-layer-2'></div>
                    <div className='box-layer-3'></div>
                    <div className='box-layer-4'></div>
                    <h3 className='box-layer-5'> 10%</h3>

                </div>
                <div className='main-statistics'>
                    <div className='main-statistics-questions-start'>
                        <div className='main-stats-data-questions-stat-item item-total'>
                            <h3>6</h3>
                            <h2>Total</h2>
                        </div>
                        <div className='main-stats-data-questions-stat-item item-correct'>
                            <h3>6</h3>
                            <h2>Correct</h2>
                        </div>
                        <div className='main-stats-data-questions-stat-item item-incorrect'>
                            <h3>6</h3>
                            <h2>Incorrect</h2>
                        </div>
                    </div>
                    <div className='main-statistics-questions-button'>


                        {showResult ?
                            <>
                                <button className='main-statistics-questions-button-btn' onClick={() => onClickStartOrResult()}> START</button>
                                {/* <button className='main-statistics-questions-button-btn'>CONTINUE</button> */}
                            </>
                            :
                            <>
                                <button className='main-statistics-questions-button-btn' onClick={() => onClickStartOrResult()}> REVIEW</button>
                                <button className='main-statistics-questions-button-btn'>TRY AGAIN</button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
