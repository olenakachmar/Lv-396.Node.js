# ENDPOINTS
**/api/v1/auth/signup** <br/>
## Request
body: 
* login: Login for new user
* password: Password for new user
## Response
* user: Object of newly created user
**OR if error occures**
* err: Error object
------
**/api/v1/auth/login** <br/>
## Request
body: 
* login: Login for user loging in
* password: Password for user loging in
## Response
* token: JWT token of loged in user
**OR if error occures**
* err: Error object
------
**/api/v1/auth/secret** <br/>
## Request
header: 
* Authorization: JWT Token in format "Bearer ${token}"
## Response
Message 'U passed the authentication' if token is verified **OR** 403 Not authorized error if token isn't verified

------
