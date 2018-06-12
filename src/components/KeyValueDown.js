import React, { Component } from 'react';
import MyDown from './MyDown'

class KeyValueDown extends Component{
  constructor(props){
    super(props);
    this.state={
      keyvalue: this.props.inputValue,
    }
  }
  
  formatKeyValue(){
/* there must be just one ':', with no spaces before it, then the value is what comes after it
 * no - the key is everything before the first ':', *or* the first space if there is none
 * the value is what comes after
*/
    let kv = this.state.keyvalue ;
    let posCo = kv.indexOf(':');
    let posSp = kv.indexOf(' ');
//    console.log(posCo);
    if (posCo < 0) {
      if (posSp < 0) {
        kv += ":"
      } else {
        kv = kv.substr(0, posSp) + ":" + kv.substr(posSp + 1);
      }
    }
    posCo = kv.indexOf(':');
    let key = kv.substr(0, posCo) ;
    let val = kv.substr(posCo + 1).trim() ;
    let sep = (key === "") && (val === "") ? "" : ": "
//    console.log ("key: *" + key + "* val: *" + val + "*");
    kv = key + sep + val ;
    this.setState({keyvalue: kv});
    this.props.setValue({ value: kv, index: this.props.index})
  }
  
  
  onBlur = e=>{
//    console.log("blur");
    this.formatKeyValue();
  }
  
  setValue = e=>{
    this.setState({keyvalue: e.value})
//    console.log(e);
  }
  
  render(){
    return(
      <div>
        <MyDown index={this.props.index} suggestions={this.props.suggestions} placeholder={this.props.placeholder} id={this.props.id} name={this.props.name} 
        label={this.props.placeholder} inputValue={this.props.inputValue} setValue={this.setValue} onBlur={this.onBlur}/>
      </div>
    )
  }
}

export default KeyValueDown ;

// names: postbox postdoc postops postfix postcard postcode postgame posttest postgrad 