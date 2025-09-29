import { useRef, useState } from 'react'
import './App.css'

function App() {
const [text, setText] = useState("")
const timeoutRef = useRef()

  const startSTTHandle = ()=>{

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


const recognition = new SpeechRecognition()
console.log(recognition)
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US"

const stopRecognition = ()=>{
timeoutRef.current  =  setTimeout(()=>{
recognition.stop();
},6000)}

recognition.start()

let ind = 0
recognition.onresult = (event)=>{
  clearTimeout(timeoutRef.current)
  console.log(event.results)
  for(let i=ind; i<event.results.length; i++){
    const result = event.results[i][0].transcript;
if(event.results[i].isFinal){
setText(pre=>pre +" "+ result)
}
}
ind += 1
stopRecognition()
}
stopRecognition()
  }

  return (
    <>
     
     <button onClick={startSTTHandle}> Start Mic</button>
     <div>{text}</div>
    </>
  )
}

export default App
