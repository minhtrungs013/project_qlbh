import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import "./home.css"
import { Column, Area } from '@ant-design/plots';
import { PicRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Header from '../header/header';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-hooks';
export default function Home() {
    // const [value, setValue] = useState('');
    // const { speak } = useSpeechSynthesis();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);


    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },

    });

    useEffect(() => {
        const updateVoices = () => {
            const speechSynthesisVoices = window.speechSynthesis.getVoices();
            setVoices(speechSynthesisVoices);
        };

        window.speechSynthesis.addEventListener('voiceschanged', updateVoices);

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
        };
    }, []);

    useEffect(() => {
        if (voices.length > 0) {
            const selectedGoogleVoice = voices.find(
                (voice) => voice.voiceURI === 'Google US English'
            );
            if (selectedGoogleVoice) {
                setSelectedVoice(selectedGoogleVoice);
            }
        }
    }, [voices]);

    const handleSpeak = () => {
        if (selectedVoice) {
            const utterance = new SpeechSynthesisUtterance('hello');
            utterance.voice = selectedVoice;
            utterance.rate = 1;
            utterance.pitch = 1
            window.speechSynthesis.speak(utterance);
        }
    };


    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
        animation: true,
        slider: {
            start: 0.1,
            end: 0.9,
            trendCfg: {
                isArea: true,
            },
        },
    };
    console.log(voices);
    return (
        <>
            <Header></Header>
            <div>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <button onMouseDown={listen} onMouseUp={stop}>
                    🎤
                </button>
                {listening && <div>Go ahead I'm listening</div>}
            </div>
            {/* <div>
                <h1>Chọn giọng đọc</h1>
                {voices.length > 0 ? (
                    <select value={selectedVoice?.name || ''} onChange={handleVoiceChange}>
                        <option value="">Chọn giọng đọc</option>
                        {voices.map((voice, index) => (
                            <option key={index} value={index}>
                                {voice.name} - {voice.lang}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>Loading...</p>
                )}
                {selectedVoice && (
                    <div>
                        <h2>Thông tin giọng đọc được chọn:</h2>
                        <p>Name: {selectedVoice.name}</p>
                        <p>Lang: {selectedVoice.lang}</p>
                    </div>
                )}
            </div> */}

            <div>
                <h1>Đọc từ "hello" với giọng đọc Google US English</h1>
                <button onClick={handleSpeak} disabled={!selectedVoice}>
                    Đọc
                </button>
            </div>

            {/* <div>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <button onClick={() => speak({ text: value })}>Speak</button>
            </div> */}
            <div className='home'>
                <div className='product__deading'>
                    <PicRightOutlined className='product__deading-icon' />
                    <h3 className='product__deading-text'>Product Management</h3>
                </div>
                <Row>
                    <Col span={14} className='name'>
                        <Column {...config} />
                    </Col>
                    <Col span={10} className='name'>
                        <Area {...config} />
                    </Col>
                </Row>
            </div>
        </>

    )
}
