import React, {useState, useCallback} from 'react';
import "./App.css";
import ImageUploader from "./ImageUploader.js"

function App() {
  const [logos, setLogos] = useState('Detecting');

  const detectLogos = useCallback(async () => {
    await fetch('/detect_logos').then(res => res.json()).then(data => {
      setLogos(data.logos);
    });
  }, []);

  return (
    <div className="App">
      <h1>Loan yeu Derrick</h1>
      <h2>{logos}</h2>
      <ImageUploader />
      <button type="button" onClick={detectLogos}>Detect logo</button>
    </div>
  );
}

export default App;
