import { useEffect, useRef, useState } from "react";
import { loadFaceModels, getFaceDescriptor } from "../utils/faceUtils";
import axios from "axios";
import { toast } from "sonner";
import usePunchIn from "../hooks/usePunchIn.jsx";
import { FACE_API_END_POINT } from "../utils/constant.js";

const FaceVerification = ({ onSuccess }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { punchIn } = usePunchIn();

  useEffect(() => {
    loadFaceModels()
      .then(() => setModelsLoaded(true))
      .catch(() => setMessage("Failed to load face models."));

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
      await videoRef.current.play();

      setMessage("Camera started.");
    } catch (error) {
      setMessage("Camera failed to start.");
    }
  };

  const verifyFace = async () => {
    try {
      setLoading(true);
      setMessage("Verifying face...");

      const faceDescriptor = await getFaceDescriptor(videoRef.current);

      if (!faceDescriptor) {
        setMessage("Face not detected. Try again.");
        return;
      }

      const { data } = await axios.post(`${FACE_API_END_POINT}/verify`,
        { faceDescriptor },
        { withCredentials: true }
      );

      if (!data.verified) {
        toast.error(data.message || "Face verification failed.");
        setMessage(data.message || "Face verification failed.");
        return;
      }
      toast.success("Face verified successfully.");

      const punchInSuccess = await punchIn();
      if (punchInSuccess) {
        onSuccess?.();
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Face verification failed.");
      setMessage(error.response?.data?.message || "Face verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Face Verification</h2>

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
          onClick={verifyFace}
          disabled={!modelsLoaded || loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify Face"}
        </button>
      </div>

      <p className="mt-4">{message}</p>
    </div>
  );
};

export default FaceVerification;
