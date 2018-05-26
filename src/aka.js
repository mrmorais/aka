import { Router } from 'express';
import Promise from 'bluebird';
import sqlite from 'sqlite';

import { base_url } from '../config.js';

const aka = Router();

// open a SQLite conn
const dbPromise = sqlite.open('./database.sqlite', { Promise });

// access a URL
aka.get('/:slug', (req, res) => {
    dbPromise.then((database) => {
        database.all("SELECT * FROM url WHERE slug = ?", req.params.slug)
        .then((urls) => {
            if (urls.length == 0) {
                res.status(404).send("<h3>The address you're looking for doesn't exist. Did you look under the bed?</h3>");
            } else {
                database.exec("UPDATE url SET numAccess = " + parseInt(urls[0].numAccess + 1) + " WHERE id = " + urls[0].id)
                .then(() => {
                    res.redirect(urls[0].addr);
                });
            }
        })
        .catch(() => {
            res.json({error: true, message: "Something wrong happened!"});
        });
    })
});

// display the database object
aka.get('/detail/:slug', (req, res) => {
    dbPromise.then((database) => {
        database.all("SELECT * FROM url WHERE slug = ?", req.params.slug)
        .then((urls) => {
            if (urls.length == 0) {
                res.json({ error: true, message: "This aka doesn't exist" });
            } else {
                res.json({ error: false, aka: urls[0]});
            }
        })
        .catch(() => {
            res.json({error: true, message: "Something wrong happened!"});
        });
    });
});

// create a new URL
aka.all('/', (req, res) => {
    // we expect a 'url' and a 'slug' data
    const url = req.body.url || false;
    const slug = req.body.slug || false;

    if (!url || !slug) {
        res.json({ error: true, message: 'I was expecting a URL and a SLUG, but apparently one (or both) is missing' });
    } else {
        dbPromise.then((database) => {
            database.exec("INSERT INTO url(slug, addr, numAccess) VALUES(\'" + slug +"\', \'" + url +"\', 0)")
            .then(() => {
                res.json({ error: false, aka: base_url + slug });
            })
            .catch(() => {
                res.status(500).json({ error: true, message: 'There exists a aka with that slug. Please, pick another' });
            });
        })
        .catch(() => {
            res.json({error: true, message: "Something wrong happened!"});
        });
    }
});

export default aka;