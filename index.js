'use strict'
module.exports = function caseParser (obj, cases, filter) {
  if (!isObj(obj) || !isObj(cases)) {
    return obj
  } else if (filter) {
    return filteredParse(obj, cases, filter)
  } else {
    return parse(obj, cases)
  }
}

function filteredParse (obj, cases, filter) {

}

function parse (obj, cases) {
  var overwrite, not
  for (let i in obj) {
    if (cases[i] !== void 0) {
      if (cases[i]) {
        overwrite = overwrite === void 0 ? obj[i] : merge(overwrite, obj[i])
      }
      delete obj[i]
    } else if (i[0] === '!' && cases[not = i.slice(1)] !== void 0) {
      if (!cases[not]) {
        overwrite = overwrite === void 0 ? obj[i] : merge(overwrite, obj[i])
      }
      delete obj[i]
    } else if (isObj(obj[i])) {
      obj[i] = parse(obj[i], cases)
    }
  }

  if (overwrite) {
    overwrite = parse(overwrite, cases)
    obj = merge(obj, overwrite)
  } else if (overwrite === null) {
    return null
  }

  if (obj.val) {
    for (let i in obj) {
      if (i !== 'val') {
        return obj
      }
    }
    return obj.val
  } else {
    return obj
  }
}

function merge (a, b) {
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
    if (a[i] === void 0) {
      if (b[i] === null) {
        delete a[i]
      } else {
        a[i] = b[i]
      }
    } else {
      const value = merge(a[i], b[i])
      if (value === null) {
        delete a[i]
      } else {
        a[i] = value
      }
    }
  }
  return a
}

function isObj (obj) {
  return typeof obj === 'object' && obj !== null
}