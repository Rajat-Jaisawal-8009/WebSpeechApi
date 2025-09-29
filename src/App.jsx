import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  const startSTTHandle = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support SpeechRecognition!");
      return;
    }

    // हर बार नया instance न बने, इसलिए useRef में रखो
    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // जब result आए
      recognition.onresult = (event) => {
        const result = event.results[event.resultIndex]; // सिर्फ latest result लो

        if (result.isFinal) {
          setText((prev) => prev + " " + result[0].transcript);
        }

        // हर बार बोलने पर timer reset करो
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          console.log("⏳ Silence detect: User ने बोलना बंद कर दिया");
          recognition.stop();
        }, 4000);
      };

      recognition.onspeechstart = () => {
        console.log("🎤 User बोल रहा है...");
        clearTimeout(silenceTimerRef.current);
      };

      recognition.onspeechend = () => {
        console.log("🛑 Speech end detect हुआ");
      };

      recognition.onend = () => {
        console.log("Recognition बंद हो गया");
      };

      recognition.onerror = (e) => {
        console.error("❌ Error:", e.error);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    console.log("Mic चालू हो गया...");
  };

  return (
    <>
      <button onClick={startSTTHandle}>🎤 Start Mic</button>
      <div style={{ marginTop: "20px" }}>{text}</div>
    </>
  );
}

export default App;
