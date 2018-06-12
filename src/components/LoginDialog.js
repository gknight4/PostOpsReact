import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { httpC } from './Http'
import Alert from './Alert'
import { setJwt } from '../account'
//import { store } from '../App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logInOut } from './Utils'

var SHA256 = require('crypto-js/sha256');

class LoginDialog extends Component{
  constructor(props){
//    console.log(props);
    super(props);
    this.state={
      email: "",
      password: "",
      showPass: false,
      rememberMe: false,
      loginAlert: "",
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
      case "rememberMe":
        this.setState({rememberMe: e.target.checked});
        break ;
      default:
        break ;
    }
    //console.log(e.target.id + ", " + e.target.value);
  }
  
  forgotPassword = e=>{
    console.log("forgot pass") ;
  }
  
  register = e=>{
    this.props.setJwt("a new one");
    this.props.setShowLogin("register");
  }
  
  login = e=>{
//    console.log("log 1");
    if ((this.state.email !== "") && (this.state.password !== "")){
      let hash = SHA256(this.state.password).toString();
      httpC("login", {useremail: this.state.email, password: hash}).then(r=>{
        if(r.result === "ok"){
//          console.log("loggin");
          logInOut("login", {auth: r.header});// save the auth header
          this.props.setJwt(r.header);
          if (this.state.rememberMe) logInOut("rememberme", {useremail: this.state.email, password: hash});
          this.props.close();
          this.props.setLoggedIn(true);
        } else {
          this.setState({loginAlert: "warning: Sorry!"});
          this.props.setLoggedIn(false);
        }
      });
    }
  }
  
  render(){
    return(
      <div style={{margin: 20}}>
      <h3 style={{textAlign: "center"}}>Login</h3>
        <div>
          <TextField
            id="loginEmail"
            label="User&nbsp;Email"
            className={""}
            margin="normal"
            onChange={this.handleChange}
          />      
        </div>
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
            <FormControlLabel
              control={
              <Checkbox
                id="rememberMe"
                value="checkedB"
                onChange={this.handleChange}
              />
            }
            label="Remember&nbsp;me"
            />          
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.login}>Send</Button>
          </div>
          <div style={{padding: 10}}>
          <a onClick={this.forgotPassword}>Forgot Password?</a><br/>
          New here? <a onClick={this.register}>Register</a>
          {this.state.loginAlert !== "" && <Alert>{this.state.loginAlert}</Alert>}
          
          </div>
        </div>
      </div>
    )
  }
}

const LD2 = connect(
  (state) => (state.account),
  dispatch => bindActionCreators({setJwt}, dispatch)
)(LoginDialog)

export default LD2;