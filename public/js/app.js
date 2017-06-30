// public/js/app.js

'use strict';

angular.module('inwardApp', [
    'angular-growl',
    'ui.select',
    'ngSanitize',
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
    'test.archive.controller',
    'test.service',
    'ward.controller',
    'ward.service',
    'startFrom.filter'
]).run(['$rootScope', '$route', 'growl', function($rootScope, $route, growl) {
    $rootScope.loggedinUser = '';
    $rootScope.goBack = function() {
        window.history.back();
    };
    $rootScope.refresh = function() {
        $route.reload();
    };

    $rootScope.growl = function(type, message) {
        var config = {};
        switch (type) {
            case "success":
                growl.success(message, config);
                break;
            case "info":
                growl.info(message, config);
                break;
            case "warning":
                growl.warning(message, config);
                break;
            default:
                growl.error(message, config);
        }
    };

    $rootScope.futureDateBeforeRender = function($dates) {
        const todaySinceMidnight = new Date();
        todaySinceMidnight.setUTCHours(0, 0, 0, 0);
        $dates.filter(function(date) {
            return date.utcDateValue > todaySinceMidnight.getTime();
        }).forEach(function(date) {
            date.selectable = false;
        });
    };

    $rootScope.pastDateBeforeRender = function($dates) {
        const todaySinceMidnight = new Date();
        todaySinceMidnight.setUTCHours(0, 0, 0, 0);
        $dates.filter(function(date) {
            return date.utcDateValue < todaySinceMidnight.getTime();
        }).forEach(function(date) {
            date.selectable = false;
        });
    };

}]).config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
}]);