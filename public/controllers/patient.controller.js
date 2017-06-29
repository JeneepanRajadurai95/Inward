// public/controllers/patient.controller.js

'use strict';

angular.module('patient.controller', []).controller('PatientController', [
    '$scope',
    '$rootScope',
    '$http',
    'PatientService',
    'WardService',
    '$window',
    function($scope, $rootScope, $http, PatientService, WardService, $window) {

        $(function() {

            $('button[name="addPatientForm"]').on('click', function() {
                let instance = $(this);
                $('div[name="addPatientForm"]').addClass('margin-top--10px');
                $('div[name="addPatientForm"]').addClass('margin-bottom--30px');
                $('div[name="addPatientForm"]').addClass('card');
            });

            $('span[name="closePatientForm"]').on('click', function() {
                let instance = $(this);
                $('div[name="addPatientForm"]').removeClass('margin-top--10px');
                $('div[name="addPatientForm"]').removeClass('margin-bottom--30px');
                $('div[name="addPatientForm"]').removeClass('card');

                for (var i = step; i > 0; i--) {
                    let instance = $('.step-content .step-content-foot label[name="prev"]');
                    $(stepItem[step]).removeClass('active');
                    if (step == (stepItem.length - 1)) {
                        instance.siblings('button[name="finish"]').addClass('out'); //Submit Button Hide
                        instance.siblings('label[name="next"]').removeClass('out'); //Next Button Display
                        $(stepItem[step - 1]).removeClass('active');
                        // instance.siblings('button[name="finish"]').addClass('out');
                    }
                    $('.step-content-body').addClass('out'); //Hide second Form
                    $('#' + stepItem[step - 1].dataset.id).removeClass('out'); //Display First Form
                    if ((step - 1) == 0) {
                        $('.step-content .step-content-foot label[name="prev"]').addClass('out');
                        $(stepItem[step - 1]).removeClass('active');
                    }
                    if (step <= 0) {
                        return;
                    }
                    step--;
                }
            });

            let step = 0;
            let stepItem = $('.step-progress .step-slider .step-slider-item');

            if (step == 0) {
                $('.step-content .step-content-foot label[name="prev"]').addClass('out');
            }

            // Step Next
            $('.step-content .step-content-foot label[name="next"]').on('click', function() {
                let instance = $(this);
                if (stepItem.length - 1 < step) {
                    return;
                }
                if (step == (stepItem.length - 2)) {
                    instance.addClass('out'); //Last form | no Next Option
                    instance.siblings('button[name="finish"]').removeClass('out'); //Display Submit Button
                }
                $(stepItem[step]).addClass('active');
                $('.step-content-body').addClass('out'); //Hide first Form
                $('#' + stepItem[step + 1].dataset.id).removeClass('out'); //Display second Form
                $('.step-content .step-content-foot label[name="prev"]').removeClass('out'); //Show Previous Button
                $window.scrollTo(0, 0);
                step++;
            });

            // Step Last
            $('.step-content .step-content-foot button[name="finish"]').on('click', function() {
                if (step == stepItem.length) {
                    return;
                }
                $(stepItem[stepItem.length - 1]).addClass('active');
                $('.step-content-body').addClass('out');
                $('#stepLast').removeClass('out');
                $window.scrollTo(0, 0);
            });

            // Step Previous
            $('.step-content .step-content-foot label[name="prev"]').on('click', function() {
                let instance = $(this);
                $(stepItem[step]).removeClass('active');
                if (step == (stepItem.length - 1)) {
                    instance.siblings('button[name="finish"]').addClass('out'); //Submit Button Hide
                    instance.siblings('label[name="next"]').removeClass('out'); //Next Button Display
                    $(stepItem[step - 1]).removeClass('active');
                    // instance.siblings('button[name="finish"]').addClass('out');
                }
                $('.step-content-body').addClass('out'); //Hide second Form
                $('#' + stepItem[step - 1].dataset.id).removeClass('out'); //Display First Form
                if ((step - 1) == 0) {
                    $('.step-content .step-content-foot label[name="prev"]').addClass('out');
                    $(stepItem[step - 1]).removeClass('active');
                }
                if (step <= 0) {
                    return;
                }
                step--;
                $window.scrollTo(0, 0);
            });
        });

        $scope.sortType = 'bht';
        $scope.sortReverse = false;
        $scope.searchPatient = '';

        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.q = '';
        $scope.paginationSize = [1, 5, 10, 15, 20];

        $scope.partialForm = 'null';
        $scope.cpatient = {};
        $scope.dpatient = {};
        $scope.tpatient = {};
        $scope.titles = ["Master", "Mr.", "Miss.", "Mrs."];

        $scope.diseaseList = ["Dengue", "Maleriya", "Fever", "HIV", "AIDS", "Cancer"]

        $scope.availableBeds = {};
        $scope.availableWards = {};
        $scope.availableBedsDisabled = true;

        $scope.tableLoading = true;

        function initializeDocument() {
            PatientService.getPatients().then((patients) => {
                $scope.rpatients = patients;
            }, (err) => {
                console.log(err);
            }).finally(() => {
                $scope.tableLoading = false;
            });

            WardService.getWards().then((wards) => {
                $scope.availableWards = wards;
            }, (err) => {
                console.error(err);
            });
        }

        $scope.getPatient = function(bhtnumber) {
            PatientService.getPatient(bhtnumber).then((patient) => {
                $scope.dpatient = patient;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.addPatient = function(cpatient) {
            PatientService.addPatient(cpatient).then((newPatient) => {
                $scope.rpatients.push(newPatient);
                $scope.cpatient = {};
            }, (err) => {
                console.log(err);
            });
        };

        $scope.getGreenBeds = function(wardNumber) {
            WardService.getGreenBeds(wardNumber).then((greenBeds) => {
                $scope.availableBeds = greenBeds;
                $scope.availableBedsDisabled = false;
            }, (err) => {
                console.error(err);
            });
        };

        $scope.transferPatient = function() {

        };

        $scope.numberOfPages = function() {
            return Math.ceil($scope.rpatients.length / $scope.pageSize);
        };

        $scope.pagination = function(size) {
            $scope.pageSize = parseInt(size);
        };

        $scope.clearAll = function() {
            $scope.cpatient = {};
            $scope.tpatient = {};
        };

        //Tab Functions

        $scope.tab = 1;

        $scope.tabSet = function(newTab) {
            $scope.tab = newTab;
        };

        $scope.tabIsSet = function(tabNumber) {
            return ($scope.tab === tabNumber);
        };

        initializeDocument();
    }
]);