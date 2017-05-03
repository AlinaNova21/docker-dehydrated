#!/usr/bin/env node
var fs = require('fs');
var request = require('request-promise')

let hooks = {
  deploy_cert
}

let func = process.argv[2]
console.log('hook',func)
if(hooks[func])
  hooks[func](...process.argv.slice(3))

function deploy_cert(domain,keyfile,certfile,fullchainfile,chainfile,timestamp){
  console.log('deploy',domain)
  rancherAPI('GET','/certificates')
    .then(data=>{
      let existing=data.data.find(c=>c.CN == domain)
      console.log('certs',existing)
      console.log(existing?`Found existing ${existing.id}`:'Creating new')
      return rancherAPI(existing?'PUT':'POST',`/certificates/${existing?existing.id:''}`,{
        cert: fs.readFileSync(certfile).toString().replace(/^\w/g,''),
        certChain: fs.readFileSync(chainfile).toString().replace(/^\w/g,''),
        key: fs.readFileSync(keyfile).toString().replace(/^\w/g,''),
        name: domain,
        description: domain
      })
    })
    .then(res=>console.log(res.body))
    .catch(err=>console.error('deploy',err))
}

function rancherAPI(method,url,data){
  console.log(method,url,data)
  return request({
    method: method,
    uri: `${process.env.CATTLE_URL}${url}`,
    auth: {
      user: process.env.CATTLE_ACCESS_KEY,
      pass: process.env.CATTLE_SECRET_KEY,
      sendImmediately: true
    },
    json: true,
    body: data
  })
}
