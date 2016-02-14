'use strict';

const ListStorage = require('./liststorage');
const listStorage = new ListStorage();

const handlebars = require('handlebars');

const indexTemplate = handlebars.compile(`
    <title>List</title>
    <h1>List</h1>
    <ul>
      {{#each items}}
        <li><a href="/delete/{{_id}}">[&times;]</a> {{item}}</li>
      {{/each}}
    </ul>
    <form method="POST">
      <label>Add something:</label>
      <input name="item" autofocus="autofocus" />
      <input type="submit" value="Submit" />
    </form>
`);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    listStorage.toArray((err, items) => {
        if (err) throw err;
        res.send(indexTemplate({items: items}));
    });
});

app.post('/', (req, res) => {
    listStorage.push(req.body.item, err => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/delete/:_id', (req, res) => {
    listStorage.remove(req.params._id, err => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(8080);
