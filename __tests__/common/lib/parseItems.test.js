const { ParseItem } = require('../../../src/common/lib/parseItems')
const jsonItems = require('../../../misc/apple-fruits-walmart.json')

const run = async () => {
    const parser = new ParseItem()
    for (const item of jsonItems) {
        const i = await parser.parse(item, 'apples', 'fruits')
        if (i) {
            console.log(`${item} >>> ${i.name} - ${i.category} - ${i.type}`)
        }
    }
}

run()