import express from 'express';
import morgan from 'morgan';
import Promise from 'bluebird';
import sqlite from 'sqlite';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import aka from './aka';

const app = express();

// create a write stream
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

// setup the logger
app.use(morgan('tiny', { stream: accessLogStream }));

// set parsings for all
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use the default router aka
app.use('/', aka);

// start the application
app.listen(3000, () => {
    sqlite.open('./database.sqlite', { Promise })
        .then((urlsDb) => {
            // execute creation of table url (id, slug, addr, numAccess)
            urlsDb.exec(
                'CREATE TABLE IF NOT EXISTS url ' +
                '(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                ' slug VARCHAR(50) UNIQUE NOT NULL,' + 
                ' addr TEXT NOT NULL,' + 
                ' numAccess INT(11) NOT NULL)'
            ).then(() => {
                console.log('Database successfully initialized');
                console.log('AKA is running at port 3000');
            }).catch(() => {
                console.error('Error while setting up database. AKA is going down');
                process.exit(-1);
            });
        });
    
})