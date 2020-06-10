// este es el archivo que arranca la aplicación

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// Inicializaciones

const app = express();

// Settings configuraciones que necesita el servidor de express
app.set('port',process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false})) // para los datos de los formularios
app.use(express.json());

// Middleware

app.use(morgan('dev'));

// Global variables
app.use((req, res, next) =>{

    next();
})

// Routes

app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));


//Public

app.use(express.static(path.join(__dirname,'public')));

//Starting the server

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})