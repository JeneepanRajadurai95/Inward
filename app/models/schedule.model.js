'use strict';

const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');

const scheduleSchema = mongoose.Schema({
    ID: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    patientID: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        // required: true
    },
    doctorID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startsAt: {
        type: Date,
    },
    color: {
        primary: {
            type: String
        },
        secondary: {
            type: String
        }
    }
    // sheduled: {
    //     type: String,
    //     enum: ['True', 'False'],
    //     // required: true
    // }
});

scheduleSchema.pre('save', function(next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'schedule' }, { $inc: { seq: 1 } }, function(error, counter) {
        if (error) {
            return next(error);
        }
        doc.ID = "SC-" + counter.seq;
        doc.title = doc.patientID + ' Appoints ' + doc.doctorID;
        doc.startsAt = new Date(doc.date);
        doc.color.primary = '#e3bc08';
        doc.color.secondary = '#fdf1ba';
        next();
    });
});

module.exports = mongoose.model('Schedule', scheduleSchema);