'use strict'

let gImgs = _createImgs()

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red',
            font: 'Impact',
            txtAlign: 'start',
            pos: { x: 0, y: 50 }
        },
        {
            txt: 'I love pasta',
            size: 20,
            color: 'green',
            font: 'Impact',
            txtAlign: 'start',
            pos: { x: 0, y: 100 }
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getMemeLines(){
    return gMeme.lines
}

function setLinePos(line, posDiff) {
    line.pos.x += posDiff.x
    line.pos.y += posDiff.y
}

function setLineText(txt) {
    const selectedLine = getSelectedLine()
    if (!selectedLine) selectedLine = {}
    selectedLine.txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setFontSize(diff) {
    getSelectedLine().size += diff
}

function setColor(color){
    getSelectedLine().color = color
}

function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push({
        txt: 'Text',
        size: 20,
        color: 'white',
        font: 'Impact',
        txtAlign: 'start',
        pos: { x: (gMeme.selectedLineIdx + 1) * 50, y: (gMeme.selectedLineIdx + 1) * 50 }
    })
}

function switchLine(idx = null) {
    if (idx === null) {
        gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx = idx
        return getSelectedLine()
}

function getImgs() {
    return gImgs
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function getCurrImgUrl(){
    return getImgById(gMeme.selectedImgId).url
}

function getSelectedLine(){
    return gMeme.lines[gMeme.selectedLineIdx]
}

function _createImgs(){
    const imgs = []
    for (let i=1 ; i<=18 ; i++){
        imgs.push(_createImg(i))
    }
    return imgs
}

function _createImg(id){
    return {
        id: id +'',
        url: `img/${id}.jpg`,
        keywords: ['funny','meme']
    }
}