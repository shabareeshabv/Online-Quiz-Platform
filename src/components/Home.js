import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Online Quiz Platform</h1>
      <button onClick={() => navigate('/create-quiz')}>Create Quiz</button>
      <button onClick={() => navigate('/quiz')}>Take Quiz</button>
      <button onClick={() => navigate('/results')}>View Results</button>
    </div>
  );
};

export default Home;
