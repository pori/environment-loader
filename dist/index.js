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

function config (file = '.env') {return __async(function*(){
  
  let path    = process.cwd() 
  let config  = yield readFile(`${path}/${file}`)
  let store   = parse(config)

  setenv(store)
}())}

module.exports.config = config

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a)}catch(e){return j(e)}return r.done?s(r.value):Promise.resolve(r.value).then(c,d)}function d(e){return c(e,1)}c()})}
