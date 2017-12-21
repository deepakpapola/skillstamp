import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
// import config from 'config';
import config from './config/config';
import routes from './routes';
import url from 'url';
import expressValidator from 'express-validator';
import passport from "passport";
import validator from 'express-validator';

let app = express();
dotenv.load();
var port     = process.env.PORT || 3000;
// connect mongoose to database
mongoose.connect(config.database);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'));

app.use(passport.initialize()); //paspport init
app.use(passport.session());

app.use(validator());

app.use('/',routes);
app.use(express.static(path.join(__dirname,'../skillstamp-angular/dist')));
app.use(express.static(path.join(__dirname,'./uploads')));
app.set('trust proxy');
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'../skillstamp-angular/dist/index.html'));
})


// catch 404
app.use((req, res, next) =>{
    var err = new Error('new error in somewhere---this is midlwe--------------');
    err.status = 404;
    next(err);
  });


app.listen(port,() => console.log('running on port',port));

