import { useState, useEffect, useRef } from "react";
import { Button, Form, Alert, ProgressBar } from "react-bootstrap";
import { FaMicrophone, FaMicrophoneSlash, FaLanguage } from "react-icons/fa";

const SUPPORTED_LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "hi-IN", name: "हिंदी (Hindi)" },
  { code: "kn-IN", name: "ಕನ್ನಡ (Kannada)" }
];

export default function SpeechToText({ setInputText, handleSend }) {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [isSupported, setIsSupported] = useState(true);
  const recognition = useRef(null);
  const mediaStream = useRef(null);
  const animationFrameId = useRef(null);
  const timerInterval = useRef(null);
  const audioContextRef = useRef(null);
  const finalTranscript = useRef("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = selectedLanguage;
      recognition.current.maxAlternatives = 1;

      recognition.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript.current += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }
        setInputText(finalTranscript.current + interimTranscript);
      };

      recognition.current.onerror = (event) => {
        let errorMessage = "Error occurred";
        switch (event.error) {
          case "no-speech":
            errorMessage = "No speech detected";
            break;
          case "aborted":
            errorMessage = "Recording aborted";
            break;
          case "audio-capture":
            errorMessage = "Microphone not found";
            break;
          case "network":
            errorMessage = "Network error";
            break;
          case "not-allowed":
            errorMessage = "Microphone access denied";
            break;
          case "service-not-allowed":
            errorMessage = "Speech recognition service not allowed";
            break;
          default:
            errorMessage = `Error: ${event.error}`;
        }
        setStatus(errorMessage);
        stopRecording();
      };

      recognition.current.onend = () => {
        if (isRecording) recognition.current.start();
      };
    } else {
      setIsSupported(false);
      setStatus("Speech recognition not supported in this browser");
    }
  }, [selectedLanguage]);

  const startRecording = async () => {
    if (!recognition.current) return;

    finalTranscript.current = "";
    setIsRecording(true);
    setStatus("Listening...");
    setTimer(0);
    setInputText("");

    timerInterval.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      audioContextRef.current = new AudioContext();
      const analyser = audioContextRef.current.createAnalyser();
      const microphone = audioContextRef.current.createMediaStreamSource(stream);

      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        setAudioLevel(average);
        animationFrameId.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    } catch (err) {
      setStatus("Microphone access denied. Please check your permissions.");
      stopRecording();
    }

    recognition.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStatus("Recording stopped");
    clearInterval(timerInterval.current);
    cancelAnimationFrame(animationFrameId.current);

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (recognition.current) {
      recognition.current.stop();
    }

    const finalText = finalTranscript.current.trim();
    setInputText(finalText);
    if (finalText && handleSend) {
      handleSend();
    }
  };

  if (!isSupported) {
    return (
      <Alert variant="warning" className="mb-3">
        Speech recognition is not supported in your browser. Please try Chrome or Edge.
      </Alert>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div className="d-flex align-items-center gap-2 w-100">
        <FaLanguage className="text-primary" />
        <Form.Select
          size="sm"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="flex-grow-1"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <Button
        variant={isRecording ? "danger" : "outline-primary"}
        onClick={isRecording ? stopRecording : startRecording}
        className="rounded-circle p-3 shadow-sm microphone-btn"
        style={{
          transition: "all 0.3s",
          transform: isRecording ? "scale(1.1)" : "scale(1)",
          width: "60px",
          height: "60px",
        }}
      >
        {isRecording ? (
          <FaMicrophoneSlash size={24} className="pulse-icon" />
        ) : (
          <FaMicrophone size={24} />
        )}
      </Button>

      {isRecording && (
        <div className="d-flex flex-column align-items-center gap-2 w-100">
          <div className="d-flex align-items-center gap-2 small text-primary w-100">
            <div className="recording-status">
              <div className="pulsating-dot"></div>
              <div className="waveform">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="wave" />
                ))}
              </div>
            </div>
            <div className="timer ms-auto">{timer}s</div>
          </div>

          <div className="audio-level-indicator w-100">
            <ProgressBar
              now={Math.min(audioLevel * 2, 100)}
              variant="primary"
              animated
              className="mb-1"
            />
            <div className="level-text text-center small">
              {audioLevel > 50
                ? "Loud"
                : audioLevel > 25
                ? "Moderate"
                : "Quiet"}
            </div>
          </div>
        </div>
      )}

      {status && (
        <div className="status-message w-100">
          <div className="d-flex align-items-center gap-2">
            <div
              className="spinner-grow spinner-grow-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="small">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}
