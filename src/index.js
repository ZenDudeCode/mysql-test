// este es el archivo que arranca la aplicación

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');

const { database } = require('./keys');

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



// Middleware
app.use(session({
  secret: 'texto',
  resave: false,
  saveUninitialized: false,
  store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})) // para los datos de los formularios
app.use(express.json());


// Global variables
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
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