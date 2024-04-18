import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import Pyramid from "./components/Pyramid";
import Question from "./components/Question";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [currentLevel, setCurrentLevel] = useState(1);
  const [winningPrize, setWinningPrize] = useState("₹0");
  const [username, setUsername] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timer, setTimer] = useState(30);
  const [hold, setHold] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const callApi = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=14&category=28&difficulty=easy&type=multiple');
      const extracted = response.data.results;
      setQuestions(extracted);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    callApi();
  }, []);

  const load = () => {
    if (questions) {
      const currQue = questions[currentLevel-1]
      
      if (currQue) {
        const options = [...currQue.incorrect_answers];

        const min = 0;
        const max = 3;
        let position = Math.floor(Math.random() * (max - min + 1)) + min;
        options.splice(position, 0, currQue.correct_answer);

        let temp = {
          question: currQue.question,
          options: options,
          correctAnswer: currQue.correct_answer
        };

        setCurrentQuestion(temp);
      }
    }
  }

  useEffect(() => {
    load();
  }, [questions, currentLevel]); 

  useEffect(() => {
    let interval;

    if (timer >= 0 && !hold) {
      interval = setInterval(() => {
        setTimer(old => old - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [timer, hold]);

  return (
    <div className="vh-100 wv-100 d-flex flex-md-row flex-column" >
      <div className="left p-4">
        <Question currentQuestion={currentQuestion} username={username} setUsername={setUsername} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} winningPrice={winningPrize} setWinningPrize={setWinningPrize} isPlaying={isPlaying} setIsPlaying={setIsPlaying} timer={timer} setTimer={setTimer} setHold={setHold} callApi={callApi} />
      </div>
      <div className="right">
        <Pyramid currentLevel={currentLevel} setWinningPrize={setWinningPrize} winningPrice={winningPrize} />
      </div>
    </div>
  );
}

export default App;
