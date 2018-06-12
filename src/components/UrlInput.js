import React, { Component } from 'react';
import MyDown from './MyDown'
//import { setHeaders } from '../account'
//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'

/*const suggestions = [
  { text: "http://localhost:3000"}, 
  { text: "pear"}, 
  { text: "orange"}, 
  { text: "grape"}, 
  { text: "banana"},
];*/

const placeholder = "Url";
const id = "integration-downshift-simple-url" ;
const name = "url";

class UrlInput extends Component{
  render(){
//  console.log(this.props);
    return(
      <div>
        <MyDown suggestions={this.props.suggestions} placeholder={placeholder} id={id} name={name} label={placeholder}
          inputValue={this.props.inputValue} setValue={this.props.setValue}/>
      </div>
    )
  }
}

//let UrlI = connect(
//  (state) => (state.account),
//)(UrlInput)

export default UrlInput;

