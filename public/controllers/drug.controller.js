// public/controllers/drug.controller.js

'use strict';

angular.module('drug.controller', []).controller('DrugController', [
    '$scope',
    '$rootScope',
    '$http',
    'DrugService',
    function($scope, $rootScope, $http, DrugService) {
        $scope.partialForm = 'null';
        $scope.cdrug = {};

        function initializeDrugs() {
            DrugService.getDrugs().then((drugs) => {
                $scope.rdrugs = drugs;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getDrug = function(serialnumber) {
            DrugService.getDrug(serialnumber).then((drug) => {
                $scope.ddrug = drug;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.addDrug = function(cdrug) {
            DrugService.addDrug(cdrug).then((newDrug) => {
                $scope.rdrugs.push(newDrug);
                $scope.cdrug = {};
            }, (err) => {
                console.log(err);
            });
        };

        initializeDrugs();
    }
]);