const pluralize = require('pluralize')
const CATEGORY_PRODUCT = {
    fruit : {
        juice: 'juice',
        puree: 'puree',
        sauce: 'sauce', // compote
        real: 'fruit',
        dried: 'dried',
        sliced: 'sliced',
        chips: 'chips',
        jam: 'jam',
        snacks: 'fruit snack'
    }
}

class ParseItem {
    constructor () {}

    /**
     * Parse the label by extracting the product name and its type
     * product name apple
     * type fruit OR dried OR sauce OR puree
     * @param { String } label, Compass Crispy Apple Cinnamon Chips
     * @param { String } keyword, Apples 
     * @param { String } category, Fruits
     */
    async parse(label, keyword, category) {

        console.log(`= = = = = =\nProcessing ${label}...`)
        // FIXME, will use JOI or JSON Schema
        if (!label && !keyword && !category) {
            throw new Error('Missing parameters')
        }
        label = label.toLocaleLowerCase()
        keyword = keyword.toLocaleLowerCase()
        category = category.toLocaleLowerCase()

        const item = {}
        const lengthWords = label.split(' ').length
        const words = label.split(', ') // FIXME only for walmart? Apple, Red Delicious, Your Fresh Market

        const itemName = pluralize.singular(keyword).toLocaleLowerCase()
        const _category = pluralize.singular(category).toLocaleLowerCase()

        if (lengthWords === 1 || words.length >= 2) {
            if (words[0] === keyword || pluralize.singular(words[0]) === itemName) {
                item.name = itemName
                item.category = _category
                if (words.length >= 2) {
                    item.type = words[1]
                }
                return item
            }
            item.name = label
            return item
        } else {
            if (label.includes(itemName)) {
                item.name = itemName
                item.type = undefined
                item.category = await this._getCategory(label, _category)
                return item
            } else {
                // FIXME should be logged in DB as exception
                console.log(`${itemName} not found for ${label}.`)
                return null
            }
        }
    }

    async _getCategory(label, category) {
        for (const cat in CATEGORY_PRODUCT[category]) {
            if (label.includes(cat)) {
                return cat
            }
        }
        return undefined
    }
}

module.exports = { ParseItem }