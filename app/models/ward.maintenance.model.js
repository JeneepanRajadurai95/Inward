// app/models/ward.maintenance.model.js

'use strict';

const mongoose = require('mongoose');

const maintenanceSchema = mongoose.Schema({
    staff: {
        nic: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    ward: {
        type: String,
        ref: 'Ward'
    },

});
module.exports = mongoose.model('Maintenance', maintenanceSchema);