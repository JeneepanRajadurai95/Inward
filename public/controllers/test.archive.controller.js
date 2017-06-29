// public/controllers/patient.archive.controller.js

'use strict';

angular.module('test.archive.controller', []).controller('TestArchiveController', [
    '$scope',
    '$routeParams',
    'TestService',
    function($scope, $routeParams, TestService) {
        $scope.dtest = {};
        $scope.loading = true;
        $scope.archivePDF = false;

        function initializePatientArchive() {
            TestService.getTest($routeParams.bht).then((testArchive) => {
                $scope.dtest = testArchive;
            }, (err) => {
                console.log(err);
            }).finally(() => {
                $scope.loading = false;
            });
        }

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
        $scope.colors = ['#F44336', '#2196F3', '#673AB7'];
        $scope.options = {
            responsive: true,
            cutoutPercentage: 75,
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            },
        };

        $scope.current = 75;

        initializePatientArchive();
    }
]);