'use strict'

let gElCanvas
let gCtx
let gStartPos
let gClickedLine

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log(gCtx);
    gCtx.fillStyle = 'white'
    renderGallery()
    addMouseListeners()
    addTouchListeners()
    gClickedLine = false
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gStartPos = getEvPos(ev)
    gClickedLine = getClickedLine(gStartPos)
    console.log(gClickedLine);
    if(!gClickedLine) return
    const elTextInput = document.querySelector('.input-txt')
    elTextInput.value = gClickedLine.txt
    
}

function onMove(ev) {
    if (!gClickedLine) return

    const pos = getEvPos(ev)
    const posDiff = {
        x: pos.x - gStartPos.x,
        y: pos.y - gStartPos.y
    }
    moveLine(posDiff)

    gStartPos = pos

}

function onUp() {
    gClickedLine = null
}

function moveLine(pos){
    setLinePos(gClickedLine,pos)
    renderMeme()
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function getClickedLine(pos) {
    return getMeme().lines.find(line => {
        gCtx.font = line.size + 'px Arial'
        const width = gCtx.measureText(line.txt).width
        const height = line.size
        if (pos.x >= line.pos.x && pos.x <= width && pos.y <= line.pos.y*1.1 && pos.y >= line.pos.y - (height)) {
            return line
        }
    })
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).url
    gCtx.beginPath()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTexts(meme.lines)
}

function drawTexts(lines) {
    lines.forEach(line => {
        drawText(line)
    });
}

function drawText(line) {
    gCtx.beginPath()
    gCtx.font = line.size + 'px Arial'
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
}

function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent
}

function onSetFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onSetColor(color) {
    gCtx.fillStyle = color
    renderMeme()
}

function onAddLine() {
    addLine()
    const elTextInput = document.querySelector('.input-txt')
    elTextInput.value = 'Text'
    elTextInput.focus()
    renderMeme()
}

function onSwitchLine() {
    const line = switchLine()
    renderMeme()
    drawControlBox(line)
    const elTextInput = document.querySelector('.input-txt')
    elTextInput.value = line.txt
    elTextInput.focus()
}

function drawControlBox(line) {
    gCtx.beginPath()
    gCtx.font = line.size + 'px Arial'
    const width = gCtx.measureText(line.txt).width
    const height = line.size * 1.2
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(line.pos.x, line.pos.y - height, width, height * 1.2)
}