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

        $scope.getTest = function(patientNo) {
            TestService.getTest(patientNo).then((test) => {
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

        $scope.plasmaGlugoseLevelList = ["Normal", "Pre-Diabetes", "Diabetes"];
        $scope.totalCholesterolLevelList = ["Desirable", "Border Line High", "High"];
        $scope.lDLCholesterolLevelList = ["Optimal", "Near Optimal", "Borderline Optimal", "High", "Very High"];
        $scope.hDLCholesterolLevelList = ["Normal", "Medium", "High"];
        $scope.urineColorList = ["clear", "Pale Straw Yellow", "Honey", "Orange", "Blue", "Green", "Fizzy", "Transparent yellow", "Dark yellow", "brown", "pink"];
        $scope.clarityList = ["Clarity", "Cloudy"];
        $scope.sputumRaceList = ["White", "Non-White", "unknown"];
        $scope.spontaneousSputumProductionList = ["yes", "no", "unknown"];
        $scope.hivSerologyList = ["positive", "negative"];
        $scope.respiratorySymtomsList = ["yes", "no", "unknown"];

        initializeTests();
    }
]);