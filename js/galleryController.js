'use strict'

let gFilterBy = {
    search: '',
    keywords: []
}

function renderGallery() {
    const imgs = getImgs(gFilterBy)
    const imgsHtml = imgs.reduce((acc, img) => {
        acc += `<img src="${img.url}" data-id="${img.id}" onclick="onImgSelect('${img.id}')">`
        return acc
    }, '')
    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = imgsHtml
}

function onImgSelect(id) {
    document.querySelector('.gallery').classList.add('hide')
    setImg(id)
    renderMeme()
    document.querySelector('.editor').classList.remove('hide')
}

function renderKeywords() {
    const keywordsMap = getKeywords()
    let strHTML = ''
    for (let keyword in keywordsMap) {
        const markedClass = (gFilterBy.keywords.indexOf(keyword)>=0) ? 'marked' : ''
        strHTML += `<button class="keyword ${markedClass}" onclick="onKeywordClick(this.innerText)" style="font-size: calc(0.8095238095rem + ${keywordsMap[keyword]} * 0.05em)">${keyword}</button>`
    }
    const elKeywordsContainer = document.querySelector('.keywords-container')
    elKeywordsContainer.innerHTML = strHTML
}

function onSetFilterBySearch(search){
    gFilterBy.search=search
    renderGallery()
}

function onKeywordClick(keyword){
    keyword = keyword.toLowerCase()
    const idx = gFilterBy.keywords.indexOf(keyword)
    if (idx === -1) {
        gFilterBy.keywords.push(keyword)
        increaseKeywordCount(keyword)
    } else {
        gFilterBy.keywords.splice(idx,1)
    }
    renderGallery()
    renderKeywords()
}