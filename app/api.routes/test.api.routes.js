'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();
const TestModel = mongoose.model('Test');

Router.get('/', (req, res) => {
    TestModel.find().exec().then((tests) => {
        res.json(tests);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    TestModel.findOne({ '_id': req.params.id }).exec().then((test) => {
        res.json(test);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    // var body = req.body;
    // var patientID = body.
    // var newTest = new TestModel(req.body);
    // newTest.save().then((test) => {
    //     res.json(test);
    // }).catch((err) => {
    //     console.error(err);
    //     res.sendStatus(500);
    // });
    var body = req.body;

    switch (req.query.type) {
        case "blood":
            var patientID = body.patientID;

            TestModel.count({ 'patientID': patientID }).then((count) => {
                if (count > 0) {
                    return TestModel.findOneAndUpdate({ 'patientID': patientID }, {
                        $push: {
                            'bloodTest': body.bloodTest
                        }
                    })
                } else {
                    let newTest = new TestModel();
                    newTest.patientID = body.patientID;
                    newTest.bloodTest.push(body.bloodTest);
                    return newTest.save()
                }
            }).then((results) => {
                res.json(results);
            }, err => {
                console.error(err);
                res.sendStatus(500);
            });
            break;
        case "urine":
            var patientID = body.patientID;

            TestModel.count({ 'patientID': patientID }).then((count) => {
                if (count > 0) {
                    return TestModel.findOneAndUpdate({ 'patientID': patientID }, {
                        $push: {
                            'urineTest': body.urineTest
                        }
                    })
                } else {
                    let newTest = new TestModel();
                    newTest.patientID = body.patientID;
                    newTest.urineTest.push(body.urineTest);
                    return newTest.save()
                }
            }).then((results) => {
                res.json(results);
            }, err => {
                console.error(err);
                res.sendStatus(500);
            });
            break;
        case "stool":
            var patientID = body.patientID;

            TestModel.count({ 'patientID': patientID }).then((count) => {
                if (count > 0) {
                    return TestModel.findOneAndUpdate({ 'patientID': patientID }, {
                        $push: {
                            'stoolTest': body.stoolTest
                        }
                    })
                } else {
                    let newTest = new TestModel();
                    newTest.patientID = body.patientID;
                    newTest.stoolTest.push(body.stoolTest);
                    return newTest.save()
                }
            }).then((results) => {
                res.json(results);
            }, err => {
                console.error(err);
                res.sendStatus(500);
            });
            break;
        case "sputum":
            var patientID = body.patientID;

            TestModel.count({ 'patientID': patientID }).then((count) => {
                if (count > 0) {
                    return TestModel.findOneAndUpdate({ 'patientID': patientID }, {
                        $push: {
                            'sputumTest': body.sputumTest
                        }
                    })
                } else {
                    let newTest = new TestModel();
                    newTest.patientID = body.patientID;
                    newTest.sputumTest.push(body.sputumTest);
                    return newTest.save()
                }
            }).then((results) => {
                res.json(results);
            }, err => {
                console.error(err);
                res.sendStatus(500);
            });
            break;
        case "cardiogram":
            var patientID = body.patientID;

            TestModel.count({ 'patientID': patientID }).then((count) => {
                if (count > 0) {
                    return TestModel.findOneAndUpdate({ 'patientID': patientID }, {
                        $push: {
                            'echoCardiogramTest': body.echoCardiogramTest
                        }
                    })
                } else {
                    let newTest = new TestModel();
                    newTest.patientID = body.patientID;
                    newTest.echoCardiogramTest.push(body.echoCardiogramTest);
                    return newTest.save()
                }
            }).then((results) => {
                res.json(results);
            }, err => {
                console.error(err);
                res.sendStatus(500);
            });
            break;
        default:
            //-  console.log(err);
            return;
    }
});

module.exports = Router;