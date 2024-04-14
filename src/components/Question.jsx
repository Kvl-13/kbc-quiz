import React, { useState, useRef } from 'react'
import useSound from 'use-sound';
import questionplay from "../assests/questionplay.mp3";
import correct from "../assests/correct.mp3";
import wrong from "../assests/wrong.mp3";
import timerkbc from "../assests/timerkbc.mp3";
import crkbc from "../assests/crkbc.mp3";


export default function Question(props) {
    const { username, setUsername, currentLevel, setCurrentLevel, winningPrice, isPlaying, setIsPlaying, timer, setTimer, setHold } = props;

    // To disable the next button  
    const [disable, setDisable] = useState(true);

    // To add class when click on option
    const [currAns, setCurrAns] = useState(null);
    const [ansClass, setAnsClass] = useState("");

    // To get username 
    const inpVal = useRef(null);

    // Sound
    const [ply] = useSound(questionplay);
    const [right] = useSound(correct);
    const [wrg] = useSound(wrong);
    const [tictac, { stop }] = useSound(timerkbc);
    const [cr] = useSound(crkbc);

    const questions = [
        {
            srno: "1",
            question: "Which country hosted the 2020 Summer Olympics?",
            options: ["Japan", "USA", "China", "South Korea"],
            correctAnswer: "Japan"
        },
        {
            srno: "2",
            question: "Who won the 2021 Nobel Peace Prize?",
            options: ["Joe Biden", "Greta Thunberg", "António Guterres", "Maria Ressa"],
            correctAnswer: "Maria Ressa"
        },
        {
            srno: "3",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            correctAnswer: "Mars"
        },
        {
            srno: "4",
            question: "Who is the current Prime Minister of the United Kingdom?",
            options: ["Boris Johnson", "Theresa May", "David Cameron", "Tony Blair"],
            correctAnswer: "Boris Johnson"
        },
        {
            srno: "5",
            question: "Which company became the world's first trillion-dollar company?",
            options: ["Apple", "Amazon", "Microsoft", "Google"],
            correctAnswer: "Apple"
        },
        {
            srno: "6",
            question: "What is the capital city of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correctAnswer: "Canberra"
        },
        {
            srno: "7",
            question: "Who won the 2021 Wimbledon Men's Singles title?",
            options: ["Novak Djokovic", "Roger Federer", "Rafael Nadal", "Andy Murray"],
            correctAnswer: "Novak Djokovic"
        },
        {
            srno: "8",
            question: "What is the currency of Brazil?",
            options: ["Euro", "Dollar", "Real", "Peso"],
            correctAnswer: "Real"
        },
        {
            srno: "9",
            question: "Who is the CEO of Tesla Inc.?",
            options: ["Jeff Bezos", "Tim Cook", "Elon Musk", "Mark Zuckerberg"],
            correctAnswer: "Elon Musk"
        },
        {
            srno: "10",
            question: "Which country is the largest producer of coffee?",
            options: ["Brazil", "Vietnam", "Colombia", "Ethiopia"],
            correctAnswer: "Brazil"
        },
        {
            srno: "11",
            question: "Who is the current President of the United States?",
            options: ["Barack Obama", "Donald Trump", "Joe Biden", "George W. Bush"],
            correctAnswer: "Joe Biden"
        },
        {
            srno: "12",
            question: "Which city is known as the City of Love?",
            options: ["Paris", "Venice", "Rome", "Florence"],
            correctAnswer: "Paris"
        },
        {
            srno: "13",
            question: "What is the largest mammal in the world?",
            options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            correctAnswer: "Blue Whale"
        },
        {
            srno: "14",
            question: "Who wrote the famous novel 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "F. Scott Fitzgerald"],
            correctAnswer: "Harper Lee"
        }
    ];
    
    // eslint-disable-next-line
    const currentQuestion = questions.filter(element => element.srno == currentLevel)[0];
    
    // To add delay to show animation
    const addDelay = (delay, callback) => {
        setTimeout(() => {
            callback();
        }, delay);
    }

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
                setIsPlaying(false);
                wrg();
            });
        }
    }

    const handleNext = () => {
        ply();
        tictac();

        // if ((currentLevel + 1) == 14) {
        //     setDisable(true);
        // }

        setAnsClass("");
        setCurrAns(null);
        setHold(false);
        setTimer(30);
        setDisable(true);
        setCurrentLevel(old => old + 1);
    }

    const handleRestart = () => {
        setCurrentLevel(1);
        setDisable(true);
        setIsPlaying(true);
        setTimer(30);
        setCurrAns(null);
        setAnsClass("");
        setUsername("");
    }

    const handleChange = (e) => {
        e.preventDefault();

        if (inpVal.current.value) {
            ply();
            tictac();
            setHold(false);
            setUsername(inpVal.current.value);
        }
    }

    return (
        <>
            {
                username === "" ?
                    <div className='w-100 h-100' >
                        <form className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
                            <input className='w-50 p-2 mb-2 text-light outline-0 rounded-1 border-2 border-light' style={{ color: "black", background: "transparent" }} type="text" ref={inpVal} placeholder='Enter Your Name' />
                            <button className='border-0 outline-0 rounded-1 w-50 py-2' onClick={handleChange}>Start the game</button>
                        </form>
                    </div>
                    :
                    isPlaying === true ?
                        <div className='w-100 h-100 d-flex flex-column justify-content-center'>
                            <div className='w-100 text-center mb-2'>
                                <p className='card mb-0 px-2 pt-2 rounded-5 rounded-bottom-0 text-light text-center' style={{ background: "linear-gradient(#100241,black)", width: "60px", fontSize: "1.1rem", margin: "auto" }}>{timer}</p>

                                <p className='card p-4 text-light ' style={{ background: "linear-gradient(#100241,black)", fontSize: "1.2rem" }}>{currentQuestion.question}</p>
                            </div>

                            <div className='h-25'>
                                <div className='d-flex mb-3'>
                                    <button className={`card text-light h-50 w-50 ps-3 py-3 me-3 ${currAns === currentQuestion.options[0] ? ansClass : ""}`} onClick={handleClick} >A. {currentQuestion.options[0]}</button>

                                    <button className={`card text-light h-50 w-50 ps-3 py-3 ${currAns === currentQuestion.options[1] ? ansClass : ""}`} onClick={handleClick}>B. {currentQuestion.options[1]}</button>
                                </div>
                                <div className='d-flex'>
                                    <button className={`card text-light h-50 w-50 ps-3 py-3 me-3 ${currAns === currentQuestion.options[2] ? ansClass : ""}`} onClick={handleClick}>C. {currentQuestion.options[2]}</button>

                                    <button className={`card text-light h-50 w-50 ps-3 py-3 ${currAns === currentQuestion.options[3] ? ansClass : ""}`} onClick={handleClick}>D. {currentQuestion.options[3]}</button>
                                </div>

                                <div className={`w-100 ${disable ? "d-none" : ""}`}>
                                    <button className='btn py-2 mt-3 float-end' style={{ background: "#38b000" }} onClick={handleNext}><p className='w-100 mb-0 text-center fw-semibold'>Next Question</p></button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <div className='w-50 h-25'>
                                <h3 className='text-center'>
                                    {`${username.charAt(0).toUpperCase()}${username.slice(1)} you won ${winningPrice}`}</h3>
                                <button className='w-100 outline-0 border-0 py-2' onClick={handleRestart}>Restart</button>
                            </div>
                        </div>
            }
        </>


    )
};
