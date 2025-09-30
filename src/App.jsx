import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>⚠️ Browser Speech Recognition support नहीं करता।</span>;
  }

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,   // लगातार सुनता रहेगा
      interimResults: true, // typing effect जैसा दिखेगा
      language: "en-US",
    });

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🎤 React Speech Recognition Demo</h2>
      <p><b>Status:</b> {listening ? "Listening..." : "Stopped"}</p>

      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <b>Transcript:</b>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
