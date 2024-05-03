import React from 'react';

const VerificationPopup = ({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Verification Email Sent</h2>
        <p>A verification email has been sent to your email address. Please check your inbox.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VerificationPopup;