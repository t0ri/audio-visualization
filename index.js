// AUDIO
let analyzer
let frequencyArray

function startAudio(target) {
  const audio = new Audio()
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  if (target.id === 'audio-birds') {
    audio.src = 'bird-whistling-a.wav'
  } else if (target.id === 'audio-asmr') {
    audio.src = 'asmr.mp3'
  } else if (target.id === 'audio-fire') {
    audio.src = 'fire_alarm.wav'
  }

  analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)
  frequencyArray = new Uint8Array(analyser.frequencyBinCount)

  audio.play()
}

const playBirdSongBtn = document.getElementById('audio-birds')
const playASMRBtn = document.getElementById('audio-asmr')
const playFireBtn = document.getElementById('audio-fire')
const btns = [playBirdSongBtn, playASMRBtn, playFireBtn]
btns.forEach((btn) => btn.addEventListener('click', (e) => {
  startAudio(e.target)
  render()
}))

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const centerX = 800 / 2
const centerY = 800 / 2

function render() {
  const radius = 800 / 5
  ctx.clearRect(0, 0, 800, 800)
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  
  const bars = 200
  const step = Math.PI * 2 / bars
  
  analyser.getByteFrequencyData(frequencyArray)
  
  frequencyArray.forEach((f, i) => {
    const barLength = frequencyArray[i] * 0.5
    const x1 = (Math.cos(step * i) * radius) + centerX
    const y1 = (Math.sin(step * i) * radius) + centerY
    const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
    const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY
    
    ctx.strokeStyle = `hsl(${i / 1024 * 360}, 100%, 50%)`
    
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  })

  requestAnimationFrame(render)
}

// function render() {
//   ctx.clearRect(0, 0, 800, 800)
//   ctx.fillStyle = 'black'
//   ctx.fill()
//   ctx.fillRect(0, 0, 800, 800)
  
//   analyser.getByteFrequencyData(frequencyArray)
//   frequencyArray.forEach((f, i) => {
//     ctx.beginPath()
//     let radius = f / 255 * 200
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
//     ctx.strokeStyle = `hsl(${i / 1024 * 360}, 100%, 50%)`
//     ctx.stroke()
//   })


//   requestAnimationFrame(render)
// }


// Change the lines drawn. Currently they are mapped around the circle. Change the x1, y1, and x2, y2 values to something else.
// Draw rectangles or circles. Draw one circle for each frequency. You could set the width, height, or radius based on the frequency value.