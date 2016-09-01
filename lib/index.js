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

async function configFile (file = '.env') {
  await load(file, config => parse(config)) 
}

module.exports.config = configFile

async function configJSON (file = 'package.json', key = 'env') {
  await load(file, config => {
    let store   = JSON.parse(config)

    if (key) {
      store = store[key]
    }

    return store
  })
}

module.exports.configJSON = configJSON

async function load (file, fn) {

  let path    = process.cwd() 
  let config  = await readFile(`${path}/${file}`)
  let store   = fn(config)

  setenv(store)
} 

module.exports.load = load
