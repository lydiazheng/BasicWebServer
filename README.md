In this assignment, we would like to implement a basic JSON server for a set of users. You web application will have two features: adding a set of users (and storing them into a .json file) and displaying the current users.

##### DESCRIPTION:
Write a basic JSON web server. This web server will be collecting and storing information on a set of users:
1. When a client sends a GET request for the "/" folder (the root of the application), they will be served a form called “form.html”. The requirements for form.html is as follows:
- A form containing (minimally) fields for the users first
name, last name, birthday, email(s) and a submit button.
You may add other fields if you’d like.
- Users should also have the ability to add as many users
as they’d like at the same time (for example, by clicking on an “ADD MORE” button).
One possible layout for the form is on the right (do not copy this, it’s hard to explain this using just words :)
2. When this form is submitted, it should be sent to the root directory "/" of the application in form of a POST request. The application should append the new user(s) onto the user.json file. If the file does not exist, create it.
3. When a client sends a GET request for the "/data/users.json", the users.json file should be sent back as a response. If the file does not exist, a valid json file must still be sent, it will just be an empty object or array (depending on your choice of schema).
4. When a client sends a GET request for the "/users.html" page, respond with a table of the existing users in the form of an html file.
5. All other requests will be a 404 error.
    
You are allowed to add any other files you’d like (i.e. a css file or a js file). Once again, it is totally up to you how you would like to organize your code, but here are several requirements:
- Do not create the users.json file manually on the server, it must be done through your code. 
- It is up to you how you’d like to to define your users schema. However, it must be valid JSON format.
- Make your code as robust as possible, meaning that you can move the whole application somewhere else and it will still work :)
- Be sure to use the appropriate web conventions discussed in class (i.e. using proper request methods, etc.).
- Usability: it is up to you how you would like to make your app more usable. Some examples would be error checking, interactive feedback, adding a “delete all users” button, and sorting the users in the users.json file.

For this assignment,
- you may not use frameworks such as jQuery, Ember, Angular, bootstrap, etc.
- you may not use any community packages on NPM (only the default packages in Node.js).
