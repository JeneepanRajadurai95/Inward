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

        $scope.endDateBeforeRender = endDateBeforeRender
        $scope.endDateOnSetTime = endDateOnSetTime
        $scope.startDateBeforeRender = startDateBeforeRender
        $scope.startDateOnSetTime = startDateOnSetTime

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

        $scope.addDrug = function() {
            var bool = false;
            for (var i in $scope.rdrugs) {
                if ($scope.cdrug.serial == $scope.rdrugs[i].serial) {
                    bool = true;
                    break;
                }
            }
            if (!bool) {
                DrugService.addDrug($scope.cdrug).then(result => {
                    $scope.rdrugs.push(result);
                    $scope.cdrug = {};
                }, err => {
                    console.error(err);
                });
            } else {
                DrugService.updateDrug($scope.cdrug).then(result => {
                    console.log("success");
                }, err => {
                    console.error(err);
                });
            }
        };


        //time rendering
        function startDateOnSetTime() {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime() {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender($dates) {
            if ($scope.cdrug.exp) {
                var activeDate = moment($scope.cdrug.exp);

                $dates.filter(function(date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function(date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender($view, $dates) {
            if ($scope.cdrug.mfd) {
                var activeDate = moment($scope.cdrug.mfd).subtract(1, $view).add(1, 'minute');

                $dates.filter(function(date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function(date) {
                    date.selectable = false;
                })
            }
        }


        initializeDrugs();






    }


]);