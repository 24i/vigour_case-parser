'use strict'
/**
 * @id cases
 * @function case-parser
 * Takes an object and merges enabled cases and removes disabled cases in the object
 * @param {object} obj - original object
 * @param {object} cases - cases object
 * @param {function} filter - (optional) filter properties to ignore
 * @returns {object} updated obj
 */
module.exports = function caseParser (obj, cases, filter) {
  if (isObj(obj) && isObj(cases)) {
    return parse(obj, cases, filter || (() => true))
  } else {
    return obj
  }
}

function parse (obj, cases, filter) {
  var not
  var result = {}
  for (let i in obj) {
    if (filter(obj[i], i, obj)) {
      if (cases[i] !== void 0) {
        if (cases[i]) {
          if (obj[i] === null) {
            return null
          }
          result = merge(result, obj[i], filter)
        }
      } else if (i[0] === '!' && cases[not = i.slice(1)] !== void 0) {
        if (!cases[not]) {
          result = merge(result, obj[i], filter)
        }
      } else if (isObj(obj[i])) {
        result[i] = parse(obj[i], cases, filter)
      } else if (obj[i] !== null) {
        result[i] = obj[i]
      }
    }
  }

  if (result.val) {
    for (let i in result) {
      if (i !== 'val') {
        return result
      }
    }
    return result.val
  } else {
    return result
  }
}

function merge (a, b, filter) {
  if (!isObj(a)) {
    if (!isObj(b)) {
      return b
    } else {
      a = { val: a }
    }
  } else if (!isObj(b)) {
    b = { val: b }
  }
  for (let i in b) {
    if (filter(b[i], i, b)) {
      if (a[i] === void 0) {
        if (b[i] === null) {
          delete a[i]
        } else {
          a[i] = b[i]
        }
      } else {
        const value = merge(a[i], b[i], filter)
        if (value === null) {
          delete a[i]
        } else {
          a[i] = value
        }
      }
    }
  }
  return a
}

function isObj (obj) {
  return typeof obj === 'object' && obj !== null
}

