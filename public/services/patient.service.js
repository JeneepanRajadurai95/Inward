// public/services/patient.service.js

'use strict';

angular.module('patient.service', []).factory('PatientService', [
    '$http',
    '$q',
    function($http, $q) {
        return {
            getPatients: function() {
                var deferred = $q.defer();
                $http.get('/api/patient').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            getPatient: function(bht) {
                var deferred = $q.defer();
                $http.get('/api/patient/' + bht).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            addPatient: function(newPatient) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/patient',
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
])