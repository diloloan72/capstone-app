import React, { useState, useCallback } from "react";
import "../css/LogoDetector.css";
import ImageUploader from "./ImageUploader.js";

/*
 * Component that allows users to detect logos in an uploaded image 
 */
function LogoDetector() {
  const [logosLabel, setLogosLabel] = useState("");
  const [imageBase64, setImageBase64] = useState(null);

  // Make a request to the backend to detect logos in the image 
  const detectLogos = useCallback(async () => {
    await fetch("/detect_logos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_base_64: imageBase64,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Parse response from the server 
        console.log("data", data);
        if (data.logos.length === 0) {
          setLogosLabel("Unable to detect logos"); 
        } else {
          setLogosLabel(data.logos.join(", "));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [imageBase64]);

  // Save the base64 image from the ImageUploader component 
  const onImageUploaded = (imgBase64) => {
    setImageBase64(imgBase64);
  };

  return (
    <div className="LogoDetector">
      <ImageUploader onImageUploaded={onImageUploaded} />
      <button type="button" onClick={detectLogos}>
        Detect logo
      </button>
      <h2>{logosLabel}</h2>
    </div>
  );
}
export default LogoDetector;
