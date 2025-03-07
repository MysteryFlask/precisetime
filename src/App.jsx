import { useState, useEffect } from 'react'
import './style.css'

function App() {
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    const updateTime = () => {
      setTime(performance.timeOrigin + performance.now())
      requestAnimationFrame(updateTime)
    }

    requestAnimationFrame(updateTime)
  }, [])

  function convertToTime(time) {
    let microseconds = (time % 10)
    let milliseconds = (time % 1000) / 100
    let seconds = (time / 1000) % 60
    let minutes = (time / (1000 * 60)) % 60
    let hours = (time / (1000 * 60 * 60)) % 24

    hours = (hours < 10) ? `0${Math.floor(hours)}` : Math.floor(hours)
    minutes = (minutes < 10) ? `0${Math.floor(minutes)}` : Math.floor(minutes)
    seconds = (seconds < 10) ? `0${Math.floor(seconds)}` : Math.floor(seconds)
    milliseconds = Math.floor(milliseconds)
    microseconds = Math.floor(microseconds)

    return [hours, minutes, seconds, milliseconds, microseconds]
  }

  useEffect(() => {
    const temp = convertToTime(time)
    document.title = `${temp[0]}:${temp[1]}`
  }, [time])

  return (
    <>
      <span>{convertToTime(time).join(':')}</span>
    </>
  )
}

export default App
