// public/js/filters/startFrom.filter.js

'use strict';

angular.module('startFrom.filter', []).filter('StartFromFilter', [function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
}]);