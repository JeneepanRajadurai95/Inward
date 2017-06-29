// public/controllers/ward.controller.js

'use strict';

angular.module('ward.controller', []).controller('WardController', [
    '$scope',
    'WardService',
    function($scope, WardService) {

        $scope.cward = {};
        $scope.cbed = {};
        $scope.wardWithBeds = 'null';

        $scope.partialForm = 'null';

        $scope.addWard = function(cward) {
            WardService.addWard(cward).then((ward) => {
                $scope.wards.push(ward);
            }, (err) => {
                console.log(err);
            });
        };

        $scope.getWards = function() {
            WardService.getWards().then((wards) => {
                $scope.wards = wards;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.addWardBed = function(wardNumber) {
            WardService.addWardBed(wardNumber).then(() => {
                // TO-DO
                // $scope.Beds = beds;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.getWardBeds = function(wardNumber) {
            WardService.getWardBeds(wardNumber).then((results) => {
                $scope.wardWithBeds = results;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.getWards();
    }
]);