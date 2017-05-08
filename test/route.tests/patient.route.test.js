// test/route.tests/patient.route.test.js

const mocha = require('mocha');
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../server');
const agent = request.agent(app);

const PatientModel = mongoose.model('Patient');

let patient = {
    ID: 'P-99',
    Name: {
        firstName: 'Sample',
        lastName: 'Test'
    },
    Age: 45,
    Sex: 'Male',
    MarriedStatus: 'Single',
    EmployementStatus: "Retired",
    ContactInfo: {
        Address: {
            AddressLine: "Some Address Line",
            Zip: 0013,
            City: "Country"
        },
        Phone: {
            Home: 0112345671,
            Mobile: 0112345671,
            Office: 0112345671
        }
    },
    Inward: {
        bhtNumber: "-99",
        bedNumber: 99,
        admittedDateTime: Date.now()
    }
};

let patientID;

describe('Patient API Router Test', function() {

    after(done => {
        PatientModel.remove().then(() => done()).catch(done);
    });


    it('should add new Patient', (done) => {
        agent.post('/api/patient').set('Content-Type', 'application/x-www-form-urlencoded')
            .send(patient).expect(201).end(function(err, res) {
                patientID = res.body._id;
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            });
    });

    it('should get a Patient by ID', (done) => {
        agent.get('/api/patient/'.concat(patient.Inward.bhtNumber))
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return reject(err);
                }
                res.body.should.have.property('_id').equal(patientID);
                done();
            });
    });
});