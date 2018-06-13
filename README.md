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
check for username used\
allow for 'proxy' mode that usese the server to make the request, so that we get all the headers\
add expire to jwt\
do automatic login if jwt has expired\
implement Forgot Password\
reformat for mobile screen\
save *entire* messages: method, url, headers, body, and be able to re-select\
add "send new StringStore" when the strings need to be trimmed\
add Init Suggestions for new users\
remove 'SEQ' from accounts\
need to load stringstore after successful login

Bugs
Headers: "cannot read property 'filter'
Login dialog doesn't close on successful login
components are rendering before Redux store is initialized from the server - each component maintains its own state, with is *initialized* by the props. but, when the props update from Redux store, the state does *not*.



Changelog:

Version: 0.1.5

implemented a 'debug' flag in the Redux store. Set in Po02 constructor, and readable anywhere.\

former Issues:
remove sample data from Po02 State\
add Show button to display Redux store on debug=true\


Version: 0.1.4

First version on Git
