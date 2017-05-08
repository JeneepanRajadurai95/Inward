// app/api.routes/drug.api.routes.js

'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();
const DrugModel = mongoose.model('Drug');

Router.get('/', (req, res) => {
    DrugModel.find().exec().then(drugs => {
        res.json(drugs);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:serial', (req, res) => {
    DrugModel.findOne({ 'serial': req.params.serial }).exec().then(drug => {
        res.json(drug);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    var newDrug = new DrugModel(req.body);
    newDrug.save().then(drug => {
        res.json(drug);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;