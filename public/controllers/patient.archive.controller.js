// public/controllers/patient.archive.controller.js

'use strict';

angular.module('patient.archive.controller', []).controller('PatientArchiveController', [
    '$scope',
    '$routeParams',
    'PatientService',
    function($scope, $routeParams, PatientService) {
        $scope.dpatient = {};
        $scope.loading = true;
        $scope.archivePDF = false;

        function initializePatientArchive() {
            PatientService.getPatient($routeParams.bht).then((patientArchive) => {
                $scope.dpatient = patientArchive;
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