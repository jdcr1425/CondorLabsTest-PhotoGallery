const express = require('express');
const morgan = require('morgan'); // it allows to create logs or messages of what client apps are requesting
const path = require('path');
const bodyParser = require('body-parser');
const cors = require ('cors');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); //dotenv allows you to read .env file.
}


//Inizialitations

const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//Middlewares  (functions that are executed when a request comes up)

app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false, limit: '100mb', parameterLimit: 1000000 }));
app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use('/api', require('./routes/photos'));
app.use('/api', require('./routes/albums'));

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Start the server 
app.listen(app.get('port'), () => {
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Server on port', app.get('port'));
});
