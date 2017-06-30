// app/api.routes/doctor.api.routes.js

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const DoctorModel = mongoose.model('Doctor');
const ScheduleModel = mongoose.model('Schedule');

const Router = express.Router();

Router.get('/', (req, res) => {
    DoctorModel.find().exec().then((doctors) => {
        res.json(doctors);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
});

Router.get('/schedules', (req, res) => {
    ScheduleModel.find().exec().then((doctors) => {
        res.json(doctors);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
});

Router.get('/:id', (req, res) => {
    DoctorModel.findOne({ 'ID': req.params.id }).exec().then((doctor) => {
        res.json(doctor);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const doctor = new DoctorModel(req.body);
    doctor.save().then((doctor) => {
        res.json(doctor);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/schedule', (req, res) => {
    // let schedule = req.body;
    let model = new ScheduleModel(req.body);
    // model.patientID = schedule.ID;
    // model.doctorID = schedule.doctor;
    // model.date = schedule.date;

    model.save().then(results => {
        res.json(results);
    }, err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;