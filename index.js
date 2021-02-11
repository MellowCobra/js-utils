// Recursive use of Object.freeze
//
// Usage: deepFreeze(someObjOrArray)
//
module.exports.deepFreeze = function deepFreeze(obj) {
  if (obj == null) return obj
  if (Array.isArray(obj)) return obj.map(deepFreeze)

  if (typeof obj === 'function') {
    return obj
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach(prop => {
      deepFreeze(obj[prop])
    })
  }

  return Object.freeze(obj)
}

// Get unique values from an array
// Use as the reducer in Array.reduce
// Factory method which takes a key or a function generating a key
// and produces a reducer function to be used inside an Array.reduce
//
// Usage: myArray.reduce(uniqueBy('someKey'), {})
//
module.exports.uniqueBy = function uniqueBy(by) {
  return function(acc, item, index, items) {
    let key
  
    if (typeof by === 'function') {
      key = by(item)
    } else {
      key = item[by]
    }
    
    acc[key] = item
    
    if (index === items.length - 1) return Object.values(acc)
    
    return acc
  }
}
