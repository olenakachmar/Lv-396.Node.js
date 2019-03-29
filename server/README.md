# Setup
In order to succesfully start the server you must prepare this environment variables
* MONGO_CONNECT: connection string to mongo DB
* JWT_SECRET: secret for jwt authorization (any string)


# ENDPOINTS
**POST /api/v1/auth/signup** <br/>
## Request
body: 
* login: Login of new user
* password: Password of new user
* firstName: First name of new user
* lastName: Last name of new user
* position: Position of new user
* email: Email adress of new user
* phone: Phone number of new user
* type: Type of new user
* manager (optional): ID of manager of new user
* teamlead (optional): ID of teamlead of new user
* department (optional): ID of department of new user
* photoURL (optional): URL to photo of new user
* hr (optional): ID of hr of new user
## Response
* user: Object of newly created user
**OR if error occures**
* err: Error object
------
**POST /api/v1/auth/login** <br/>
## Request
body: 
* login: Login for user loging in
* password: Password for user loging in
## Response
* token: JWT token of loged in user
**OR if error occures**
* err: Error object
------
**GET /api/v1/users** <br/>
## Request
header: 
* Authorization: JWT Token in format "Bearer ${token}"
## Response
* Array of all users objects 
------
**POST /api/v1/users/:id** <br/>
## Request
header: 
* Authorization: JWT Token in format "Bearer ${token}"
## Response
* user: Object of user found by id 
**OR if there is no user with this id**
* err: 'No user found'
**OR if error occures**
* err: Error object
------
**DELETE /api/v1/users** <br/>
## Request
header: 
* Authorization: JWT Token in format "Bearer ${token}" <br/>

body: 
* id: ID of user to be deleted
## Response
* deleted: 'Success'
**OR if there is no user with this id**
* err: 'No user found'
**OR if error occures**
* err: Error object
------
**PUT /api/v1/users** <br/>
## Request
header: 
* Authorization: JWT Token in format "Bearer ${token}" <br/>

body: 
* id: ID of the user to be updated
* password (optional): New password for user
* firstName (optional): New first name for user
* lastName (optional): New last name for user
* position (optional): New position for user
* email (optional): New email for user
* phone (optional): New phone number for user
* type (optional): New type for user
* manager (optional): ID of new managerfor user
* teamlead (optional): ID of new teamlead for user
* department (optional): ID of new department for user
* photoURL (optional): URL of new photo for user
* hr (optional): ID of new hr  for user
## Response
* user object of updated user
**OR if there is no user with this id**
* err: 'No user found'
**OR if error occures**
* err: Error object
------
