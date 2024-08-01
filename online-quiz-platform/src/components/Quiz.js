import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuiz = localStorage.getItem('quizData');
    if (storedQuiz) {
      const parsedQuiz = JSON.parse(storedQuiz);
      setQuiz(parsedQuiz);
      setTime(parsedQuiz.questions.length * 60);
    }
  }, []);

  useEffect(() => {
    if (!quiz) return;

    if (time === 0) {
      navigate('/results', { state: { score, totalQuestions: quiz.questions.length } });
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time, navigate, score, quiz]);

  const handleAnswer = (answer) => {
    if (quiz.questions[currentQuestion].correctAnswer === answer) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion + 1);
    } else {
      navigate('/results', { state: { score: score + (quiz.questions[currentQuestion].correctAnswer === answer ? 1 : 0), totalQuestions: quiz.questions.length } });
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="container">
      <h2>{quiz.title}</h2>
      <div>Time left: {minutes}m {seconds}s</div>
      <div>
        <p>{quiz.questions[currentQuestion].question}</p>
        {quiz.questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
