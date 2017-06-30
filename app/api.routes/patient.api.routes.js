// app/api.routes/patient.api.routes.js

'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();
const PatientModel = mongoose.model('Patient');
const CounterModel = mongoose.model('Counter');
const WardModel = mongoose.model('Ward');
const WardBedModel = mongoose.model('Bed');

Router.get('/', (req, res) => {
    PatientModel.find().exec().then((patients) => {
        res.json(patients);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:bht', (req, res) => {
    PatientModel.findOne({ 'Inward.bhtNumber': req.params.bht }).exec().then((patient) => {
        res.json(patient);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    let newPatient = new PatientModel(req.body);
    newPatient.save().then((patient) => {
        res.json(patient);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id/transfer', (req, res) => {
    let body = req.body;
    let global = {};
    PatientModel.findOne({ 'ID': body.patientID }).exec().then((patient) => {
        global = patient;
        return WardBedModel.findOneAndUpdate({ 'ward': patient.Inward.wardNumber, 'bedNumber': patient.Inward.bedNumber }, {
            $set: { 'patient.ID': 'null' }
        })
    }).then(() => {
        return WardBedModel.findOneAndUpdate({ 'ward': body.Inward.wardNumber, 'bedNumber': body.Inward.bedNumber }, {
            $set: { 'patient.ID': global.ID }
        })
    }).then(() => {
        return CounterModel.findByIdAndUpdate({ _id: 'bht' }, { $inc: { seq: 1 } })
    }).then((counter) => {
        let t = {
            "reason": body.reason,
            "treatmentSuggested": body.treatmentSuggested,
            "date": body.transferDate,
            "transferType": "Internal",
            "remarks": body.remarks
        };

        let history = {
            "bhtNumber": 'BHT-' + counter.seq,
            "wardNumber": body.Inward.wardNumber,
            "bedNumber": body.Inward.bedNumber,
            "transfer": t
        };

        return PatientModel.findOneAndUpdate({ 'ID': body.patientID }, {
            $set: {
                "Inward.bhtNumber": 'BHT-' + counter.seq,
                "Inward.wardNumber": body.Inward.wardNumber,
                "Inward.bedNumber": body.Inward.bedNumber
            },
            $push: {
                "Inward.history": history
            }
        })
    }).then(() => {
        return PatientModel.findOne({ 'ID': body.patientID }).exec();
    }).then(transferred => {
        res.json(transferred);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

Router.put('/:id/discharge', (req, res) => {
    let body = req.body;
    let global = {};
    PatientModel.findOne({ 'ID': body.patientID }).exec().then((patient) => {
        global = patient;
        return WardBedModel.findOneAndUpdate({ 'ward': patient.Inward.wardNumber, 'bedNumber': patient.Inward.bedNumber }, {
            $set: { 'patient.ID': 'null' }
        })
    }).then(() => {
        let discharge = {
            "bool": 'True',
            'remarks': body.remarks,
            'outcomes': body.outcomes,
            'referedTo': body.referedTo,
            'diagnosis': body.diagnosis,
            'date': body.dischargeDate
        };
        return PatientModel.findOneAndUpdate({ 'ID': body.patientID, 'Inward.history.bhtNumber': global.Inward.bhtNumber }, {
            $set: {
                'discharged': 'True',
                'Inward.history.$.discharge': discharge
            }
        })
    }).then(() => {
        return PatientModel.findOne({ 'ID': body.patientID }).exec();
    }).then(transferred => {
        res.json(transferred);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

Router.put('/:id/allergy', (req, res) => {
    let body = req.body;
    let allergies = {
        "name": body.name,
        "remarks": body.remarks,
        "status": body.status
    };
    PatientModel.findOneAndUpdate({ 'ID': body.patientID }, {
        $push: {
            "allergies": allergies
        }
    }).exec().then((patient) => {
        res.json(patient);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = Router;