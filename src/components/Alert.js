import React from 'react';

class Alert extends React.Component{
  constructor(props){
    super(props);
    this.state={
      color: "#FFFFFF",
      text: "",
    }
  }

  static getDerivedStateFromProps(props, state){
    const colors = {primary: "#cae3fe", secondary: "#e1e2e4", success: "#d3edda", danger: "#f8d6d9", warning: "#fff4ce", info: "#cfebf0", 
      light: "#fefefe", dark: "#d5d7d8"  }
//      console.log(props.children);
    let coPos = props.children.indexOf(":") ;
    let type, text ;
    if (coPos >= 0) {
      type = props.children.substr(0, coPos) ;
      text = props.children.substr(coPos + 1).trim() ;
    } else {
      type = "info" ;
      text = props.children ;
    }
//    console.log(colors[type]);
    return {color: colors[type], text: text}
  }
  
  // alerts: primary, secondary, success, danger, warning, info, light, dark
  // cae3fe, e1e2e4, d3edda, f8d6d9, fff4ce, cfebf0, fefefe, d5d7d8
  // 
  render(){
    return(
      <div style={{padding: 10, backgroundColor: this.state.color}}>{this.state.text}</div>
    )
  }
}

export default Alert ;