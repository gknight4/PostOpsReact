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
import Login from '@material-ui/icons/Login';
import Logout from '@material-ui/icons/Logout';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
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
    let auth = logInOut("getauth");// get the auth header
//    console.log("auth: " + auth);
    if(auth){
      httpC("checkauth", {auth: auth}).then(e=>{
        if (e.result === "ok"){
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
    if (this.state.loggedIn){
      this.logOut() ;
    } else {
      this.setState({ anchorEl: event.currentTarget });
    }
    
  };

  handleClose = () => {
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
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              PostOps
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {this.state.loggedIn ? 
                      <Logout/> :
                    <Tooltip id="login" title={"Login or Register"}>
                      <Login/>
                    </Tooltip>}
                </IconButton>

        <Popover
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          anchorReference={this.state.anchorReference}
          anchorPosition={{ top: this.state.positionTop, left: this.state.positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: this.state.anchorOriginVertical,
            horizontal: this.state.anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: this.state.transformOriginVertical,
            horizontal: this.state.transformOriginHorizontal,
          }}
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
