// public/js/appRoutes.js

'use strict';

angular.module('appRoutes', []).config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', { // root of Dashboard
                templateUrl: 'template/dashboard',
                controller: 'AppController'
            })
            .when('/patient', {
                templateUrl: 'template/patient/patient.index',
                controller: 'PatientController'
            })
            .when('/doctor', {
                templateUrl: 'template/doctor/doctor.index',
                controller: 'DoctorController'
            })
            .when('/drug', {
                templateUrl: 'template/drug/drug.index',
                controller: 'DrugController'
            })
            .when('/summa', { // routing to another jade template for ng-view partial render
                templateUrl: 'template/summa',
                controller: 'AppController'
            })
            .when('/test', {
                templateUrl: 'template/test/test.index',
                controller: 'TestController'
            })
            .when('/report', {
                templateUrl: 'template/test/report.index',
                controller: 'TestController'
            })
            .when('/ward', {
                templateUrl: 'template/ward/ward.index',
                controller: 'WardController'
            })
            .otherwise({ // otherwise redirection
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
]);