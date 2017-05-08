// app/models/doctor.model.js

'use strict';

const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    name: String,
    gender: String,
    address: String,
    phone: {
        type: Number,
        validator: (v) => {
            return /d{10}/.test(v);
        }
    },
    department: String,
    designation: String
});

module.exports = mongoose.model('Doctor', DoctorSchema);