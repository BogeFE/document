function myNew() {
  const constructor = Array.prototype.shift.call(arguments)

  const obj = Object.create(constructor.prototype)
  const res = constructor.apply(obj, arguments)

  return typeof res === 'object' && res !== null ? res : obj
}

Object.prototype.create = function (target) {
  const temp = function () {}
  temp.prototype = target
  return new temp()
}

Function.prototype.bind = function (otherThis) {
  const args = [...arguments].slice(1)

  const fToBind = this
  const fNop = function () {}
  const fBound = function () {
    const newArgs = [...arguments, ...args]

    return fToBind.apply(this instanceof fNop ? this : otherThis, newArgs)
  }

  if (this.prototype) {
    fNop.prototype = this.prototype
  }
  fBound.prototype = new fNop()

  return fBound
}

Function.prototype.apply = function (context, args) {
  if (typeof this !== 'function') {
  }

  context = context || window

  const newKey = new Symbol()
  context[newKey] = this
  const res = context[newKey](...args)

  delete context[newKey]

  return res
}

function myInstanceOf(left, right) {
  if (typeof left !== 'object' || left === null) {
    return false
  }

  let leftPrototype = Object.getPrototypeOf(left)
  let rightPrototype = right.prototype

  while (true) {
    if (!leftPrototype) return false
    if (leftPrototype === rightPrototype) return true

    leftPrototype = Object.getPrototypeOf(leftPrototype)
  }
}
