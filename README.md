# Clever Job Hunter

Throw away those spreadsheets and todo apps! 

Clever Job Hunter is a central location where you can keep information about positions, companies, and contacts related to jobs that you've applied for or would like to apply.

…but if you want a spreadsheet, we do offer the ability to export information in a .csv format.

[Live Site Here](http://insertclevernamehere.herokuapp.com/#/)


## Technologies used
- MongoDB
- Express
- AngularJS
- node.js
- Webpack
- deployed via Heroku


### Directions to run locally
1. Download the files
2. Set up database
  - [Download MongoDB](https://www.mongodb.com/download-center#community)
  - Start the database `mongod --dbpath [path to your MongoDB folder here]`
3. Set up the server
  - `cd cleverjobserver` and `npm install`
  - Start the server `npm start` (in a new terminal window)
4. Set up the frontend
  - New terminal window and `cd cleverjobhunter`
  - `npm install` and `npm start`
  - Navigate to `localhost:8080` in a web browser

What about setting instructions for `.env`?

### Misc Info
- Server runs on `localhost:3000` by default
- Frontend runs on `localhost:8080` by default


### Tests
`cd app` and `npm run test`
