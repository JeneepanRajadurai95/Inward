// public/services/ward.service.js

'use strict';

angular.module('ward.service', []).factory('WardService', [
    '$http',
    '$q',
    function($http, $q) {
        return {
            addWard: function(newWard) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/wards',
                    data: $.param(newWard),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            getWards: function() {
                let deferred = $q.defer();
                $http.get('/api/wards').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            getWardBeds: function(wardNumber) {
                let deferred = $q.defer();
                $http.get('/api/wards/' + wardNumber + '/beds').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            addWardBed: function(wardNumber) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/wards/' + wardNumber + '/beds'
                }).then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            getGreenBeds: function(wardNumber) {
                let deferred = $q.defer();
                $http.get('/api/wards/' + wardNumber + '/beds?filter=green').then((results) => {
                    deferred.resolve(results.data);
                }, (err) => {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            assignMaintenance: function(newMaintainer) {
                let deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/wards/' + newMaintainer.ward + '/maintenance',
                    data: $.param(newMaintainer),
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