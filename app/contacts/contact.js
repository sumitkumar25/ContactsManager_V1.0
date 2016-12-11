'use strict';

angular.module('contact', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function ($routeProvider) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyB1HknDOAZG9yoBG0ZYq0-QmpqVAfEY5CA",
            authDomain: "contactmanager-6deb1.firebaseapp.com",
            databaseURL: "https://contactmanager-6deb1.firebaseio.com",
            storageBucket: "contactmanager-6deb1.appspot.com",
            messagingSenderId: "135599941997"
        };
        firebase.initializeApp(config);
        $routeProvider.when('/contact', {
            templateUrl: 'contacts/contact.html',
            controller: 'contactsCtrl'
        });
    }])

    .controller('contactsCtrl', ['$scope', '$firebaseArray',
        function ($scope, $firebaseArray) {
            var database = firebase.database().ref('/contacts');
            $scope.editformVisible = false;
            $scope.contacts = $firebaseArray(database);
            $scope.addContact = function (contact) {
                console.log("adding contact");
                $scope.contacts.$add({
                    name: $scope.name,
                    number: $scope.number,
                    email: $scope.email
                }).then(function (database) {
                    console.log("added contact");
                    $scope.name = '';
                    $scope.number = '';
                    $scope.email = '';
                })
            };
            $scope.removeContact = function (contact) {
                $scope.contacts.$remove(contact);
            };
            $scope.showEditForm = function (contact) {
                $scope.editformVisible = true;
                $scope.id = contact.$id;
                $scope.name = contact.name;
                $scope.number = contact.number;
                $scope.email = contact.email;
            };
            $scope.editContact = function () {
                var id = $scope.id;
                var record = $scope.contacts.$getRecord(id);
                record.name = $scope.name;
                record.number = $scope.number;
                record.email = $scope.email;
                $scope.contacts.$save(record).then(function (database) {
                    console.log("edited record");
                    $scope.name = '';
                    $scope.number = '';
                    $scope.email = '';
                })
            }
        }]);