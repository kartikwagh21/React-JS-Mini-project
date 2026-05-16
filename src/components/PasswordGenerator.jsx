import { useState, useCallback } from 'react';
import '../App.css';

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <h1>Password Generator</h1>
        
        <div className="input-group">
          <input
            type="text"
            value={password}
            className="password-display"
            placeholder="Password"
            readOnly
          />
          <button onClick={copyToClipboard} className="copy-btn">
            Copy
          </button>
        </div>

        <div className="control-row">
          <div className="range-group">
            <input 
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor="charInput">Symbols</label>
          </div>
        </div>

        <button onClick={passwordGenerator} className="generate-btn">
          Generate
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;