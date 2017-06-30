// app/models/patient.model.js

'use strict';

const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');

const patientSchema = mongoose.Schema({
    ID: {
        type: String,
        unique: true
    },
    Name: {
        title: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        }
    },
    DOB: {
        type: Date,
        required: true
    },
    Age: {
        type: Number
    },
    Sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    MarriedStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced']
    },
    EmployementStatus: {
        type: String,
        enum: ['Working', 'Retired', 'None']
    },
    ContactInfo: {
        Address: {
            AddressLine: {
                type: String,
                required: true
            },
            Zip: {
                type: Number,
                min: [4, 'Not valid ZIP'],
                max: 6,
                required: true
            },
            City: {
                type: String,
                required: true
            },
            Country: {
                type: String,
                required: true
            }
        },
        Phone: {
            Home: {
                type: Number,
                validate: {
                    validator: function(v) {
                        return /\d{10}/.test(v);
                    },
                    message: '{VALUE} is not a valid phone number!'
                },
                required: true
            },
            Mobile: {
                type: Number,
                required: true
            },
            Office: {
                type: Number
            }
        }
    },
    allergies: [{
        name: {
            type: String
        },
        remarks: {
            type: String
        },
        status: {
            type: String,
            enum: ['Current', 'Past']
        }
    }],
    Inward: {
        bhtNumber: {
            type: String,
            unique: true
        },
        wardNumber: {
            type: String,
            required: true
        },
        bedNumber: {
            type: String,
            required: true
        },
        admittedDateTime: {
            type: Date,
            default: Date.now()
        },
        disease: {
            diseaseType: {
                type: String
            },
            explanation: {
                type: String
            }
        },
        history: [{
            bhtNumber: {
                type: String
            },
            wardNumber: {
                type: String
            },
            bedNumber: {
                type: String
            },
            admittedDateTime: {
                type: Date
            },
            disease: {
                diseaseType: {
                    type: String
                },
                explanation: {
                    type: String
                }
            },
            transfer: {
                transferType: {
                    type: String
                },
                reason: {
                    type: String
                },
                remarks: {
                    type: String
                },
                treatmentSuggested: {
                    type: String
                },
                date: {
                    type: Date
                }
            },
            discharge: {
                bool: {
                    type: String,
                    enum: ['True', 'False']
                },
                remarks: {
                    type: String
                },
                outcomes: {
                    type: String
                },
                referedTo: {
                    type: String
                },
                diagnosis: {
                    type: String
                },
                date: {
                    type: Date
                }
            }
        }]
    },
    discharged: {
        type: String,
        enum: ['True', 'False']
    },
    ResponsibleParty: {
        Name: {
            title: {
                type: String,
                required: true
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            }
        },
        Age: {
            type: Number,
            required: true
        },
        Sex: {
            type: String,
            enum: ['Male', 'Female'],
            required: true
        },
        MarriedStatus: {
            type: String,
            enum: ['Single', 'Married', 'Divorced']
        },
        EmployementStatus: {
            type: String,
            enum: ['Working', 'Retired', 'None']
        },
        ContactInfo: {
            Address: {
                AddressLine: {
                    type: String,
                    required: true
                },
                Zip: {
                    type: Number,
                    min: [4, 'Not valid ZIP'],
                    max: 6,
                    required: true
                },
                City: {
                    type: String,
                    required: true
                },
                Country: {
                    type: String,
                    required: true
                }
            },
            Phone: {
                Home: {
                    type: Number,
                    required: true
                },
                Mobile: {
                    type: Number,
                    required: true
                },
                Office: {
                    type: Number
                }
            }
        }
    }
});

patientSchema.pre('save', function(next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'patient' }, { $inc: { seq: 1 } }, function(error, counter) {
        if (error) {
            return next(error);
        }
        doc.ID = "P-0" + counter.seq;
        Counter.findByIdAndUpdate({ _id: 'bht' }, { $inc: { seq: 1 } }, function(error, bhtCounter) {
            if (error) {
                return next(error);
            }
            doc.Inward.bhtNumber = "BHT-" + bhtCounter.seq;
            let d = {
                "diseaseType": doc.Inward.disease.diseaseType,
                "explanation": doc.Inward.disease.explanation
            };
            let h = {
                "bhtNumber": doc.Inward.bhtNumber,
                "wardNumber": doc.Inward.wardNumber,
                "bedNumber": doc.Inward.bedNumber,
                "admittedDateTime": doc.Inward.admittedDateTime,
                "disease": d
            };
            doc.Inward.history.push(h);
            next();
        });
    });
});

module.exports = mongoose.model('Patient', patientSchema);