// public/controllers/test.controller.js

'use strict';

angular.module('test.controller', []).controller('TestController', [
    '$scope',
    '$rootScope',
    '$http',
    'TestService',
    function($scope, $rootScope, $http, TestService) {
        $scope.partialForm = 'null';
        $scope.ctest = {};

        function initializeTests() {
            TestService.getTests().then((tests) => {
                $scope.rtests = tests;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getTest = function(serialnumber) {
            TestService.getTest(serialnumber).then((test) => {
                $scope.dtest = test;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.addTest = function(ctest) {
            TestService.addTest(ctest).then((newTest) => {
                $scope.rtests.push(newTest);
                $scope.ctest = {};
            }, (err) => {
                console.log(err);
            });
        };

        initializeTests();
    }
]);