import React, { useState, useCallback } from "react";
import "./App.css";
import ImageUploader from "./ImageUploader.js";

function App() {
  const [logos, setLogos] = useState("Detecting");
  const [image, setImage] = useState(null);

  const detectLogos = useCallback(async () => {
    console.log('makingrequesttoserver');
    await fetch('/detect_logos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageBase64: image
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setLogos(data.logos);
      });
  }, []);

  const onImageUploaded = (imgURL) => {
    console.log(imgURL);
    setImage(imgURL);
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
