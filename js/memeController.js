'use strict'

let gElCanvas
let gCtx
let gStartPos
let gSelectedLine

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    renderKeywords()
    renderGallery()

    gSelectedLine = false
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log(gCtx);
    gCtx.fillStyle = 'white'
    resizeCanvas()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
    addMouseListeners()
    addTouchListeners()
    renderStickers()
}

function renderStickers(){
    const stickers = getStickers()
    const strHTML = stickers.reduce((acc,sticker)=>{
        acc += `<button>${sticker}</button>`
        return acc
    },'')
    const elStickersContainer = document.querySelector('.stickers-container')
    elStickersContainer.innerHTML = strHTML
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 20
    gElCanvas.height = elContainer.offsetHeight - 20
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

function getClickedLineIdx(pos) {
    return getMeme().lines.findIndex(line => {
        gCtx.font = line.size + 'px ' + line.font
        const width = gCtx.measureText(line.txt).width
        const height = line.size * 1.2
        const left = line.pos.x
        const top = line.pos.y - height / 2
        const right = line.pos.x + width
        const bottom = line.pos.y + height / 2
        if (pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom) {
            return line
        }
    })
}

function onDown(ev) {
    ev.preventDefault()
    gStartPos = getEvPos(ev)
    const clickedLineIdx = getClickedLineIdx(gStartPos)
    if (clickedLineIdx === -1) return
    gSelectedLine = getMeme().lines[clickedLineIdx]
    switchLine(clickedLineIdx)
    renderMeme()
    drawControlBox()
    const elTextInput = document.querySelector('.input-txt')
    elTextInput.value = gSelectedLine.txt
    elTextInput.focus()
}

function onMove(ev) {
    if (!gSelectedLine) return

    const pos = getEvPos(ev)
    const posDiff = {
        x: pos.x - gStartPos.x,
        y: pos.y - gStartPos.y
    }
    moveLine(posDiff)

    gStartPos = pos

}

function onUp() {
    gSelectedLine = null
}

function moveLine(pos) {
    setLinePos(gSelectedLine, pos)
    renderMeme()
    drawControlBox()
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function renderMeme() {
    const img = new Image()
    img.src = getCurrImgUrl()
    gCtx.beginPath()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTexts()
}

function drawTexts() {
    const lines = getMemeLines()
    lines.forEach(line => {
        drawText(line)
    });
}

function drawText(line) {
    gCtx.beginPath()
    gCtx.font = line.size + 'px ' + line.font
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = line.txtAlign
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
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

function onSetFontFamily(fontFamily){
    setFontFamily(fontFamily)
    renderMeme()
}

function onSetColor(color) {
    getMeme().lines[getMeme().selectedLineIdx].color = color
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
    gSelectedLine = switchLine()
    renderMeme()
    drawControlBox()
    const elTextInput = document.querySelector('.input-txt')
    elTextInput.value = gSelectedLine.txt
    elTextInput.focus()
}

function drawControlBox() {
    gCtx.beginPath()
    gCtx.font = gSelectedLine.size + 'px ' + gSelectedLine.font
    const width = gCtx.measureText(gSelectedLine.txt).width
    const height = gSelectedLine.size
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(gSelectedLine.pos.x, gSelectedLine.pos.y - height, width, height * 1.2)
}

function onSetTextAlign(align){
    setTextAlign(align)
    renderMeme()
}