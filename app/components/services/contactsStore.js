/**
 * Created by sukumar on 11/30/2016.
 */
angular.module("storageModule", ['firebase'])
    .factory("localStorageService", function ($q) {
        var STORAGE_ID = "contactList_angularjs";
        var store = {
            contacts: [],
            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID));
            },
            _setInLocalStorage: function (data) {
                localStorage.setItem(STORAGE_ID, data);
            },
            addItem: function (data) {
                var deferred = $q.defer();
                store.contacts.push(data);
                store._setInLocalStorage(store.contacts);
                deferred.resolve(store.contacts);
                return deferred.promise;
            },
            getItem: function () {
                var deferred = $q.defer();
                store.contacts = store._getFromLocalStorage() | [];
                deferred.resolve(store.contacts);
                return deferred.promise;
            }
        }
        return store;
    }).factory("firebaseStorageService", ['$firebaseArray',
    function ($firebaseArray) {
        var database = firebase.database();
        console.log((database));
        var store = {
            _data: $firebaseArray,
            _addCompleteDataFirebaseDB: function (data) {
                firebase.database().ref('/contacts').set(
                    data
                );

            },
            _testFirebaseReference: function () {
                console.log($firebaseArray);
            }
        }
        return store;
    }]);