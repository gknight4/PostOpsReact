import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class BodyRaw extends Component{
  
  handleChange = e=>{
    console.log(e.target.value);
  }
  render(){
    return(
      <div>
        <TextField
          id="rawbodytext"
          label="Raw&nbsp;Body&nbsp;Text"
          placeholder="Enter text here"
          multiline
          margin="normal"
          onChange={this.handleChange}
          value={this.props.initialValue}
          fullWidth={true}
        />
      </div>
    )
  }
}

export default BodyRaw;