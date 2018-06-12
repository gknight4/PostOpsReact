import React from 'react'

class RespHeaders extends React.Component{
  render(){
    return(
      <div>
        {this.props.value.map((v, i)=><div key={i}>{v}<br/><div style={{height: 10}}></div></div>)}
      </div>
    )
  }
}

export default RespHeaders ;