const fs = require('fs')
const path = require('path')

const listFruitsPath = path.join(__dirname, '..', 'misc', 'list-fruits.txt')

const listFruits = fs.readFileSync(listFruitsPath, 'utf8')
const fruits = listFruits.split('\n')
let fruitsJson = []
for(const fruit of fruits) {
    console.log(fruit)
    console.log('= = = = =')
    fruitsJson.push(fruit)
}

const listFruitsPathJSON = path.join(__dirname, '..', 'misc', 'list-fruits.json')
fs.writeFileSync(listFruitsPathJSON, JSON.stringify(fruitsJson))