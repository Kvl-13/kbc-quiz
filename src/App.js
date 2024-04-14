import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import Pyramid from "./components/Pyramid";
import Question from "./components/Question";
import { useState, useEffect } from "react";

function App() {

  const [currentLevel, setCurrentLevel] = useState(1);
  const [winningPrize, setWinningPrize] = useState("₹0");
  const [username, setUsername] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timer, setTimer] = useState(30);
  const [hold, setHold] = useState(true);

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
    <div className="vh-100 wv-100 d-flex" >
      <div className="left w-75 p-4">
        <Question username={username} setUsername={setUsername} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} winningPrice={winningPrize} isPlaying={isPlaying} setIsPlaying={setIsPlaying} timer={timer} setTimer={setTimer} setHold={setHold} />
      </div>
      <div className="right w-25">
        <Pyramid currentLevel={currentLevel} setWinningPrize={setWinningPrize} winningPrice={winningPrize} />
      </div>
    </div>
  );
}

export default App;
