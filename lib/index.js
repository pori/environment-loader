const { readFile } = require('./promises/fs')

function parse (source) {
  
  let lines = source.split(/\n/g).filter(line => line !== '')
  let store = {}

  for (let line of lines) {
    let parts = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    let key   = parts[1]
    let val   = parts[2]

    store[key] = val
  }

  return store
}

module.exports.parse = parse

function setenv (vars) {

  for (let key in vars) {
    process.env[key] = vars[key]
  }
}

module.exports.setenv = setenv

async function config (file = '.env') {
  
  let path    = process.cwd() 
  let config  = await readFile(`${path}/${file}`)
  let store   = parse(config)

  setenv(store)
}

module.exports.config = config
