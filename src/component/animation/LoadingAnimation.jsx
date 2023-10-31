import React, { useState } from 'react';

const YourComponent = () => {
  const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  const closeAnimation = () => {
    setIsAnimationVisible(false);
  };

  const overlayStyle = {
    display: isAnimationVisible ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  const centerBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const spinnerStyle = {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div>
      <button onClick={closeAnimation}>关闭动画</button>
      <div style={overlayStyle}>
        <div style={centerBoxStyle}>
          <div style={spinnerStyle}></div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
