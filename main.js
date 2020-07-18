const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const bkgColor = '#1e1e1e'
const secondsHandColor = '#A04030'
const mainHandsColor = '#999'

// center coordinates & radius
const xCenterClock = canvas.width / 2
const yCenterClock = canvas.height / 2
const radiusClock = xCenterClock - 10

// numbers radius & hands length
const radiusNum = radiusClock - 10
const lengthSeconds = radiusNum - 10
const lengthMinutes = radiusNum - 20
const lengthHour = lengthMinutes / 1.5

// util functions
const radOverDeg = Math.PI / 180
const halfPI = Math.PI / 2
const secToRad = (sec) => -6 * sec * radOverDeg
const getKx = (sec) => Math.cos(secToRad(sec) + halfPI)
const getKy = (sec) => -Math.sin(secToRad(sec) + halfPI)

function displayCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // clock circle
  ctx.fillStyle = mainHandsColor
  ctx.strokeStyle = mainHandsColor
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(xCenterClock, yCenterClock, radiusClock, 0, 2 * Math.PI, true)
  ctx.moveTo(xCenterClock, yCenterClock)
  ctx.stroke()
  ctx.closePath()

  // clock ticks
  let radiusPoint
  ctx.beginPath()
  ctx.lineWidth = 3
  for (let tm = 0; tm < 60; tm++) {
    if (tm % 5 == 0) {
      radiusPoint = 10
    } else {
      radiusPoint = 5
    }
    const xPointM = xCenterClock + radiusNum * getKx(tm)
    const yPointM = yCenterClock - radiusNum * getKy(tm)

    ctx.moveTo(xPointM, yPointM)
    ctx.lineTo(
      xPointM + radiusPoint * getKx(tm),
      yPointM - radiusPoint * getKy(tm)
    )
    ctx.stroke()
  }
  ctx.closePath()

  // put numbers
  ctx.beginPath()
  for (let th = 1; th <= 12; th++) {
    ctx.font = 'bold 2rem sans-serif'
    let xText = xCenterClock + (radiusNum - 30) * getKx(5 * th)
    let yText = yCenterClock + (radiusNum - 30) * getKy(5 * th)
    if (th <= 9) {
      ctx.fillText(th, xText - 5, yText + 10)
    } else {
      ctx.fillText(th, xText - 15, yText + 10)
    }
    ctx.fill()
  }
  ctx.closePath()

  // draw jands
  const d = new Date()
  const sec = d.getSeconds() // sec angle
  const minute = 6 * d.getMinutes() + sec / 10 // min angle
  const hour = 30 * d.getHours() + minute / 12 // hour angle

  // draw seconds hand
  ctx.beginPath()
  ctx.strokeStyle = secondsHandColor
  ctx.moveTo(xCenterClock, yCenterClock)
  ctx.lineTo(
    xCenterClock + lengthSeconds * getKx(sec),
    yCenterClock + lengthSeconds * getKy(sec)
  )
  ctx.stroke()
  ctx.closePath()

  // draw minute hand
  ctx.beginPath()
  ctx.strokeStyle = mainHandsColor
  ctx.lineWidth = 3
  ctx.moveTo(xCenterClock, yCenterClock)
  ctx.lineTo(
    xCenterClock + lengthMinutes * getKx(minute / 6),
    yCenterClock + lengthMinutes * getKy(minute / 6)
  )
  ctx.stroke()
  ctx.closePath()

  // draw hour hand
  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.moveTo(xCenterClock, yCenterClock)
  ctx.lineTo(
    xCenterClock + lengthHour * getKx(hour / 30), // Math.cos(halfPI - hour * radOverDeg),
    yCenterClock + lengthHour * getKy(hour / 30) // Math.sin(halfPI - hour * radOverDeg)
  )
  ctx.stroke()
  ctx.closePath()

  // draw center
  ctx.beginPath()
  ctx.lineWidth = 3
  ctx.arc(xCenterClock, yCenterClock, 5, 0, 2 * Math.PI, true)
  ctx.fill()
  ctx.closePath()
}

window.setInterval(function () {
  let d = new Date()
  document.getElementById('clock').innerHTML = d.toLocaleTimeString()
  displayCanvas()
}, 1000)
