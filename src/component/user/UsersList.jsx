import React, { useContext, useState } from 'react';
import MyContext from '../../DataProvider';

function InviteLinkGenerator() {
  const defaultLink = 'https://dapp.tedusd.online'
  const { defaultAccount } = useContext(MyContext);
  const [inviter, setInviter] = useState('');
  const [personalLink, setPersonalLink] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    const link = `https://dapp.tedusd.online/swap/?inviter=${defaultAccount}`;
    setGeneratedLink(link);
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '1.2rem',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const linkStyle = {
    display: 'block',
    fontSize: '1.2rem',
    marginTop: '10px',
    color: '#007bff',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Invite Link Generator</h2>
      <label htmlFor="inviterInput" style={labelStyle}>
        Enter Inviter (钱包地址):
      </label>
      <input
        type="text"
        id="inviterInput"
        value={inviter}
        onChange={(e) => setInviter(e.target.value)}
        style={inputStyle}
      />
      <button onClick={generateLink} style={buttonStyle}>
        Generate Link
      </button>
      {generatedLink && (
        <a href={generatedLink} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          {generatedLink}
        </a>
      )}
    </div>
  );
}

export default InviteLinkGenerator;
