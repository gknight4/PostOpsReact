import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class BodyTypeSelect extends Component{
  constructor(props){
    super(props);
    this.state={
      bodytype: props.initialValue,
    }
  }
  

  handleChange = e => {
    this.setState({bodytype: e.target.value}) ;
    this.props.setValue(e.target.value);
  }
  
  render(){
    return(
      <div>
        <FormControl className={"formControl"} >
          <InputLabel htmlFor="bodytype">Body&nbsp;Type</InputLabel>
          <Select
            value={this.state.bodytype}
            onChange={this.handleChange}
            inputProps={{
              name: 'bodytype',
              id: 'bodytype',
            }}
          >
            <MenuItem value={"Form"}>Form</MenuItem>
            <MenuItem value={"Json"}>Json</MenuItem>
            <MenuItem value={"Raw"}>Raw</MenuItem>
          </Select>
          </FormControl>
        </div>
    )
  }
}

export default BodyTypeSelect;