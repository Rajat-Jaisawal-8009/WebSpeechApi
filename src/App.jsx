import { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function App() {
  const { transcript, listening } = useSpeechRecognition();
  const [text, setText] = useState("")
  const [message, setMessage] = useState("");
  const silenceTimerRef = useRef(null);

  
    const recognition = SpeechRecognition.getRecognition();

     const resetSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      console.log("❌ 5 sec silence detected → stopListening()");
      SpeechRecognition.stopListening();
      setMessage("Mic बंद हो गया (5 sec silence)");
    }, 5000); // 5 seconds
  };

    if (recognition) {
      // जब भी speech result आए → timer reset
          const originalOnResult = recognition.onresult;
      recognition.onresult = (event) => {
        if (typeof originalOnResult === "function") {
        originalOnResult(event);
            setMessage("User बोल रहा है...");

        resetSilenceTimer();
      }

    
      };

      // जब बोलना खत्म हो (speechend) detect हो
      recognition.onspeechend = () => {
        console.log("⏹ Speech ended, waiting for 5 sec silence...");
        resetSilenceTimer();
      };
    }


 

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true,interimResults: true, language: "en-IN" });
    setMessage("Listening शुरू...");
    resetSilenceTimer();
  };

  return (
    <div>
      <p>🎤 Listening: {listening ? "Yes" : "No"}</p>
      <p>Transcript: {transcript}</p>
      <p>Status: {message}</p>
      <button onClick={startListening}>Start...</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
    </div>
  );
}

export default App;
