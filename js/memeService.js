'use strict'

let gImgs = [
    { id: '1', url: 'img/1.jpg', keywords: ['funny', 'trump'] },
    { id: '2', url: 'img/2.jpg', keywords: ['funny', 'dogs'] }
]

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red',
            pos: { x: 0, y: 50 }
        },
        {
            txt: 'I love pasta',
            size: 20,
            color: 'green',
            pos: { x: 0, y: 100 }
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLinePos(line,posDiff){
    line.pos.x += posDiff.x
    line.pos.y += posDiff.y
}

function setLineText(txt) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) gMeme.lines[gMeme.selectedLineIdx] = {}
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(selectedImgId) {
    gMeme.selectedImgId = selectedImgId
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push({
        txt: 'Text',
        size: 20,
        color: 'green',
        pos: { x:  (gMeme.selectedLineIdx+1)*50, y:  (gMeme.selectedLineIdx+1)*50 }
    })
}

function switchLine(){
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx>gMeme.lines.length-1) gMeme.selectedLineIdx= 0
    return gMeme.lines[gMeme.selectedLineIdx]
}





function getImgs() {
    return gImgs
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}