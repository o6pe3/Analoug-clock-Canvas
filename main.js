const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const bkgColor = '#1e1e1e'
const secondsHandColor = '#A04030'
const mainHandsColor = '#999'

// center coordinates & radius
const xCenterClock = canvas.width / 2
const yCenterClock = canvas.height / 2
const radiusClock = xCenterClock - 10

// numbers radius & hands length & tickSize
const radiusNum = radiusClock - 10
const lengthSeconds = radiusNum - 10
const lengthMinutes = radiusNum - 20
const lengthHour = lengthMinutes / 1.5
const tickSize = 5

// util functions
const radOverDeg = Math.PI / 180
const halfPI = Math.PI / 2
const secToRad = (sec) => 6 * sec * radOverDeg
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
  ctx.beginPath()
  ctx.lineWidth = 3
  for (let m = 0; m < 60; m++) {
    let tickLength = m % 5 == 0 ? 2 * tickSize : tickSize
    const xPointM = xCenterClock + radiusNum * getKx(m)
    const yPointM = yCenterClock + radiusNum * getKy(m)

    ctx.moveTo(xPointM, yPointM)
    ctx.lineTo(xPointM + tickLength * getKx(m), yPointM + tickLength * getKy(m))
    ctx.stroke()
  }
  ctx.closePath()

  // put numbers
  ctx.beginPath()
  for (let h = 1; h <= 12; h++) {
    ctx.font = 'bold 2rem sans-serif'
    let xText = xCenterClock - (radiusNum - 30) * getKx(5 * h)
    let yText = yCenterClock + (radiusNum - 30) * getKy(5 * h)
    if (h <= 9) {
      ctx.fillText(h, xText - 5, yText + 10)
    } else {
      ctx.fillText(h, xText - 15, yText + 10)
    }
    ctx.fill()
  }
  ctx.closePath()

  // draw hands
  const d = new Date()
  const sec = d.getSeconds()
  const minute = 6 * d.getMinutes() + sec / 10 // min angle
  const hour = 30 * d.getHours() + minute / 10 // hour angle

  // draw seconds hand
  ctx.beginPath()
  ctx.strokeStyle = secondsHandColor
  ctx.moveTo(xCenterClock, yCenterClock)
  ctx.lineTo(
    xCenterClock - lengthSeconds * getKx(sec),
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
    xCenterClock - lengthMinutes * getKx(minute / 6),
    yCenterClock + lengthMinutes * getKy(minute / 6)
  )
  ctx.stroke()
  ctx.closePath()

  // draw hour hand
  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.moveTo(xCenterClock, yCenterClock)
  ctx.lineTo(
    xCenterClock - lengthHour * getKx(hour / 6),
    yCenterClock + lengthHour * getKy(hour / 6)
  )
  ctx.stroke()
  ctx.closePath()

  // draw center
  ctx.beginPath()
  ctx.arc(xCenterClock, yCenterClock, 5, 0, 2 * Math.PI, true)
  ctx.fill()
  ctx.closePath()
}

window.setInterval(function () {
  let date = new Date()
  document.getElementById('clock').innerHTML = date.toLocaleTimeString()
  displayCanvas()
}, 1000)
