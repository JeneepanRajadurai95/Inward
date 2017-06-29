// public/services/patient.service.js

'use strict';

angular.module('patient.service', []).factory('PatientService', [
    '$http',
    '$q',
    function($http, $q) {
        return {
            getPatients: function() {
                let deferred = $q.defer();
                $http.get('/api/patients').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            getPatient: function(bht) {
                let deferred = $q.defer();
                $http.get('/api/patients/' + bht).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            addPatient: function(newPatient) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/patients',
                    data: $.param(newPatient),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    }
]);