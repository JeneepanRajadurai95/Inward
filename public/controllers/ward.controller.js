// public/controllers/ward.controller.js

'use strict';

angular.module('ward.controller', []).controller('WardController', [
    '$scope',
    'WardService',
    'moment',
    function($scope, WardService) {

        $scope.cward = {};
        $scope.cbed = {};
        $scope.cmaintenance = {};
        $scope.wardWithBeds = 'null';

        $scope.partialForm = 'null';

        $scope.addWard = function(cward) {
            WardService.addWard(cward).then((ward) => {
                $scope.wards.push(ward);
            }, (err) => {
                console.log(err);
            });
        };

        $scope.getWards = function() {
            WardService.getWards().then((wards) => {
                $scope.wards = wards;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.addWardBed = function(wardNumber) {
            WardService.addWardBed(wardNumber).then(() => {
                // TO-DO
                // $scope.Beds = beds;
            }, (err) => {
                console.log(err);
            });
        };

        $scope.getWardBeds = function(wardNumber) {
            WardService.getWardBeds(wardNumber).then((results) => {
                $scope.wardWithBeds = results;
            }, (err) => {
                console.log(err);
            });
        };



        $scope.calendarView = 'month';
        $scope.events = [{
            title: 'Poda', // The title of the event
            startsAt: new Date(2013, 5, 1, 1), // A javascript date object for when the event starts
            endsAt: new Date(2014, 8, 26, 15), // Optional - a javascript date object for when the event ends
            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                primary: '#e3bc08', // the primary event color (should be darker than secondary)
                secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
            },
            actions: [{ // an array of actions that will be displayed next to the event title
                label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
                cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                    console.log('Edit event', args.calendarEvent);
                }
            }],
            draggable: true, //Allow an event to be dragged and dropped
            resizable: true, //Allow an event to be resizable
            incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
            recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
            cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
            allDay: false // set to true to display the event as an all day event on the day view
        }];

        $scope.viewDate = moment().startOf('month').toDate();



        $scope.assignMaintenance = function() {
            WardService.assignMaintenance($scope.cmaintenance).then((result) => {
                console.log('success');
            }, (err) => {
                console.log(err);
            });
        };





        $scope.getWards();
    }
]);