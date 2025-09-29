import { useRef, useState } from 'react'
import './App.css'

function App() {
const [text, setText] = useState("")
const timeoutRef = useRef()

  const startSTTHandle = ()=>{

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


const recognition = new SpeechRecognition()

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US"

const stopRecognition = ()=>{
timeoutRef.current  =  setTimeout(()=>{
  console.log("khatam")
recognition.stop();
},4000)}
let silenceTimer;
recognition.start()


recognition.onspeechstart = () => {
   
  console.log("User बोल रहा है...");
    clearTimeout(timeoutRef.current)
};



recognition.onresult = (event)=>{

  console.log(event.results)

clearTimeout(silenceTimer);
  silenceTimer = setTimeout(() => {
    console.log("⏳ Silence detect: User ने बोलना बंद कर दिया (custom timeout)");
    recognition.stop();
      for(let i=0; i<event.results.length; i++){
    const result = event.results[i][0].transcript;
    if(event.results[i].isFinal){
setText(pre=>pre +" "+ result)}
}
  }, 4000); 
    





}
stopRecognition()
  }

  return (
    <>
     
     <button onClick={startSTTHandle}> Start Mic...</button>
     <div>{text}</div>
    </>
  )
}

export default App
