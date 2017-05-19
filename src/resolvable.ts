
export = function resolvable(target) {
  if (typeof target !== 'function') {
    throw 'Cannot make a non-function resolvable'
  }
  return (...args) => {
    return new Promise((resolve, reject) => {
      try {
        target.apply(this, args.concat((err, data) => {
          if (err) return reject(err)
          return resolve(data)
        }))
      } catch (e) {
        reject(e)
      }
    })
  }
}