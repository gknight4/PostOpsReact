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
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import HelpDialog from './HelpDialog'
import { logInOut } from './Utils'
import { httpC } from './Http'
import { connect } from 'react-redux'
import { setHeaders, setUrls, setForms, setJsons, setRaws, setSeq } from '../account'
import { bindActionCreators } from 'redux'
import { loadStringStores } from './StringStores'

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
//    console.log("loading");
    if(this.state.loggedIn) loadStringStores(props);
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
  };
  
  tryLogin = e=>{// use the saved useremail / password
      let params = logInOut("getlogin");
      if (params.useremail && params.password){
        httpC("login", params).then(e=>{
          if (e.result === "ok"){
            this.setState({loggedIn: true});
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
          this.setState({loggedIn: true});
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

  logOut = e=>{
    logInOut("logout");
    this.setState({loggedIn: false});
  }
  
  handleMenu = event => {
    console.log(event.currentTarget);
    if (this.state.loggedIn){
      this.logOut() ;
    } else {
      this.setState({ anchorEl: event.currentTarget });
    }
    
  };
  
  showHelp = e=>{
    console.log("show");
    this.setState({showHelp: true, anchorEl: e.currentTarget});
  }
  
  hideHelp = e=>{
    this.setState({showHelp: false, anchorEl: null});
  }

  showLogin = e=>{
    console.log("show");
    this.setState({showLogin: true, anchorEl: e.currentTarget});
  }

  hideLogin = e=>{
    console.log("hide");
    this.setState({showLogin: false, anchorEl: null});
  }

  handleClose = () => {
    console.log("handle close");
    this.setState({ anchorEl: null });
  };
  
    handleClickButton = () => {
      console.log("open");
    this.setState({
      open: true,
    });
  };
  
  popoverClick = e=>{
    console.log("click");
  }
  
  setShowLogin = e=>{
    this.setState({showLoginMode: e}) ;
  }
  
  setLoggedIn = e=>{
//    console.log("set login: " + e);
    this.setState({loggedIn: e});
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
                  onClick={this.showLogin}
                  color="inherit"
                >
                  {this.state.loggedIn ? 
                      <Logout/> :
                    <Tooltip id="login" title={"Login or Register"}>
                      <Login/>
                    </Tooltip>}
                </IconButton>

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
            <LoginDialog setShowLogin={this.setShowLogin} close={this.closeLogin} setLoggedIn={this.setLoggedIn}/> : 
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
