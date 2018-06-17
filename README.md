PostOps frontend, implemented in React, starting from CreateReactApp.

Clone or UnZip, then, in the project root directory:

npm i\
npm start\

the app runs on port 3050:\
http://localhost:3050

Issues:

Todo:
implement Python backend\
implement Angular frontend\
protect from too many login attempts\
check common passwords\
validate passwords\
validate email address\
check for username used\
allow for 'proxy' mode that uses the server to make the request, so that we get all the headers\
add expire to jwt\
do automatic login if jwt has expired\
implement Forgot Password\
reformat for mobile screen\
save *entire* messages: method, url, headers, body, and be able to re-select\
add "send new StringStore" when the string list needs to be trimmed\
remove 'SEQ' from accounts\
make email address *not* case sensitive\
stop "Server Not Responding" message from Login / Register\
initializing strings are *not* stored back on server\
auth check should verify that not only is the jwt valid, but it refers to a currently valid *user*\
remove the 'strings' object from set stringstores\
implement Raw body!\

Bugs


Changelog:

Version: 0.2.1

add proxy mode to avoid browser restrictions on https, headers, etc.
put in selectors to change hosts and https for development / production\
add Init Suggestions for new users\
add 'debug' appBar item to display debug info in deployed (but still debug) build\

Version: 0.1.7

Implement Help system for a walkthrough of PostOps
Deploy to PostOps.us

former Issues:
add Alert if sending PostOp without login\
need to load stringstore after successful login\
from AppBarMenu, remove handleClose, handleClickButton, popoverClick,  handleMenu\
remove temporary "user email in use" alert\
erase StringStore on logout\


Version: 0.1.6

former Issues:
pass string data to components in props, rather than storing in component state - not a problem, after all\
components are rendering before Redux store is initialized from the server - each component maintains its \
own state, with is *initialized* by the props. but, when the props update from Redux store, the state does \
*not*. - actually, not happening\
"logout" function not working - shows login dialog again\
Login dialog doesn't close on successful login\
don't update StringStore if not logged in\
Headers: "cannot read property 'filter'\
components behaving badly with new user, with empty StringStore\

Version: 0.1.5

implemented a 'debug' flag in the Redux store. Set in Po02 constructor, and readable anywhere.\

former Issues:
remove sample data from Po02 State\
add Show button to display Redux store on debug=true\


Version: 0.1.4

First version on Git
