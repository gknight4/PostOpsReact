import React, { Component } from 'react';
import KeyValueDown from './KeyValueDown'

//const suggestions = ["apple", "pear", "orange", "grape", "banana"];

//const suggestions = ["http://localhost:3000", "pear", "orange", "grape", "banana"];
const placeholder = "Header";
const id = "integration-downshift-simple-header" ;
const name = "url";

class HeaderArray extends Component{
  constructor(props){
    super(props);
//    console.log("construct");
    this.state = {
      headers: this.props.headers,
    }
  }
  
  setHeader = (e) => {
//    console.log("set " + e.value + ", " + e.index);
    let headers = this.props.headers.slice(0);
    headers[e.index] = e.value;
//    console.log("settings");
//    console.log(headers) ;
    this.props.setHeaderArray(headers);
//    this.setState({headers: headers});
  }
  
  static getDerivedStateFromProps(props, state){
//    console.log("get derived") ;
//    console.log(state.headers);
//    let headers = Object.assign({}, props.headers) ;
    let headers = props.headers.slice(0);
//    console.log(headers);
    let update = false ;
    if ((headers.length === 0) || (headers[headers.length - 1] !== "")) {
      headers.push("") ;
      update = true ;
    }
    for (let i = 0 ; i < headers.length - 1 ; i++){
      if (headers[i] === "") {
        console.log("do slice " + i);
        console.log(headers);
        headers.splice(i, 1);
//        console.log(headers);
        update = true ;
      }
    }
    if (update){
//      console.log("update") ;
//      console.log(headers);
      props.setHeaderArray(headers);
      return {headers: headers};
//      return null ;
    }

//    if (headers.length >= 3) 
//    console.log(props);
//    return {headers: ["one"]};
    return null ;
  }
  
renderHeader ({header, index}){
//  console.log("render " + index + ", " + this.state.headers[index]);
  return (
    <div key={index}>
        <KeyValueDown index={index} suggestions={this.props.suggestions} placeholder={"Enter Header"} id={id + index} name={name + index} 
        label={placeholder + index}
          inputValue={this.props.headers[index]} setValue={this.setHeader}/>
            <div style={{height: 20}}/>
    </div>
  )
  
}
  render(){
//    console.log("heaers");
//    console.log(this.props);
//  console.log("re rendering") ;
    return(
      <div>
        {this.props.headers.map((header, index)=>this.renderHeader({header, index}))}
      </div>
    )
  }
}
/*      <FieldArray name="headers" headerArray={this.props.headerArray} component={this.renderHeaders} />
*/
export default HeaderArray;