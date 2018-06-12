import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import UrlInput from './components/UrlInput'
import MehodSelect from './components/MethodSelect'
import HeaderArray from './components/HeaderArray'
import BodyTypeSelect from './components/BodyTypeSelect'
import BodyKeyValue from './components/BodyKeyValue'
//import BodyJSON from './components/BodyJSON'
import BodyRaw from './components/BodyRaw'
import AppBarMenu from './components/AppBarMenu'
import { store } from './App'
import { httpC, PostOpsRequest } from './components/Http'
import { addStringStores } from './components/StringStores'
import { connect } from 'react-redux'
import { setHeaders, setUrls, setForms, setJsons, setRaws, setSeq } from './account'
import { bindActionCreators } from 'redux'
import RespStatus from './components/RespStatus'
import RespHeaders from './components/RespHeaders'
import RespBody from './components/RespBody'


class Po02 extends Component{
  constructor(props){
    super(props);
    this.state={
      method: "GET",
      url: "http://localhost:6026/open/authenticate/gene/pinon",
      headers: ["Content-Type: application/json"],
      forms: ["four: will", "five: be", "six: the day"],
      jsons: ["useremail: gene", "password: pinon"],
      respStatus: 200,
      respHeaders: ["one", "two", "three"],
      respBody: "the body",
        
      bodytype: "Json",
      keyvalues: ["a", "b", "c"],
      bodyraw: "this is the raw body",
    }
  }
setMethod = e=>{this.setState({method: e})}

seturl = e=>{
  this.setState({url: e.value});
}

setHeader = e=>{
  let headers = this.state.headers ;
  headers[e.index] = e.value ;
  this.setState({headers: headers});
//  console.log(headers);
}

setKeyValue = e=>{
  let forms = this.state.forms ;
  forms[e.index] = e.value ;
  this.setState({forms: forms});
//  console.log(keyvalues);
}

setJson = e=>{
  let jsons = this.state.jsons ;
  jsons[e.index] = e.value ;
  this.setState({jsons: jsons});
}

setJsonArray = e=>{
  this.setState({jsons: e});
}

setHeaderArray = e=>{
  this.setState({headers: e});
}

setKeyValueArray = e=>{
  this.setState({forms: e});
}

setBodyType = e=>{
  this.setState({bodytype: e});
}

showRedux = e=>{
  console.log(store.getState());
  
}

addStringStore = e=>{
  
  // send an array of strings with types
//  console.log("add strsto");
  httpC("addstrsto", [{type: "header", text: "this: is another it"}, {type: "header", text: "this: is and still it"}, ]);
}

getStringStores = e=>{
//  console.log("add strsto");
  httpC("getstrstos", {type: "header"}).then(e=>{console.log(e)});
}

setStringStores = e=>{
  // send the whole array of strings with types
//  let headers = {headers: ["one", "two", "three"]} ;
  let strstos = {type: "header", strings: [{text: "one", type: "url"}, {text: "two", type: "header"}, {text: "three", type: "json"}, ]} ;
  httpC("setstrstos", strstos) ;
}

sendCurrentStrings = e=>{
  let strings = Object.assign({}, {headers: this.state.headers}, {urls: this.state.url}, 
    {jsons: this.state.jsons}, {forms: this.state.forms}, {raw: this.state.bodyraw}, {bodytype: this.state.bodytype},
    {method: this.state.method}
                             );
  addStringStores(this.props, strings);
  PostOpsRequest(strings).then(r=>{
    this.setState({
      respStatus: r.status,
      respHeaders: r.headers,
      respBody: r.body,
    }) ;
    console.log(r)
  });
//  console.log(strings);
}

send = e=>{
//  console.log("send");
  this.sendCurrentStrings();
//        store.dispatch(setJwt("first one"));
  
}

  render(){
    return(
      <div>
      <AppBarMenu/>
        <div className="mdl-grid">
          <div className="mdl-cell--1-col">
          </div>
          <div style={{padding: 20}} className="mdl-cell--4-col">
            <MehodSelect initialValue={this.state.method} setValue={this.setMethod}/>
            <div style={{height: 20}}/>
            <UrlInput suggestions={this.props.urls} inputValue={this.state.url} setValue={this.seturl}/>
            <h4>Headers</h4>
            <HeaderArray suggestions={this.props.headers} headers={this.state.headers} setValue={this.setHeader} setHeaderArray={this.setHeaderArray}/>
            <h4>Body Type</h4>
            <BodyTypeSelect initialValue={this.state.bodytype} setValue={this.setBodyType}/>
            {this.state.bodytype === "Form" ? 
              <BodyKeyValue suggestions={this.props.forms} id={"indo-form"} keyvalues={this.state.forms} 
                setValue={this.setKeyValue} setKeyValueArray={this.setKeyValueArray}/> 
              : null}
            {this.state.bodytype === "Raw" ? <BodyRaw initialValue={this.state.bodyraw}/> : null}
            {this.state.bodytype === "Json" ? 
              <BodyKeyValue suggestions={this.props.jsons} id={"indo-json"} keyvalues={this.state.jsons} setValue={this.setJson} 
                setKeyValueArray={this.setJsonArray}/> 
              : null}
            <div style={{height: 20}}/>
            <Button variant="contained" color="primary" onClick={this.send}>Send</Button>
            <hr/>
            
{/*            <div><Button variant="contained" color="secondary" onClick={this.showRedux}>Show</Button></div>
            <div><Button variant="contained" color="default" onClick={this.addStringStore}>Add StringStore</Button></div>
            <div><Button variant="contained" color="default" onClick={this.getStringStores}>Get StringStores</Button></div>
            <div><Button variant="contained" color="default" onClick={this.setStringStores}>Set StringStores</Button></div>*/}
            
            <h3>Response</h3>
            <RespStatus value={this.state.respStatus}/>
            <h4>Headers</h4>
            <RespHeaders value={this.state.respHeaders}/>
            <h4>Body</h4>
            <RespBody value={this.state.respBody}/>

          </div>
{/*          <div className="mdl-cell--1-col">
          </div>
          <div style={{padding: 20}} className="mdl-cell--1-col">
            {this.state.method}<br/>
            {this.state.url}<br/>
            {this.state.headers[0]}<br/>
            {this.state.headers[1]}<br/>
            {this.state.headers[2]}<br/>
            {this.state.bodytype}<br/>
          </div>*/}
          <div className="mdl-cell--6-col">
          </div>
        </div>
      </div>
      
    )
  }
}

//let Po02a = reduxForm({ form: 'po02', initialValues:{method: "POST", url: "http://some.com", headers: ["one", "two", "three", "four"]} })(Po02) ;//, 
//Po02a = connect(state => ({headerArray: formValueSelector('po02')(state, 'headers')}))(Po02a)

let Po02a = connect((state) => (state.account),
  dispatch => bindActionCreators({setHeaders, setUrls, setForms, setJsons, setRaws, setSeq}, dispatch)
  
)(Po02)


export default Po02a ;