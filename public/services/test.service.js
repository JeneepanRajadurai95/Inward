// public/services/test.service.js

'use strict';

angular.module('test.service', []).factory('TestService', [
    '$http',
    '$q',
    function($http, $q) {
        return {
            getTests: function() {
                let deferred = $q.defer();
                $http.get('/api/tests').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            getTest: function(patientNo) {
                let deferred = $q.defer();
                $http.get('/api/tests/' + patientNo).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            addTest: function(newTest) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/tests',
                    data: $.param(newTest),
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