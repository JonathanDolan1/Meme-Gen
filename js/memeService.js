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
            size: 20,
            color: 'red'
        }
    ]

}
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

// functiopsetLineTxt()

function setMeme(id,selectedLineIdx = 0,lines=[]) {
    gMeme = {
        
    }
}

function getImgs(){
    return gImgs
}

function getImgById(id){
    return gImgs.find(img => img.id === id)
}