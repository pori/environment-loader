const { readFile } = require('fs')

function _readFile (path) {
  return new Promise(function (pass, fail) {
    readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        fail(err)
      }

      pass(data)
    }) 
  }) 
}

module.exports.readFile = _readFile
