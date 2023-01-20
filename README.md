# NomadGUARD

## LOCAL SETUP

1. Clone the repo on your local ('dev' branch) and run "npm install".
2. Finally command "npm run start" to run the web instance.

Port 3000 should be used, otherwise update the env variables accordingly. 

"/src/config.json" file

``` 
"SERVER_URL": "http://localhost:8080"
 ```

### Requirements

- Node.js and npm

### Getting started

Run the following command on your local environment:

```
npm install
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.


### Deploy to production

You can see the results locally in production mode with:

```
$ npm run build
$ npm run start
```