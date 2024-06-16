'use strict'

let gImgs = [
    { id: '1', url: `img/1.jpg`, keywords: ['trump'] },
    { id: '2', url: `img/2.jpg`, keywords: ['dog', 'dogs', 'licking'] },
    { id: '3', url: `img/3.jpg`, keywords: ['dog', 'baby'] },
    { id: '4', url: `img/4.jpg`, keywords: ['computer', 'cat', 'sleep'] },
    { id: '5', url: `img/5.jpg`, keywords: ['baby', 'yes', 'success'] },
    { id: '6', url: `img/6.jpg`, keywords: ['crazy', 'guy', 'smile'] },
    { id: '7', url: `img/7.jpg`, keywords: ['crazy', 'baby'] },
    { id: '8', url: `img/8.jpg`, keywords: ['crazy', 'smile', 'hat'] },
    { id: '9', url: `img/9.jpg`, keywords: ['crazy', 'smile', 'evil', 'baby'] },
    { id: '10', url: `img/10.jpg`, keywords: ['laugh', 'smile', 'obama'] },
    { id: '11', url: `img/11.jpg`, keywords: ['kiss', 'boys'] },
    { id: '12', url: `img/12.jpg`, keywords: ['haim', 'you'] },
    { id: '13', url: `img/13.jpg`, keywords: ['cheers', 'leonardo'] },
    { id: '14', url: `img/14.jpg`, keywords: ['morphius', 'sunglasses', 'wow'] },
    { id: '15', url: `img/15.jpg`, keywords: ['zero'] },
    { id: '16', url: `img/16.jpg`, keywords: ['shame', 'laugh'] },
    { id: '17', url: `img/17.jpg`, keywords: ['two', 'putin'] },
    { id: '18', url: `img/18.jpg`, keywords: ['toy', 'buzz'] },
]

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red',
            strokeColor: 'Black',
            font: 'impact',
            txtAlign: 'start',
            pos: { x: 0, y: 50 }
        },
        {
            txt: 'I love pasta',
            size: 20,
            color: 'green',
            strokeColor: 'Black',
            font: 'impact',
            txtAlign: 'start',
            pos: { x: 0, y: 100 }
        }
    ],
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2, 'laugh': 3, 'crazy':7,'putin': 1, 'smile': 6}

let gStickers = ['😎', '🤯', '🤓', '😜', '😍', '🥹', '😱', '😏']

function getStickers() {
    return gStickers
}

function getKeywords() {
    return gKeywordSearchCountMap
}

function getMeme() {
    return gMeme
}

function getMemeLines() {
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

function setColor(color) {
    getSelectedLine().color = color
}

function setStrokeColor(color) {
    getSelectedLine().strokeColor = color
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

function addSticker(sticker) {
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push({
        txt: sticker,
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

function getImgs(filterBy) {
    const search = filterBy.search
    const keywords = filterBy.keywords
    let imgs = gImgs
    imgs = imgs.filter(img => {
        for (let i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i].includes(search)) return true
        }
        return false
    })
    if (keywords.length === 0) return imgs
    imgs = imgs.filter(img => {
        for (let i = 0; i < keywords.length; i++) {
            if (!img.keywords.includes(keywords[i])) return false
        }
        return true
    })
    return imgs
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function getCurrImgUrl() {
    return getImgById(gMeme.selectedImgId).url
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function _createImgs() {
    const imgs = []
    for (let i = 1; i <= 18; i++) {
        imgs.push(_createImg(i))
    }
    return imgs
}

function _createImg(id) {
    return {
        id: id + '',
        url: `img/${id}.jpg`,
        keywords: ['funny', 'meme']
    }
}

function increaseKeywordCount(keyword) {
    if (!gKeywordSearchCountMap[keyword]) gKeywordSearchCountMap[keyword] = 0
    gKeywordSearchCountMap[keyword]++
}

function setFontFamily(fontFamily) {
    getSelectedLine().font = fontFamily
}

function setTextAlign(align) {
    switch (align) {
        case 'left':
            align = 'start'
            break
        case 'center':
            align = 'center'
            break
        case 'right':
            align = 'end'
            break

    }
    getSelectedLine().txtAlign = align
}