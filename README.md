PostOps frontend, implemented in React, starting from CreateReactApp.

Clone or UnZip, then, in the project root directory:

npm i
npm start

the app runs on port 3050:
http://localhost:3050

Issues:

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



Changelog:

Version: 0.1.4

First version on Git
