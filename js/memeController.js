'use strict'

let gElCanvas
let gCtx

function onInit(){
    gElCanvas= document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImgs()
}

function renderImgs(){
    const imgs = getImgs()
    const imgsHtml = imgs.reduce((acc, img) => {
        acc += `<img src="${img.url}" onclick="onImgClicked('${img.id}')">`
        return acc
        }, '')
    const elImgsContainer = document.querySelector('.imgs-container')
    console.log(imgsHtml);
    elImgsContainer.innerHTML = imgsHtml
}

function onImgClicked(id){
    document.querySelector('.gallery').classList.add('hide')
    setMeme()
    renderMeme(getImgById(id))
    document.querySelector('.editor').classList.remove('hide')
}

function renderMeme(img){
    const meme = getMeme()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText('Text')
}

function drawText(txt){
    gCtx.font = '20px Arial'
    gCtx.fillStyle = 'white'
    gCtx.fillText(txt,250,50)
}