import { httpC } from './Http'

function initStringStores(props){
  props.setHeaders([
    "content-type: application/json",
    "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmUiOiIyMDE4LTA2LTEzVDEwOjE2OjU2LjE4MTcyMTI5OC0wNzowMCIsImZsYWdzIjoxLCJpZCI6IjViMjE0NzUwMDE5MTRmMjQ5OWY4MDAwYiJ9.Lh8a-2M4puO5z-KNm6XTuKs2gyrmpZcDYZ3Ah0JQRrQ    ",
  ]);// save to Redux
  props.setUrls([
    "http://localhost:6026/open/users",
    "http://localhost:6026/open/authenticate/bob@me.com/edea01c16b2d3c55694cb68967b344ee548d4a9a9ca3612fcf569e6ae93e0802",
    "http://localhost:6026/auth/stringstore"
  ]);
  props.setForms([]);
  props.setJsons(["useremail: bob@me.com", "password: edea01c16b2d3c55694cb68967b344ee548d4a9a9ca3612fcf569e6ae93e0802"]); // theDuck0! hash
  props.setRaws([]);
  props.setSeq(0);
}

function processStringStores(e, props){
//  console.log(e) ;
//  console.log(props) ;
  if (e == null) {
    initStringStores(props);
    return ;
  }
  let headers = [], urls = [], forms = [], jsons = [], raws = [] ;
  for(let i = 0 ; i < e.length ; i++){
    switch (e[i].type){
      case "header":
        headers.push(e[i].text) ;
        break ;
      case "url":
        urls.push(e[i].text) ;
        break ;
      case "form":
        forms.push(e[i].text) ;
        break ;
      case "json":
        jsons.push(e[i].text) ;
        break ;
      case "raw":
        raws.push(e[i].text) ;
        break ;
      default:
        break ;
    }
  }
//  console.log(headers);
  props.setHeaders(headers);// save to Redux
  props.setUrls(urls);
  props.setForms(forms);
  props.setJsons(jsons);
  props.setRaws(raws);
  props.setSeq(0);
}

function eraseStringStores(props){
  props.setHeaders([]);// save to Redux
  props.setUrls([]);
  props.setForms([]);
  props.setJsons([]);
  props.setRaws([]);
  props.setSeq(0);
}

function loadStringStores(props){
//  console.log("load stringstores");
    httpC("getstrstos", {type: "header"}).then(e=>{
      processStringStores(e, props);
    });
}

function checkDups(newString, oldList){
  if (oldList == null) return false ;
  let dup = false ;
  oldList.forEach(e=>{
//    console.log("cd: " + e + ", " + newString + ", " + (e === newString));
    if (e === newString) dup = true ;
    
  });
  return dup ;
}

function removeOldStrings (props, sendStrings){
//  sendStrings = [{text: "one", type: "url"}, {text: "two", type: "url"}, {text: "three", type: "url"}, ]
//  var outStrings = [] ;
//  console.log("remove old") ;
//  console.log(sendStrings);
//  console.log(props);
  var dup = false ;
//  sendStrings.forEach((e, i)=>
  let i = 0 ;
  var e ;
  while (i < sendStrings.length){
    e = sendStrings[i];
//    console.log (e.text + ", " + i);
    switch(e.type){
      case "url":
        dup = checkDups(e.text, props.urls) ;
//        if(dup) console.log("found dup");
        break ;
      case "header":
        dup = checkDups(e.text, props.headers) ;
        break ;
      case "form":
        dup = checkDups(e.text, props.forms) ;
        break ;
      case "json":
        dup = checkDups(e.text, props.jsons) ;
        break ;
      case "raw":
        dup = checkDups(e.text, props.raws) ;
        break ;
      default:
        break ;
    }
    if (dup) {
      sendStrings.splice(i, 1);
    } else {
      i++ ;
    }
//    console.log(e);
  };
//   console.log ("done");
}

function safeCopyArray(arr){
  if(arr == null){
    return [] ;
  } else {
    return arr.slice(0) ;
  }
}

function addRemainingStrings (props, sendStrings){
//  console.log("add remaining") ;
//  console.log(props);
  let headers = safeCopyArray(props.headers) ; // props.headers.slice(0);
  let urls = safeCopyArray(props.urls) ; // props.urls.slice(0);
  let jsons = safeCopyArray(props.jsons) ; // props.jsons.slice(0);
  let forms = safeCopyArray(props.forms) ; // props.forms.slice(0);
  let raws = safeCopyArray(props.raws) ; // props.raws.slice(0);
  sendStrings.forEach(e=>{
    switch(e.type){
      case "header":
        headers.push(e.text);
        break ;
      case "url":
        urls.push(e.text);
        break ;
      case "json":
        jsons.push(e.text);
        break ;
      case "form":
        forms.push(e.text);
        break ;
      case "raw":
        raws.push(e.text);
        break ;
      default:
        break ;
    }
  });
//  console.log("headers");
//  console.log(headers);
  props.setHeaders(headers);// save to Redux
  props.setUrls(urls);
  props.setForms(forms);
  props.setJsons(jsons);
  props.setRaws(raws);
}

function addStringStores(props, strings){
/*
strings is an object of all of the fields taken from the form: headers, urls, jsons, forms, raw, bodytype
sendStrings is an array of all those strings, with "type" of string
**/  
//  console.log("addStringStores");
//  console.log("from redux:") ;
//  console.log(props.headers);
//  console.log(strings);
//  console.log(props);
  let sendStrings = [] ;
  sendStrings.push({type: "url", text: strings.urls});
  strings.headers.forEach(e=>{ if (e !== "") sendStrings.push({type: "header", text: e}) }) ;
  switch (strings.bodytype){// this is the body type
    case "Raw":
      sendStrings.push({type: "raw", text: strings.raw});
      break ;
    case "Json":
      strings.jsons.forEach(e=>{ if (e !== "") sendStrings.push({type: "json", text: e}) }) ;
      break ;
    case "Form":
      strings.forms.forEach(e=>{ if (e !== "") sendStrings.push({type: "form", text: e}) }) ;
      break ;
    default:
      break ;
  }
//  var props2 = {urls: ["a", "two", "c"]}
  removeOldStrings(props, sendStrings);
  if(sendStrings.length > 0) {
    addRemainingStrings(props, sendStrings)
    httpC("addstrsto", sendStrings) ;
  }
//  console.log(sendStrings);
//  console.log("asdone") ;
//  console.log(sendStrings);
}

export { loadStringStores, addStringStores, eraseStringStores };