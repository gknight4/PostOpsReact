//var SHA256 = require('crypto-js/sha256');
const baseUrl = "http://localhost:6026" ;

const po = function (method, body){
        var ret = {
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        }
        if (body !== "") ret.body = body ;
        return ret ;
    }

function register (params){
  return new Promise((res, rej)=>{
//    params.password = SHA256(params.password).toString();
    let url = baseUrl + "/open/users" ;
    let httpObj = po ("POST", JSON.stringify(params)) ;
//    return fetch(url, httpObj).then(response => {console.log(response)})
    return fetch(url, httpObj).then(response => response.json().then(resp=>{ res(resp); }), e=>{rej(e)});
  })
}

function tryServer(){
  return new Promise((res, rej)=>{return fetch(baseUrl, po("GET", "")).then(res, rej);})
}

function login (params){
  console.log("login");
  return new Promise((res, rej)=>{
    let httpObj = po ("GET", "") ;
    let url = baseUrl + "/open/authenticate/" + params.useremail + "/" + params.password ;
    return fetch(url, httpObj).then(response => response.json().then(resp=>{
      resp.header = response.headers.get("Authorization") ;
      console.log(resp.header);
      res(resp); 
    }));
  })
}

function checkAuth (params){// this is the first attempt to contact the server
//  console.log("checkAuth");
  return new Promise((res, rej)=>{
    let httpObj = po ("GET", "") ;
    httpObj.headers['Authorization'] = params.auth;
    let url = baseUrl + "/auth/check" ;
    return fetch(url, httpObj).then(
      response => response.json().then(
        resp=>{ res(resp); }
      ), e=>{rej(e)}
    );
  })
}

function addStringStore(params){
  console.log("add strsto2");
//  console.log(params);
  return new Promise((res, rej)=>{
    let url = baseUrl + "/auth/stringstore" ;
    let httpObj = po ("POST", JSON.stringify(params)) ;
    httpObj.headers['Authorization'] = sessionStorage.getItem("auth");
//    console.log(httpObj);
    return fetch(url, httpObj).then(response => response.json().then(resp=>{ res(resp); }), e=>{rej(e)});
  })
}

function getStringStores(params){
  return new Promise((res, rej)=>{
    let url = baseUrl + "/auth/stringstore" ; //  + params.type ;
    let httpObj = po ("GET", "") ;
    httpObj.headers['Authorization'] = sessionStorage.getItem("auth");
    return fetch(url, httpObj).then(response => response.json().then(resp=>{ res(resp); }), e=>{rej(e)});
  })
}

function setStringStores(params){// update the whole table
  console.log("set strsto2");
  console.log(params);
  return new Promise((res, rej)=>{
    let url = baseUrl + "/auth/all/stringstore" ; //  + params.type ;
    let httpObj = po ("PUT", JSON.stringify(params)) ;
    httpObj.headers['Authorization'] = sessionStorage.getItem("auth");
    console.log(httpObj);
    return fetch(url, httpObj).then(response => response.json().then(resp=>{ res(resp); }), e=>{rej(e)});
  })
}

function httpC (type, params) {
  switch(type){
    case "register":
      return register(params);
    case "login":
      return login(params);
    case "checkauth":
      return checkAuth(params);
    case "addstrsto":
      return addStringStore(params);
    case "getstrstos":
      return getStringStores(params);
    case "setstrstos":
      return setStringStores(params);
    case "tryserver":
      return tryServer();
    default:
      break ;
  }
}

function getBodyRaw (str) {
  return str ;
}

function keyValSep (comb){
  let posCo = comb.indexOf(":") ;
  let key = comb.substr(0, posCo) ;
  let val = comb.substr(posCo + 1).trim();
  return {key: key, val: val} ;
}

function getJsonObj(jsons){
  let obj = "{\n" ;
  var prop ;
  var sep ;
  jsons.forEach(v=>{
    if (v !== ""){
      prop = keyValSep(v) ;
      sep = isNaN(prop.val) ? "\"" : "" ;
      obj += "    \"" + prop.key + "\": " + sep + prop.val + sep + "\n" ;
    }
  });
  obj += "}" ;
  //console.log(obj) ;
  return obj ;
}

function getFormLine(forms){
  let line = "" ;
  var prop ;
  forms.forEach(v=>{
    if (v !== ""){
      prop = keyValSep(v) ;
      line += encodeURI(prop.key) + "=" + encodeURI(prop.val) + "&" ;
    }
  });
  return line.substr(0, line.length - 1) ;
}

function addHeaders (httpObj, headers){
  var head ;
  headers.forEach(v=>{
    if (v !== ""){
      head = keyValSep(v) ;
      httpObj.headers[head.key] = head.val;
    }
  });
}

function processResponse(response, body){
// process the response into a status code, headers array, and body
//  console.log(response);
//  console.log(body);
  let ret = {headers: []} ;
  
  for(var key of response.headers.keys()) {
    ret.headers.push(key + ": " + response.headers.get(key));
  }
  ret.status = response.status ;
  ret.body = body ;
  return ret ;
}

function PostOpsRequest (strings){
  return new Promise((res, rej)=>{
    let url = strings.urls ;
    var body = ""
    if ((strings.method === "POST") || (strings.method === "PUT")) {
      switch(strings.bodytype){
        case "Raw":
          body = getBodyRaw(strings.raw) ;
          break ;
        case "Json":
          body = getJsonObj(strings.jsons) ;
          break ;
        case "Form":
          body = getFormLine(strings.forms) ;
          break ;
        default:
          break ;
      }
    }
//    console.log(body) ;
    let httpObj = po (strings.method, body) ;
    httpObj.headers = {"user-agent": "Mozilla/4.0 MDN Example"}
    addHeaders (httpObj, strings.headers) ;
//    console.log(httpObj);
//    httpObj.headers['Authorization'] = sessionStorage.getItem("auth");
    return fetch(url, httpObj).then(response => {
      response.text().then(r=>{
        res(processResponse(response, r));
      });
    }) ;
  })
  
}

export { baseUrl, httpC, PostOpsRequest }