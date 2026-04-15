import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ChoiceModal.css'; 

import backgroundImage from "../assets/home/bacground.png"

interface ChoiceModalProps {
  setChoiceMade: (value: boolean) => void; 
}

const ChoiceModal: React.FC<ChoiceModalProps> = ({ setChoiceMade }) => {
  const navigate = useNavigate();

  const handleChoice = (path: string) => {
    setChoiceMade(true); 
    navigate(path); 
  };

  return (
    <div className="modal-overlay" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="modal-content">
        <h2>Please choose an option to proceed</h2>
        <div className="modal-buttons">
          <button className="modal-button" onClick={() => handleChoice('/')}>
            Customer
          </button>
          <button className="modal-button" onClick={() => handleChoice('/login')}>
            Admin Or User
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceModal;
