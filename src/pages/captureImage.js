import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

Axios.defaults.baseURL='http://localhost:3001';
export const CaptureImage = () => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState([]);
  const navigate=useNavigate();

  const capture = () => {
    const photoSrc = webcamRef.current.getScreenshot();
    setPhoto(photoSrc);
    Axios.post("/api/plastic_insert", { image: photo })
      .then(response => {
        setResult(prevResult => [...prevResult, { image: photoSrc }]);
      })
      .catch(error => {
        console.error("Error storing image:", error);
      });
       navigate("/success");
  };

  const videoConstraints = {
    facingMode: 'environment', // Use the rear camera (if available)
  };

  useEffect(() => {
    // Check and request camera permissions on component mount
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Do something with the stream if needed
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{width: "34%", position: "relative",left: "36%",top: "9rem"}}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} className='btn btn-primary' style={{ width: "20%", height: "20%",position:"relative",top:"12rem",left:"8rem" }}>Capture Photo</button>

      <div className="card-layout">
        {result.length !== 0 && result.map((data, index) => (
          <div key={index} className="card1" >
            <img src={data.image} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
}
