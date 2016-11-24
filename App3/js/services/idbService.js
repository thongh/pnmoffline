/*
 * Angular module to hold methods to handle indexed db operations
 *
 */
(function () {
    var app = angular.module("idbServiceHelper", ['indexedDB']);


    app.factory("idbService", ['$indexedDB', function ($indexedDB) {
        var OBJECT_STORE_NAME = 'tasks';

        return {
            checkBrowserCompatibilityForIDB: function () {
                if (!window.indexedDB) {
                    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
                }
            },
            clearAll: function () {
                $indexedDB.openStore(OBJECT_STORE_NAME, function (store) {
                    store.clear().then(function () {
                        console.log("Clear all items in idb");
                    });
                });

            },
            insert: function () {
                $indexedDB.openStore(OBJECT_STORE_NAME, function (store) {
                    store.insert({ "id": "444-444-222-111", "permitnumber": "1000", "title": "test permit" }).then(function (e) {
                        console.log("insert to indexed db successfully");
                    });
                    store.insert({ "id": "444-444-222-112", "permitnumber": "1001", "title": "test permit 2" }).then(function (e) {
                        console.log("insert to indexed db successfully");
                    });
                });
            },
            read: function () {
                $indexedDB.openStore(OBJECT_STORE_NAME, function (store) {

                    store.getAll().then(function (tasks) {
                        // Update scope
                        //$scope.objects = tasks;
                        console.log("thong debug");
                        console.log(tasks);
                    });
                });
            }
        };

    }]);
})();