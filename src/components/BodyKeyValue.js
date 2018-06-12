import React, { Component } from 'react';
import MyDown from './MyDown'

//const suggestions = ["apple", "pear", "orange", "grape", "banana"];

const placeholder = "KeyValue";
//const id = "integration-downshift-simple-form" ;
const name = "url";

class KeyValueArray extends Component{
  constructor(props){
    super(props);
    this.state = {
      keyvalues: this.props.keyvalues,
    }
  }
  
  setKeyValue = (e) => {
    let KeyValues = this.props.keyvalues.slice(0);
    KeyValues[e.index] = e.value;
    this.props.setKeyValueArray(KeyValues);
  }
  
  static getDerivedStateFromProps(props, state){
    let keyvalues = props.keyvalues.slice(0);
    let update = false ;
    if ((keyvalues.length === 0) || (keyvalues[keyvalues.length - 1] !== "")) {
      keyvalues.push("") ;
      update = true ;
    }
    for (let i = 0 ; i < keyvalues.length - 1 ; i++){
      if (keyvalues[i] === "") {
        keyvalues.splice(i, 1);
        update = true ;
      }
    }
    if (update){
      props.setKeyValueArray(keyvalues);
      return {keyvalues: keyvalues};
    }

    return null ;
  }
  
renderKeyValue ({KeyValue, index}){
  return (
        <MyDown key={index} index={index} suggestions={this.props.suggestions} placeholder={"Enter KeyValue"} id={this.props.id + index} name={name + index} label={placeholder + index}
          inputValue={this.props.keyvalues[index]} setValue={this.setKeyValue}/>
  )
  
}
  render(){
    return(
      <div>
        {this.props.keyvalues.map((KeyValue, index)=>this.renderKeyValue({KeyValue, index}))}
      </div>
    )
  }
}

export default KeyValueArray;