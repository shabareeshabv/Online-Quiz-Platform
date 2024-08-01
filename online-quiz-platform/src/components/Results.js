import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';

const Results = () => {
  const location = useLocation();
  const { state } = location;
  const { score, totalQuestions } = state || { score: 0, totalQuestions: 0 };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <p className="results-score">
        You scored <span className="score">{score}</span> out of <span className="total">{totalQuestions}</span>
      </p>
    </div>
  );
};

export default Results;
