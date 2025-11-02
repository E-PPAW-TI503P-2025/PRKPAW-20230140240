// src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
// fetch api 
  useEffect(() => {
    fetch('http://localhost:5000') // request ke server Node.js
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Integrasi React dan Node.js</h1>
      <p>Pesan dari server: <strong>{message}</strong></p>
    </div>
  );
}

export default App;
