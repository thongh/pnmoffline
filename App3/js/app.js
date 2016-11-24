// Code goes here
(function () {
    // Declare the angular app
    var app = angular.module("brazos", ['winjs', 'indexedDB', 'angularSoap',
        'webserviceHelper', 'idbServiceHelper', 'offlineServiceHelper', 'ngRoute', 'appBarDirective', 'listViewDirective', 'taskDetailsDirective'])
        .config(function ($indexedDBProvider, $routeProvider) {

            // Initialze indexeddb for this app
            $indexedDBProvider
                .connection('TasksDB')
                .upgradeDatabase(1, function (event, db, tx) {
                    var objStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
                    objStore.createIndex('permitnumber_idx', 'permitnumber', { unique: true });
                    objStore.createIndex('title_idx', 'title', { unique: false });
                });

            // Initialize the routes
            $routeProvider
                // main route: display the tasklist
                //
                .when('/',
                {
                    controller: 'RootController',
                    templateUrl: 'templates/pages/tasklist/index.html'

                })
                // task details page
                .when('/taskDetails',
                {
                    controller: 'TaskDetailsController',
                    templateUrl: 'templates/pages/taskdetails/index.html'

                })
                // settings page
                /*
                .when('/settings',
                {
                    controller: 'SettingsController',
                    templateUrl: 'views/SettingsControllerView.html'

                })*/
                // if non of the above routes
                // are matched we are setting router
                // to redirect to the RootController
                .otherwise({ redirectTo: '/' });
                // END ROUTES
        });

    /* ********* CONTROLLERS ********* */
    // RootController
    app.controller("RootController", function ($scope) {
        // To do: add code to provide data from root scope       
    });

    // TaskDetailsController
    app.controller("TaskDetailsController", function ($scope) {
        // To do: add code to provide data for task details    
    });
 

})();


