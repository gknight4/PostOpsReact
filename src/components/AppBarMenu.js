import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import MenuIcon from '@material-ui/icons/Menu';
//import Login from '@material-ui/icons/Login';
import Help from '@material-ui/icons/Help';
import Login from '../icons/Login';
import Logout from '../icons/Logout';
import Bug from '../icons/Bug';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import HelpDialog from './HelpDialog'
import { logInOut } from './Utils'
import { httpC } from './Http'
import { connect } from 'react-redux'
import { setHeaders, setUrls, setForms, setJsons, setRaws, setSeq } from '../account'
import { bindActionCreators } from 'redux'
import { loadStringStores, eraseStringStores } from './StringStores'
//import { debugText, lo } from './Utils'
import DebugDialog from './Debug'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  constructor(props){
    super(props);
    this.checkLogin();
  }
  state = {
    auth: true,
    anchorEl: null,
    open: false,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',   
    
    showLoginMode: "login",
    loggedIn: false,
    showLogin: false,
    showHelp: false,
    showDebug: false,
  };
  
//  finishLogin = e=>{
//    this.setState({loggedIn: true});
//    loadStringStores(this.props);
//    console.log("load strings") ;
//  }
  
  tryLogin = e=>{// use the saved useremail / password
      let params = logInOut("getlogin");
      if (params.useremail && params.password){
        httpC("login", params).then(e=>{
          if (e.result === "ok"){
            this.setLoggedIn();
            logInOut("login", {auth: e.header});
          }
        });
      }
  }
  
  checkLogin = e=>{
/*
look for a stored auth header, try it
if the auth fails, or there is none, then look for useremail / password credentials, and try those
*/    
    httpC("tryserver").then(e=>{this.props.setServerUp(true)}, e=>{this.props.setServerUp(false)})
    let auth = logInOut("getauth");// get the auth header
//    console.log("auth: " + auth);
    if(auth){
      httpC("checkauth", {auth: auth}).then(e=>{
        if (e.result === "ok"){
//          console.log("got ok");
          this.setLoggedIn();
//          this.setState({loggedIn: true}, this.loadSS);
        } else {// auth header failed
          this.tryLogin();
        }
      });
    } else {
      this.tryLogin();
    }
  }
  
  getStringStores = e=>{
// needs to be changed to get all types    
    httpC("getstrstos", {type: "header"}).then(e=>{
      console.log(e)
      this.props.setHeaders(e);
      
    });
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

//  handleMenu = event => {
//    console.log(event.currentTarget);
//    if (this.state.loggedIn){
//      this.logOut() ;
//    } else {
//      this.setState({ anchorEl: event.currentTarget });
//    }
//  };
  
  handleLoginLogout = e=>{
//    console.log("show");
    if (this.state.loggedIn){
      this.logOut() ;
    } else {
      this.setState({showLogin: true, anchorEl: e.currentTarget});
    }
  }

  showHelp = e=>{
//    console.log("show");
    this.setState({showHelp: true, anchorEl: e.currentTarget});
  }
  
  hideHelp = e=>{
    this.setState({showHelp: false, anchorEl: null});
  }

  hideLogin = e=>{
//    console.log("hide");
    this.setState({showLogin: false, anchorEl: null});
  }

  showDebug = e=>{
//    lo("add help");
//    console.log(debugText);
    this.setState({showDebug: true, anchorEl: e.currentTarget});
  }
  
  hideDebug = e=>{
//    console.log("hide");
    this.setState({showDebug: false, anchorEl: null});
  }

  //handleClose = () => {
  //  console.log("handle close");
  //  this.setState({ anchorEl: null });
  //};
  
//    handleClickButton = () => {
//      console.log("open");
//    this.setState({
//      open: true,
//    });
//  };
  
//  popoverClick = e=>{
//    console.log("click");
//  }
  
  setShowLogin = e=>{
    this.setState({showLoginMode: e}) ;
  }
  
  setLoggedIn = e=>{// called from the LoginDialog, tryLogin, and checkLogin
//    console.log("set login: " + true);
    this.setState({loggedIn: true});
    this.props.setLoggedIn(true);
    loadStringStores(this.props);
  }
  
  logOut = e=>{
    logInOut("logout");
    this.setState({loggedIn: false});
    this.props.setLoggedIn(false);
    eraseStringStores(this.props);
  }
  
closeLogin = e=>{
    this.setState({anchorEl: null}) ;

  }



  render() {
//    const { classes } = this.props;
//    const { auth, anchorEl } = this.state;
    const open = this.state.showLogin; // Boolean(this.state.anchorEl); // 

    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={this.props.classes.flex}>
              PostOps
            </Typography>
                {this.props.debug && 
                  <IconButton aria-owns={null} onClick={this.showDebug} color="inherit">
                    <Bug/>
                  </IconButton>}
                <IconButton
                  aria-owns={null}
                  onClick={this.showHelp}
                  color="inherit"
                >
                  <Help/>
                </IconButton>
            {(
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleLoginLogout}
                  color="inherit"
                >
                  {this.state.loggedIn ? 
                      <Logout/> :
                    <Tooltip id="login" title={"Login or Register"}>
                      <Login/>
                    </Tooltip>}
                </IconButton>

        <Popover
          open={this.state.showDebug}
          onClose={this.hideDebug}
          anchorEl={this.state.anchorEl}
          anchorReference={"anchorEl"}
          anchorPosition={{ top: 400, left: 600 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right", }}
          transformOrigin={{ vertical: "top", horizontal: "right", }}
        >
          <DebugDialog/>
        </Popover>
        <Popover
          open={this.state.showHelp}
          onClose={this.hideHelp}
          anchorEl={this.state.anchorEl}
          anchorReference={"anchorEl"}
          anchorPosition={{ top: 400, left: 600 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right", }}
          transformOrigin={{ vertical: "top", horizontal: "right", }}
        >
          <HelpDialog/>
        </Popover>
        <Popover
          open={this.state.showLogin}
          anchorEl={this.state.anchorEl}
          anchorReference={"anchorEl"}
          anchorPosition={{ top: 200, left: 400 }}
          onClose={this.hideLogin}
          anchorOrigin={{ vertical: "bottom", horizontal: "right", }}
          transformOrigin={{ vertical: "top", horizontal: "right", }}
        >
          {this.state.showLoginMode === "login" ? 
            <LoginDialog setShowLogin={this.setShowLogin} close={this.hideLogin} setLoggedIn={this.setLoggedIn}/> : 
            <RegisterDialog setShowLogin={this.setShowLogin} close={this.closeLogin}/> }
        </Popover>
                
                </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

let MAB = connect(
  (state) => (state.account),
  dispatch => bindActionCreators({setHeaders, setUrls, setForms, setJsons, setRaws, setSeq}, dispatch)
)(MenuAppBar)


export default withStyles(styles)(MAB);
