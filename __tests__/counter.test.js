const { CounterUtils } = require('../src/model/dao/counter')
const defs = require('../src/common/definitions')

const counter = new CounterUtils('QWayDB')

const getVal = async () => {
    const val = await counter.next(defs.prefix.PRODUCT_FRUITS)
    console.log(val.value)
}

getVal()

