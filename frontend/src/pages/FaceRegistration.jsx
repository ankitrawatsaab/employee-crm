import { useEffect, useRef, useState } from "react";
import { loadFaceModels, getFaceDescriptor } from "../utils/faceUtils";
import { FACE_API_END_POINT } from "../utils/constant.js";

const FaceRegistration = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFaceModels()
      .then(() => {
        console.log("Models loaded successfully");
        setModelsLoaded(true);
      })
      .catch((error) => {
        console.error("Model Loading Error:", error);
        setMessage("Failed to load face models.");
      });

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setMessage("Camera started.");
    } catch (error) {
      console.error("Camera Error:", error);
      setMessage(error.message);
    }
  };


  const registerFace = async () => {
    try {
      setLoading(true);
      setMessage("Detecting face...");

      const descriptor = await getFaceDescriptor(videoRef.current);

      if (!descriptor) {
        setMessage("Face not detected. Try again.");
        return;
      }

      const response = await fetch(
        `${FACE_API_END_POINT}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            faceDescriptor: descriptor,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(data.message);
    } catch (error) {
      console.error("Face Registration Error:", error);
      setMessage("Face registration failed.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Face Registration
      </h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full max-w-md rounded-lg"
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={startCamera}
          disabled={!modelsLoaded}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start Camera
        </button>

        <button
          onClick={registerFace}
          disabled={!modelsLoaded || loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Detecting..." : "Capture Face"}
        </button>
      </div>

      <p className="mt-4">{message}</p>
    </div>
  );
};

export default FaceRegistration;
