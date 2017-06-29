// app/models/ward.model.js

'use strict';

const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');

const wardSchema = mongoose.Schema({
    wardNumber: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    beds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bed'
    }]
});

wardSchema.pre('save', function(next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'ward' }, { $inc: { seq: 1 } }, function(error, counter) {
        if (error) {
            return next(error);
        }
        doc.wardNumber = "WARD-" + counter.seq;
        next();
    });
});

module.exports = mongoose.model('Ward', wardSchema);