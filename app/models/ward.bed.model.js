// app/models/ward.bed.model.js

'use strict';

const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');

const bedSchema = mongoose.Schema({
    bedNumber: {
        type: String,
        unique: true
    },
    addedDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    patient: {
        ID: {
            type: String,
            default: 'null'
        },
        date: {
            type: Date,
            default: Date.now()
        }
    },
    ward: {
        type: String,
        ref: 'Ward'
    }
});

bedSchema.pre('save', function(next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'wardBed' }, { $inc: { seq: 1 } }, function(error, counter) {
        if (error) {
            return next(error);
        }
        doc.bedNumber = "WB-" + counter.seq;
        next();
    });
});

module.exports = mongoose.model('Bed', bedSchema);