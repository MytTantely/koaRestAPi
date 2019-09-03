const pluralize = require('pluralize')
const plurals = require('../../misc/list-fruits.json')
for(const val of plurals) {
    const sing = pluralize.singular(val)
    console.log(`${val} >>> ${sing}`)
}