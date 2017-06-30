// public/services/doctor.service.js

'use strict';

angular.module('doctor.service', []).factory('DoctorService', [
    '$http',
    '$q',
    function($http, $q) {
        return {
            getdoctors: function() {
                let deferred = $q.defer();
                $http.get('/api/doctors').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            addDoctor: function(newDoctor) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/doctors',
                    data: $.param(newDoctor),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            getDoctor: function(doctorID) {
                let defer = $q.defer();
                $http.get('/api/doctors/' + doctorID).then((results) => {
                    defer.resolve(results.data);
                }, (err) => {
                    defer.reject(err);
                });

                return defer.promise;
            },

            scheduleAppointment: function(appointment) {
                let defer = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/doctors/schedule',
                    data: $.param(appointment),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(result => {
                    defer.resolve(result.data);

                }, err => {
                    defer.reject(err);
                });
                return defer.promise;
            },

            getScheduledEvents: function() {
                let deferred = $q.defer();
                $http.get('/api/doctors/schedules').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });

                return deferred.promise;
            }
        }
    }
]);