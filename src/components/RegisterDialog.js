import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { httpC } from './Http'
import Alert from './Alert'

var SHA256 = require('crypto-js/sha256');

class RegisterDialog extends Component{
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      showPass: false,
      userEmailAlert: "warning: That User Email is in use",
      registrationAlert: "",
    }
  }
  
  handleChange = e=>{
    switch(e.target.id){
      case "loginEmail":
        this.setState({email: e.target.value});
        break ;
      case "loginPassword":
        this.setState({password: e.target.value});
        break ;
      case "showPassword":
        this.setState({showPass: e.target.checked});
        break ;
      default:
        break ;
    }
    //console.log(e.target.id + ", " + e.target.value);
  }
  
  login = e=>{
    this.props.setShowLogin("login");
  }
  
  doRegister = e=>{
    let hash = SHA256(this.state.password).toString();
    httpC("register", {useremail: this.state.email, password: hash}).then(e=>{
      if (e.result === "ok")
        this.setState({registrationAlert: "success: You're Registered!"}) ;
      else
        this.setState({registrationAlert: "danger: That Email address is in use"}) ;
    }, this.setState({registrationAlert: "danger: The Server is not responding"}));
  }
  
  render(){
    return(
      <div style={{margin: 20}}>
      <h3 style={{textAlign: "center"}}>Register</h3>
        <div>
          <TextField
            id="loginEmail"
            label="User&nbsp;Email"
            className={""}
            margin="normal"
            onChange={this.handleChange}
          />      
        </div>
        {this.state.userEmailAlert !== "" && <Alert>{this.state.userEmailAlert}</Alert>}
        <div>
          <TextField
            id="loginPassword"
            label="Password"
            type={this.state.showPass ? "text" : "password"}
            className={""}
            margin="normal"
            onChange={this.handleChange}
          />
          <div>
            <FormControlLabel
              control={
              <Checkbox
                id="showPassword"
                value="checkedA"
                onChange={this.handleChange}
              />
            }
            label="Show&nbsp;Password"
            />          
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.doRegister}>Send</Button>
          </div>
          <div style={{padding: 10}}>
          Already joined? <a onClick={this.login}>Login</a>
          {this.state.registrationAlert !== "" && <Alert>{this.state.registrationAlert}</Alert>}
          
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterDialog;