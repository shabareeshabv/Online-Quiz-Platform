import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.slice();
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = questions.slice();
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = questions.slice();
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const quizData = { title, questions };
    if (validateQuiz(quizData)) {
      localStorage.setItem('quizData', JSON.stringify(quizData));
      navigate('/quiz');
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const validateQuiz = (quiz) => {
    if (!quiz.title.trim()) return false;
    for (let q of quiz.questions) {
      if (!q.question.trim() || q.options.some(opt => !opt.trim()) || !q.correctAnswer.trim()) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container">
      <h2>Create a New Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              placeholder={`Option ${oIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuiz;
