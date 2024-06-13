'use strict'

function renderGallery(){
    const imgs = getImgs()
    const imgsHtml = imgs.reduce((acc, img) => {
        acc += `<img src="${img.url}" data-id="${img.id}" onclick="onImgSelect('${img.id}')">`
        return acc
        }, '')
    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = imgsHtml
}

function onImgSelect(id){
    document.querySelector('.gallery').classList.add('hide')
    setImg(id)
    renderMeme()
    document.querySelector('.editor').classList.remove('hide')
}