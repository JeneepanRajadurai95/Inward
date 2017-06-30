'use strict';

const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');
const DoctorSchema = mongoose.Schema({
    ID: {
        type: String,
        unique: true
    },
    Name: {
        Title: {
            type: String
        },
        Firstname: {
            type: String
        },
        Lastname: {
            type: String
        }
    },
    HealthCare: {
        Type: {
            type: String
        },
        SpecialType: {
            type: String
        }
    },
    ContactInfo: {
        Address: {
            AddressLine: {
                type: String
            },
            City: {
                type: String
            },
            State: {
                type: String
            },
            Zip: {
                type: Number
            }
        },
        Phone: {
            Mobile: {
                type: String,
                validator: (v) => {
                    return /d{10}/.test(v);
                }
            }
        }
    },
    Age: {
        type: String
    },
    Status: {
        type: String
    },
    Gender: {
        type: String
    },
    Department: {
        type: String
    },
    Designation: {
        type: String
    }


});

DoctorSchema.pre('save', function(next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'doctor' }, { $inc: { seq: 1 } }, function(error, counter) {
        if (error) {
            return next(error);
        }
        doc.ID = "D-0" + counter.seq;
        next();
    });
});

module.exports = mongoose.model('Doctor', DoctorSchema);