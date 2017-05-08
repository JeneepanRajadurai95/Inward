// public/controllers/patient.controller.js

'use strict';

angular.module('patient.controller', []).controller('PatientController', [
    '$scope',
    '$rootScope',
    '$http',
    'PatientService',
    function($scope, $rootScope, $http, PatientService) {
        $scope.partialForm = 'null';
        $scope.cpatient = {};

        function initializePatients() {
            PatientService.getPatients().then((patients) => {
                $scope.rpatients = patients;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getPatient = function(bhtnumber) {
            PatientService.getPatient(bhtnumber).then((patient) => {
                $scope.dpatient = patient;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.addPatient = function(cpatient) {
            PatientService.addPatient(cpatient).then((newPatient) => {
                $scope.rpatients.push(newPatient);
                $scope.cpatient = {};
            }, (err) => {
                console.log(err);
            });
        };

        initializePatients();
    }
]);