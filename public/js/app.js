// public/js/app.js

'use strict';

angular.module('inwardApp', [
    'mwl.calendar',
    'angular-svg-round-progressbar',
    'chart.js',
    'htmlToPdfSave',
    'vAccordion',
    'ui.bootstrap.datetimepicker',
    'angularSlideables',
    'angular-loading-bar',
    'ngAnimate',
    'ngRoute',
    'appRoutes',
    'app.controller',
    'patient.controller',
    'patient.archive.controller',
    'patient.service',
    'doctor.controller',
    'doctor.service',
    'drug.controller',
    'drug.service',
    'test.controller',
    'test.service',
    'ward.controller',
    'ward.service',
    'startFrom.filter'
]).run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.loggedinUser = '';
    $rootScope.goBack = function() {
        window.history.back();
    };
    $rootScope.refresh = function() {
        $route.reload();
    };
}]);