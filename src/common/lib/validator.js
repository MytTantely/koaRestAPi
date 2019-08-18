'use strict'

const Ajv = require('ajv')
const defs = require('../definitions')
const jsonValidator = new Ajv({ allErrors: true, $data: true })

const Validator = {}

/**
 * Return null if no schema error messages
 */
Validator.json = (schema, json) => {
  const validate = jsonValidator.compile(schema)

  const valid = validate(json)

  if (!valid) {
    return messageBuilder(validate.errors)
  }

  return null
}

/**
 * Return only the messages part of all errors
 * @param errors
 * @returns {string}
 */
const messageBuilder = (errors) => {
  const length = errors.length - 1
  let messages = ''

  for (let i = 0; i < length; i++) {
    messages += errors[i].dataPath + ' - ' + errors[i].message + ', '
  }

  messages += errors[length].dataPath + ' - ' + errors[length].message + '.'
  return messages
}

module.exports.Validator = Validator