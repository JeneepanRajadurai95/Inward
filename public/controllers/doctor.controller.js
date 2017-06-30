// public/controllers/doctor.controller.js

'use strict';
angular.module('doctor.controller', []).controller('DoctorController', [
    '$scope',
    '$rootScope',
    '$http',
    'DoctorService',
    'PatientService',
    'moment',
    function($scope, $rootScope, $http, DoctorService, PatientService, moment) {
        $scope.partialForm = 'null';
        $scope.cdoctor = {};
        $scope.schedule = {};
        $scope.events = {};

        function initializeDoctor() {
            DoctorService.getdoctors().then((doctors) => {
                $scope.rdoctors = doctors;
            }, (err) => {
                console.log(err);
            });

            PatientService.getPatients().then(patients => {
                $scope.rpatient = patients;
            }, err => {
                console.log(err);
            });
        }

        $scope.addDoctor = function(cdoctor) {
            DoctorService.addDoctor(cdoctor).then((newDoctor) => {
                $scope.rdoctors.push(newDoctor);
                $scope.cdoctor = {};
            }, (err) => {
                console.log(err);
            });
        };

        $scope.scheduleAppointment = function() {
            DoctorService.scheduleAppointment($scope.schedule).then(results => {
                console.log("Something Happened");
            }, err => {
                console.error(err);
            });
        };

        // $scope.GetDoctor = function(_id) {
        //     DoctorService.GetDoctor(_id).then((result) => {
        //         $scope.vdoctor = result;
        //     }, err => {
        //         console.log(err);
        //     });
        // };

        $scope.getScheduledEvents = function() {
            DoctorService.getScheduledEvents().then(results => {
                $scope.events = results;
            }, err => {
                console.error(err);
            });
        };

        $scope.calendarView = 'month';
        // $scope.events = [{
        //     title: 'My event title', // The title of the event
        //     startsAt: new Date(2013, 5, 1, 1), // A javascript date object for when the event starts
        //     endsAt: new Date(2014, 8, 26, 15), // Optional - a javascript date object for when the event ends
        //     color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
        //         primary: '#e3bc08', // the primary event color (should be darker than secondary)
        //         secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
        //     },
        //     actions: [{ // an array of actions that will be displayed next to the event title
        //         label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
        //         cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
        //         onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
        //             console.log('Edit event', args.calendarEvent);
        //         }
        //     }],
        //     draggable: true, //Allow an event to be dragged and dropped
        //     resizable: true, //Allow an event to be resizable
        //     incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
        //     recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
        //     cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
        //     allDay: false // set to true to display the event as an all day event on the day view
        // }];

        $scope.viewDate = moment().startOf('month').toDate();

        initializeDoctor();
        $scope.getScheduledEvents();

        // $scope.setSelected = function() {
        //     $scope.selected = this.cdoctor;
        //     console.log($scope.selected);
        //     console.log("sucess");
        // };
    }
]);