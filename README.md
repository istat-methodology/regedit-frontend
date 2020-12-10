[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=istat-methodology_regedit-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=istat-methodology_regedit-frontend)
[![Build Status](https://travis-ci.org/istat-methodology/regedit-frontend.svg?branch=main)](https://travis-ci.org/istat-methodology/regedit-frontend)

# regedit-frontend
Frontend for editing statistical registers data. The application is implemented using Vue.

## Environment setup
In order to start working on regedit frontend, you should install:
1. [Visual studio code](https://code.visualstudio.com/)
2. [Node js](https://nodejs.org/en/download/)

To test if node.js has been succesfully installed in your machine, open your favorite shell and run:

```
node -v
 npm -v
```
It is also important to add the following extensions to Visual studio code:
1. **Vetur**: an extension designed for Vue.
2. **ESLint**: an extension that enables javascript [Eslint](https://eslint.org/). ESLint is a powerful tool, that finds and fixes problems in our javascript code :)

## Project setup
Your development environment is ready, it is time to start coding. First of all clone the project in your development folder:

```
D:
cd ./development
git clone https://github.com/istat-methodology/regedit-frontend.git
```
Open the project in visual studio code. In order to install the application, open a terminal (Terminal -> New Terminal) and run:
```
npm install
```
This operation could take time, node will install all the project dependencies in the folder node_modules.

## Json server setup
To test server REST APIs, we will use [JSON Server](https://github.com/typicode/json-server). 

First of all, you should install the server:
```
npm install -g json-server
``` 
To run the server you should move to the [database folder](is2-frontend/tree/master/db) and execute the following command:
```
json-server --watch db.json
```
Now if you go to http://localhost:3000/services/1, you'll get
```
{ "id": 1, "name": "Relais", "description": "Record Linkage at Istat", "organization": "Istat" }
```
Also when doing requests, it's good to know that:

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to db.json using lowdb.
- Your request body JSON should be object enclosed, just like the GET output. (for example {"name": "Foobar"})
- Id values are not mutable. Any id value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a Content-Type: application/json header to use the JSON in the request body. Otherwise it will return a 2XX status code, but without changes being made to the data.

### Compiles and hot-reloads for development
It's time to run our application in the localhost development server. Run the following command:
```
npm run serve
```
If the environment was correctly setup, you shold get the following output:
```
App running at:
- Local:    http://localhost:8070/
- Network:  http://localhost:8070/
```
Now you can open your favorite browser at http://localhost:8070/


### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
