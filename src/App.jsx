import { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function App() {
  const { transcript, listening } = useSpeechRecognition();
  const [message, setMessage] = useState("");
  const silenceTimerRef = useRef(null);

  useEffect(() => {
    const recognition = SpeechRecognition.getRecognition();

    if (recognition) {
      // जब भी speech result आए → timer reset
      recognition.onresult = (event) => {
        let result = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          result += event.results[i][0].transcript;
        }
        console.log("🎤 User said:", result);
        setMessage("User बोल रहा है...");

        // reset silence timer
        resetSilenceTimer();
      };

      // जब बोलना खत्म हो (speechend) detect हो
      recognition.onspeechend = () => {
        console.log("⏹ Speech ended, waiting for 5 sec silence...");
        resetSilenceTimer();
      };
    }
  }, []);

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      console.log("❌ 5 sec silence detected → stopListening()");
      SpeechRecognition.stopListening();
      setMessage("Mic बंद हो गया (5 sec silence)");
    }, 5000); // 5 seconds
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
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
