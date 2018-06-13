
function logInOut (type, params){
  switch (type){
    case "login":
//      console.log("save login");
      sessionStorage.setItem("auth", params.auth) ;
      break ;
    case "logout":
      sessionStorage.removeItem("auth") ;
      localStorage.removeItem("useremail") ;
      localStorage.removeItem("password") ;
      break ;
    case "rememberme":
      localStorage.setItem("useremail", params.useremail) ;
      localStorage.setItem("password", params.password);
      break ;
    case "getauth":
      return sessionStorage.getItem("auth");
    case "getlogin":
      let useremail = localStorage.getItem("useremail") ;
      let password = localStorage.getItem("password") ;
      return {useremail: useremail, password: password};
    default:
      break ;
  }
}

var debugThis = null ;
function setDebugThis (val) {debugThis = val} ;
function getDebugThis () {return debugThis} ;

export { logInOut, setDebugThis, getDebugThis }