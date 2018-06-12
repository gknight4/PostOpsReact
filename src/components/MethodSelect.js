import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class MethodSelect extends Component{
  constructor(props){
    super(props);
    this.state={
      method: this.props.initialValue,
    }
  }
  
  handleChange = e => {
    this.setState({method: e.target.value}) ;
    this.props.setValue(e.target.value);
//    console.log(e.target);
  }
  
  render(){
    return(
        <FormControl className={"formControl"} >
          <InputLabel htmlFor="method">Method</InputLabel>
          <Select
            value={this.state.method}
            onChange={this.handleChange}
            inputProps={{
              name: 'method',
              id: 'method',
            }}
          >
            <MenuItem value={"GET"}>GET</MenuItem>
            <MenuItem value={"POST"}>POST</MenuItem>
            <MenuItem value={"PUT"}>PUT</MenuItem>
            <MenuItem value={"PATCH"}>PATCH</MenuItem>
            <MenuItem value={"DELETE"}>DELETE</MenuItem>
          </Select>
          </FormControl>

    )
  }
}

export default MethodSelect;