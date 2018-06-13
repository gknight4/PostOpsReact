import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import './App.css';
import account from './account'
import Po02 from './Po02'
//import MuiDo from './MuiDo'

// npm i react-material-markdown-element

const reducer = combineReducers({account})
const store = createStore(reducer)
const showResults = values => {console.log (JSON.stringify(values, null, 2))}

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <div className="App">
        <Po02 />
      </div>
    </Provider>
    );
  }
}

export default App;

export { store, showResults };
/*
app for PostOps:
identify with email / password
register with email / password
both have "show password" option
one registration / ip / day
save:
urls
headers
key / val pairs
each entry : total uses, last use, 
maintain a use count for each type
then for each item, maintain uses of last 10, 20, 50, 100, 200, 500, 1000
so, if we haven't used this one for the last 25 uses, do this:
move 1/20 of the 500's to 1000's
25/200 of the 200's to 500,
etc.
nevermind
keep the last 20 to 40 items, in order, with most recent first
GET /auth/all/urls to get the current list - single json object
PUT /auth/all/urls to update the total list
POST /auth/urls to add one to the list
same for /headers, /json, /form

GET /open/users/{username} to check if username is used
POST /open/users with username / hash in json to create an account
GET /open/commonpassword/{hash} to see if password is a common one
GET /open/authenticate/{username}/{hash} to get jwt
GET /auth/check/{jwt} to see if current credentials are still good

GET /auth/all/urls to get url list, /headers - header list, /json - json list, /form - form param list
PUT /auth/all/urls to save a new total list
POST /auth/urls to add a url to the list


Tables:
users: email, bcrypt-pass, flags, userid 
commonpasswords - hashes
urls, headers, json, form: userid, url

working:
register
login
check authentication

forgot password
send an email with a rest link

Release Notes:

version: 0.1.5:

version: 0.1.4:

Todo:
protect from too many login attempts
check common passwords
check for username used
allow for 'proxy' mode that usese the server to make the request, so that we get all the headers
add expire to jwt
do automatic login if jwt has expired
implement Forgot Password
reformat for mobile screen
save *entire* messages: method, url, headers, body, and be able to re-select
remove sample data from Po02 State
implement help system

program structure:

public/index.html
defines 'root' div

src/index.js
renders App, to 'root' div
runs registerServiceWorker

src/App.js
runs redux Provider
defines reducer, store, and a simple showResults
render Po02

src/Poo2.js
the main component
state stores method, url, headers, bodyType, forms, jsons, keyvalues, bodyraw, respStatus, respHeades, respBody, and serverUp

These components are used to render the form that describes the Post Request:
UrlInput, MethodSelect, HeaderArray, BodyTypeSelect, BodyKeyValue, BodyRaw, RespStatus, RespHeaders, RespBody
Each component maintains the state of the form input in its *own* state, and updates the state of Po02 when it changes, using these methods:
setMethod, setUrl, setHeader, setKeyVAlue, setJson, setJsonArray, setHeaderArray, setKeyValueArray, setBodyType, 

Po02 also monitors the server availability, and will shut down the page with the ServerDownDialog if the ReST server becomes unavailable

There are a number of debugging routines here, to put the StringStore on the server through its paces:
addStringStore, getStringStores, setStringStores, sendCurrentStrings

Po02 uses connect to make the Redux store and actions available from props


*/
