import React, { useState, useRef } from 'react'
import useSound from 'use-sound';
import questionplay from "../assests/questionplay.mp3";
import correct from "../assests/correct.mp3";
import wrong from "../assests/wrong.mp3";
import timerkbc from "../assests/timerkbc.mp3";
import crkbc from "../assests/crkbc.mp3";


export default function Question(props) {
    const { currentQuestion, username, setUsername, currentLevel, setCurrentLevel, winningPrice, setWinningPrize, isPlaying, setIsPlaying, timer, setTimer, setHold, callApi } = props;

    // To disable the next button  
    const [disable, setDisable] = useState(true);

    // To add class when click on option
    const [currAns, setCurrAns] = useState(null);
    const [ansClass, setAnsClass] = useState("");
    const [rghtans, setRghtans] = useState("");

    // To get username 
    const inpVal = useRef(null);

    // Sound
    const [ply] = useSound(questionplay);
    const [right] = useSound(correct);
    const [wrg] = useSound(wrong);
    const [tictac, { stop }] = useSound(timerkbc);
    const [cr] = useSound(crkbc);


    // To add delay to show animation
    const addDelay = (delay, callback) => {
        setTimeout(() => {
            callback();
        }, delay);
    }

    // To handle selection of answer
    const handleClick = (e) => {
        let ans = e.target.innerText.slice(3);
        setCurrAns(ans);
        stop();

        setHold(true);
        if (ans === currentQuestion.correctAnswer) {
            setAnsClass(" correct");

            addDelay(2500, () => {
                setDisable(false);
                if ((currentLevel + 1) > 14) {
                    cr();
                    setIsPlaying(false);
                    setCurrentLevel(old => old + 1);
                }
                else {
                    right();
                }
            });
        }
        else {
            setAnsClass(" wrong");

            addDelay(2500, () => {
                setRghtans("rghtans")
                wrg();
            });

            addDelay(3500, () => {
                setIsPlaying(false);
            })
        }
    }

    // To move to next question
    const handleNext = () => {
        ply();
        tictac();
        setAnsClass("");
        setCurrAns(null);
        setHold(false);
        setTimer(30);
        setDisable(true);
        setRghtans("");
        setCurrentLevel(old => old + 1);
    }

    // To restart the game 
    const handleRestart = () => {
        callApi();
        setCurrentLevel(1);
        setDisable(true);
        setIsPlaying(true);
        setTimer(30);
        setCurrAns(null);
        setAnsClass("");
        setUsername("");
        setRghtans("");
        setWinningPrize("₹0");
    }

    // To take username
    const handleChange = (e) => {
        e.preventDefault();

        if (inpVal.current.value) {
            if (currentQuestion != null) {
                ply();
                tictac();
            }
            setUsername(inpVal.current.value);
            setHold(false);
        }
    }

    return (
        <>
            {
                username === "" ?
                    <div className='w-100 h-100' >
                        <form className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
                            <input className='p-2 mb-2 text-light rounded-1' style={{background: "transparent", border: "2px solid #fff" }} type="text" ref={inpVal} placeholder='Enter Your Name' />
                            <button className='border-0 outline-0 rounded-1 py-2' onClick={handleChange}>Start the game</button>
                        </form>
                    </div>
                    :
                    <div className={`w-100 h-100 d-flex flex-column align-items-center ${currentQuestion === null || isPlaying === false ? 'justify-content-center' : 'justify-content-start' } justify-content-md-center`}>
                        {
                            currentQuestion === null ?
                                <div className='w-100 rounded-2 d-flex align-items-center justify-content-center error py-4'>
                                    <h2 className='mb-0 text-danger'>Oops some error occurs please reload the page</h2>
                                </div>
                                :
                                isPlaying === true ?
                                    <>
                                        <div className='w-100 text-center mb-2'>
                                            <p className='card mb-0 px-2 pt-2 rounded-5 rounded-bottom-0 text-light text-center' style={{ background: "linear-gradient(#100241,black)", width: "60px", fontSize: "1.1rem", margin: "auto" }}>{timer}</p>
                                            <p className='card p-4 text-light ' style={{ background: "linear-gradient(#100241,black)" }} dangerouslySetInnerHTML={{ __html: currentQuestion.question }} ></p>
                                        </div>

                                        <div className='h-25 w-100'>
                                            <div className='d-flex mb-3 option'>
                                                <button disabled={!disable} className={`text-start border-0 rounded-2 text-light h-50 w-50 ps-3 py-3 me-3 ${currAns === currentQuestion.options[0] ? ansClass : (ansClass === " wrong" && currentQuestion.correctAnswer === currentQuestion.options[0]) ? rghtans : ""} `} onClick={handleClick} >A. {currentQuestion.options[0]}</button>
                                                <button disabled={!disable} className={`text-start border-0 rounded-2 text-light h-50 w-50 ps-3 py-3 ${currAns === currentQuestion.options[1] ? ansClass : (ansClass === " wrong" && currentQuestion.correctAnswer === currentQuestion.options[1]) ? rghtans : ""}`} onClick={handleClick}>B. {currentQuestion.options[1]}</button>
                                            </div>
                                            <div className='d-flex option'>
                                                <button disabled={!disable} className={`text-start border-0 rounded-2 text-light h-50 w-50 ps-3 py-3 me-3 ${currAns === currentQuestion.options[2] ? ansClass : (ansClass === " wrong" && currentQuestion.correctAnswer === currentQuestion.options[2]) ? rghtans : ""}`} onClick={handleClick}>C. {currentQuestion.options[2]}</button>
                                                <button disabled={!disable} className={`text-start border-0 rounded-2 text-light h-50 w-50 ps-3 py-3 ${currAns === currentQuestion.options[3] ? ansClass : (ansClass === " wrong" && currentQuestion.correctAnswer === currentQuestion.options[3]) ? rghtans : ""}`} onClick={handleClick}>D. {currentQuestion.options[3]}</button>
                                            </div>

                                            <div className={`w-100 ${disable ? "d-none" : ""}`}>
                                                <button className='btn py-2 mt-3 float-end' id='next' style={{ background: "#38b000" }} onClick={handleNext}><p className='w-100 mb-0 text-center'>Next Question</p></button>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <div className='w-50 h-25'>
                                        <h3 className='text-center'>
                                            {`${username.charAt(0).toUpperCase()}${username.slice(1)} you won ${winningPrice}`}</h3>
                                        <button className='w-100 outline-0 border-0 py-2' onClick={handleRestart}>Restart</button>
                                    </div>
                        }
                    </div>
            }
        </>
    )
};
