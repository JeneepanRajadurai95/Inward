// app/api.routes/doctor.api.routes.js

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const DoctorModel = mongoose.model('Doctor');

const Router = express.Router();

Router.get('/', (req, res) => {
    DoctorModel.find().exec().then((doctors) => {
        res.json(doctors);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
});

Router.post('/', (req, res) => {
    const doctor = new DoctorModel(req.body);
    doctor.save().then((doctor) => {
        res.json(doctor);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
})

module.exports = Router;