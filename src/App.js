import React, { useState, useCallback } from "react";
import "./App.css";
import ImageUploader from "./ImageUploader.js";

function App() {
  const [logos, setLogos] = useState("Detecting");
  const [imageBase64, setImageBase64] = useState(null);

  const detectLogos = useCallback(async () => {
    console.log('makingrequesttoserver');
    await fetch('/detect_logos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        image_base_64: imageBase64
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setLogos(data.logos);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [imageBase64]);

  const onImageUploaded = (imgBase64) => {
    setImageBase64(imgBase64);
  };

  return (
    <div className="App">
      <h1>Loan yeu Derrick</h1>
      <h2>{logos}</h2>
      <ImageUploader onImageUploaded={onImageUploaded} />
      <button type="button" onClick={detectLogos}>
        Detect logo
      </button>
    </div>
  );
}

export default App;
