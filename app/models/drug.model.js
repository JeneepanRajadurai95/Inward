// app/models/drug.model.js

'use strict';

const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    name: { type: String, required: true },
    bname: { type: String, required: true },
    serial: { type: String, required: true },
    quantity: { type: Number, required: true },
    vial: { type: String, required: true },
    root: { type: String, required: true },
    mfd: { type: Date, default: Date.now() },
    exp: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Drug', drugSchema);