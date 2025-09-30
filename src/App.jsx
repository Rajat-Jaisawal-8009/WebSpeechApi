import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
 const recognition = SpeechRecognition.getRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>⚠️ Browser Speech Recognition support नहीं करता।</span>;
  }

   let silenceTimer;
  
 const resetSilenceTimer = () => {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
   SpeechRecognition.stopListening();
   
    }, 4000);
  };

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,   // लगातार सुनता रहेगा
      interimResults: true, // typing effect जैसा दिखेगा
      language: "en-US",
    });

    if(recognition){
  const originalOnResult = recognition.onresult;
  recognition.onresult = (event) => {
    if (silenceTimer) clearTimeout(silenceTimer);
        if (typeof originalOnResult === "function") {
        originalOnResult(event)
        console.log("afhkahfgkhg")
         resetSilenceTimer(); 
        }
   
  };
}
resetSilenceTimer()
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🎤 React Speech Recognition De</h2>
      <p><b>Status:</b> {listening ? "Listening..." : "Stopped"}</p>

      <button onClick={startListening}>Start???</button>
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
