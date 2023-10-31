import React from 'react';

const Popup = ({ onClose, children }) => {
  const popupContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // 半透明灰色蒙版
    zIndex: 2, // 使蒙版位于弹出窗口之上
  };

  const popupStyle = {
    maxWidth: '300px',
    width: '80vw',
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={popupContainerStyle}>
        <div style={popupStyle}>
          <div style={closeButtonStyle} onClick={onClose}>
            X
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
