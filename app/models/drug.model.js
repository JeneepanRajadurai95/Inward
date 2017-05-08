// app/models/drug.model.js

'use strict';

const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    name: String,
    serial: String,
    mfd: String,
    exp: String
});

module.exports = mongoose.model('Drug', drugSchema);