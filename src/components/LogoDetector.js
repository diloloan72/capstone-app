import { useState, useCallback } from "react";
import "../css/LogoDetector.css";
import ImageUploader from "./ImageUploader.js";

function LogoDetector() {
  const [logosLabel, setLogosLabel] = useState("");
  const [imageBase64, setImageBase64] = useState(null);

  const detectLogos = useCallback(async () => {
    console.log("makingrequesttoserver");
    await fetch("/detect_logos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_base_64: imageBase64,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.logos.length == 0) {
          setLogosLabel("Unable to detect logos");
        } else {
          setLogosLabel(data.logos.join(", "));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [imageBase64]);

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