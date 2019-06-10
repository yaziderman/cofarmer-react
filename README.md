# cofarmer-react
A Front-end React based application for the CoFarmer Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## How to setup

In order to start this application as a development environment, you will need to follow the steps:
- clone the repository.
- Make sure thr file: .env is available under the root, and make sure the following parameters are set as required:
```
REACT_APP_SCHEME=http://
REACT_APP_GATEWAY_HOST=localhost:8000/api
REACT_APP_HOST=localhost:3000
```
- Sync the packages: 
```
npm i
```
*If you don't have NodeJS installed, please refer to the link: https://nodejs.org/en/download/

- Execute the command to fix an issue with the react=popconfirm plugin, applicable for Windows. For Linux or any other operating system, please translate the two instructions or execute them manually.
```
./fix_library.bat
```
- Start the application: 
```
npm start
```

In order to Login, you need to create a new user firstly, You can refer to Swagger interface aquired by the reposiotory: https://github.com/yaziderman/cofarmer to do so.
