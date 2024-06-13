'use strict'

let gElCanvas
let gCtx

function onInit(){
    gElCanvas= document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function renderMeme(){
    const meme = getMeme()
    const img = new Image()
    img.src = getImgById(meme.selectedImgId).url
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTexts(meme.lines)
}

function drawTexts(lines){
    lines.forEach(line => {
        drawText(line.txt)
    });
}

function drawText(txt=''){
    gCtx.font = '20px Arial'
    gCtx.fillStyle = 'white'
    gCtx.fillText(txt,250-txt.length*5,50)
}

function onSetLineText(idx,txt){
    setLineText(idx,txt)
    renderMeme()
}

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent
}

