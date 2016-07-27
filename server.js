var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    db = require('./config/database.js'),
    localStrategies = require('passport-local').Strategy,
    fileUpload = require('express-fileupload');

mongoose.connect(db.url, function(err){
    if(err) {console.log('Error Connection to: ' + db.production.url + '\n' + err)}
    else{console.log('Connection Successful')}
    //Database Drop
    // mongoose.connection.db.dropDatabase();
});

app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vdn.api+json'}));
app.use(cookieParser());
app.use(methodOverride());

app.use(session({secret: 'ihatecats', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());

app.use('/', require('./controllers'));

require('./config/passport');

app.listen(port);
console.log('Listening on port ' + port);
