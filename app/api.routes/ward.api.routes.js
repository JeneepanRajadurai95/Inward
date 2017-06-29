// app/api.routes/ward.api.routes.js

'use strict';

const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');
const WardModel = mongoose.model('Ward');
const BedModel = mongoose.model('Bed');

Router.get('/', (req, res) => {
    WardModel.find().exec().then((wards) => {
        res.json(wards);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id/beds', (req, res) => {

    switch (req.query.filter) {
        case "green":
            WardModel.findOne({ 'wardNumber': req.params.id })
                .populate({ path: 'beds', match: { 'patient.ID': 'null' } }).exec().then((greenBeds) => {
                    res.json(greenBeds);
                }).catch((err) => {
                    console.error(err);
                    res.sendStatus(500);
                });
            break;
        default:
            WardModel.findOne({ 'wardNumber': req.params.id }).populate('beds').exec().then((wardBeds) => {
                res.json(wardBeds);
            }).catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
            break;
    }
});

Router.post('/', (req, res) => {
    let newWard = new WardModel(req.body);
    newWard.save().then((ward) => {
        res.json(ward);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id/beds', (req, res) => {
    let newBed = new BedModel(req.body);
    const wardNumber = req.params.id;
    newBed.ward = wardNumber;
    newBed.save().then(bed => {
        return WardModel.findOneAndUpdate({ 'wardNumber': wardNumber }, { $push: { "beds": bed._id } });
    }).then(() => {
        return WardModel.findOne({ 'wardNumber': req.params.id }).populate('beds').exec();
    }).then(wardBeds => {
        res.json(wardBeds);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;