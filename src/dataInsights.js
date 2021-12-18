const a = require('./data/myjsonfile.json')
const words = {}
a.forEach(({name})=>{
    const song =name.split("\n").splice(0,4).join(" ").split(" ")
    song.forEach(word=>{
        if (words[word] ===  undefined) {
            words[word] = 0;
        }
        words[word]++
    })
})
const filtered = Object.entries(words).filter(([word,count])=>count >= 5 && !!word).sort((a,b)=>b[1]-a[1])
console.log(filtered)
const fs = require('fs')
fs.writeFileSync('words.json', JSON.stringify(filtered), "utf8");