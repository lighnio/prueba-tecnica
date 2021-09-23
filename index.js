// Modules
const { urlencoded } = require('express');
const express = require('express');
const morgan = require('morgan');  
const cors = require('cors');  
const app = express();

// Config
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(morgan('dev'));

// Requires
app.use(require('./src/routes/index'));


app.listen(app.get('port'), () => {
    console.log(`App running in: ${app.get('port')}`);
});