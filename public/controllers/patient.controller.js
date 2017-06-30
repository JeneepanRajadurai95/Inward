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

            $('button[name="addTransferForm"]').on('click', function() {
                $('div[name="addDischargeForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addAllergyForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addPatientForm"]').removeClass('margin-top--10px margin-bottom--30px card');

                $('div[name="addTransferForm"]').addClass('margin-top--10px margin-bottom--30px card');
            });

            $('span[name="closeTransferForm"]').on('click', function() {
                $('div[name="addTransferForm"]').removeClass('margin-top--10px margin-bottom--30px card');
            });

            $('button[name="addDischargeForm"]').on('click', function() {
                $('div[name="addTransferForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addAllergyForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addPatientForm"]').removeClass('margin-top--10px margin-bottom--30px card');

                $('div[name="addDischargeForm"]').addClass('margin-top--10px margin-bottom--30px card');
            });

            $('span[name="closeDischargeForm"]').on('click', function() {
                $('div[name="addDischargeForm"]').removeClass('margin-top--10px margin-bottom--30px card');
            });

            $('button[name="addAllergyForm"]').on('click', function() {
                $('div[name="addTransferForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addDischargeForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addPatientForm"]').removeClass('margin-top--10px margin-bottom--30px card');

                $('div[name="addAllergyForm"]').addClass('margin-top--10px margin-bottom--30px card');
            });

            $('span[name="closeAllergyForm"]').on('click', function() {
                $('div[name="addAllergyForm"]').removeClass('margin-top--10px margin-bottom--30px card');
            });

            $('button[name="addPatientForm"]').on('click', function() {
                $('div[name="addTransferForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addDischargeForm"]').removeClass('margin-top--10px margin-bottom--30px card');
                $('div[name="addAllergyForm"]').removeClass('margin-top--10px margin-bottom--30px card');

                $('div[name="addPatientForm"]').addClass('margin-top--10px margin-bottom--30px card');
            });

            $('span[name="closePatientForm"]').on('click', function() {
                let instance = $(this);
                $('div[name="addPatientForm"]').removeClass('margin-top--10px margin-bottom--30px card');

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

        /**
         * 
         * Create Patient : cpatient
         * Detail Patient : dpatient
         * Discharge Patient : dcpatient
         * Read Patient : rpatient
         * Transfer Patient : tpatient
         * 
         */

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
        $scope.dcpatient = {};
        $scope.allergy = {};
        $scope.titles = ["Master", "Mr.", "Miss.", "Mrs."];

        $scope.diseaseList = ["Dengue", "Maleriya", "Fever", "HIV", "AIDS", "Cancer"]

        $scope.availableBeds = {};
        $scope.availableWards = {};
        $scope.availableBedsDisabled = true;
        $scope.selected = { transfer: '', discharge: '', allergy: '' };

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
                $rootScope.growl("success", 'Patient ' + newPatient.ID + ' Added Successfully');
            }, (err) => {
                console.log(err);
                $rootScope.growl("error", 'Something went wrong');
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

        $scope.numberOfPages = function() {
            return Math.ceil($scope.rpatients.length / $scope.pageSize);
        };

        $scope.pagination = function(size) {
            $scope.pageSize = parseInt(size);
        };

        $scope.clearAll = function() {
            $scope.cpatient = {};
            $scope.tpatient = {};
            $scope.selected = { transfer: '', discharge: '', allergy: '' };
        };

        $scope.iTransferPatient = function() {
            $scope.tpatient.patientID = $scope.selected.transfer.ID;
            PatientService.iTransferPatient($scope.tpatient).then(results => {
                $rootScope.growl("success", 'Patient ' + $scope.tpatient.patientID + ' Transfered Successfully');
                $scope.clearAll();
            }, err => {
                console.log(err);
                $rootScope.growl("error", 'Something went wrong');
            });
        };

        $scope.eTransferPatient = function() {
            $scope.tpatient.patientID = $scope.selected.transfer.ID;
            PatientService.eTransferPatient($scope.tpatient).then(results => {
                $rootScope.growl("success", 'Patient ' + $scope.tpatient.patientID + ' Transfered Successfully');
                $scope.clearAll();
            }, err => {
                console.log(err);
                $rootScope.growl("error", 'Something went wrong');
            });
        };

        $scope.dischargePatient = function() {
            $scope.dcpatient.patientID = $scope.selected.discharge.ID;
            PatientService.dischargePatient($scope.dcpatient).then(results => {
                $rootScope.growl("success", 'Requested for Patient ' + $scope.dcpatient.patientID + ' Discharge');
                $scope.clearAll();
            }, (err) => {
                console.log(err);
                $rootScope.growl("error", 'Something went wrong');
            });
        };

        $scope.addAllergy = function() {
            $scope.allergy.patientID = $scope.selected.allergy.ID;
            PatientService.addAllergy($scope.allergy).then(results => {
                $rootScope.growl("success", 'Allergy added to Patient ' + '');
            }, err => {
                console.error(err);
                $rootScope.growl("error", 'Something went wrong');
            });
        };

        //Tab Functions
        $scope.tab = 1;
        $scope.tabSet = function(newTab) { $scope.tab = newTab; };
        $scope.tabIsSet = function(tabNumber) { return ($scope.tab === tabNumber); };

        initializeDocument();
    }
]);