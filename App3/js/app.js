// Code goes here
(function () {
    // Declare the angular app
    var app = angular.module("brazos", ['winjs', 'indexedDB', 'angularSoap',
        'webserviceHelper', 'idbServiceHelper', 'offlineServiceHelper', 'ngRoute', 'appBarDirective', 'taskDetailsDirective'])
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
                // main route controller: get and provide data for tasklist
                //
                .when('/',
                {
                    templateUrl: 'templates/pages/tasklist/index.html',
                    controller: 'listViewController',
                    controllerAs: 'listViewCtrl'


                })
                // task details page
                .when('/:id',
                {
                    templateUrl: 'templates/pages/taskdetails/index.html',
                    controller: 'taskDetailsController',
                    controllerAs: 'taskDetailsCtrl'
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
    app.controller("listViewController", ['$scope', 'idbService', 'offlineService', 'soapService', '$q',
      function ($scope, idbService, offlineService, soapService, $q) {
          $scope.msg = "Loading...";
          $scope.instances = [];
          // Define the data for list view
          $scope.listViewBinding = new WinJS.Binding.List([]);
          
          // The promises
          var getFieldCheckPermitsByUserPromise = soapService.getFieldCheckPermitsByUserUsingAngular();
          var getBulkInstanceDetailsPromise = soapService.getBulkInstanceDetails;
          var returnDataToController =  function (bulkInstanceDetailsReponse) {
              return $q(function (resolve, reject) {
                  var dataArray = [];
                  var processDetails = bulkInstanceDetailsReponse.response.data.processDetails;
                  for (var i = 0; i < processDetails.length; i++) {
                      dataArray[dataArray.length] = {
                          title: processDetails[i].name,
                          text: processDetails[i].tasks[processDetails[i].tasks.length - 1].displayName,
                          id: processDetails[i].piid
                      };
                  }
                  var itemList = new WinJS.Binding.List(dataArray);

                  // Return data to controller
                  $scope.instances = dataArray;
                  $scope.listViewBinding = itemList;
                  $scope.msg = "";

                  // Define WINJS list view 
                  WinJS.Namespace.define("ProcessInstances", {
                      data: $scope.listViewBinding,
                      clickHandler: WinJS.UI.eventHandler(function (ev) {
                          console.log("item is clicked");
                      })
                  });
                  // Render this UI
                  WinJS.UI.processAll();
              });
          };

          // Chain the promises 
          getFieldCheckPermitsByUserPromise.then(getBulkInstanceDetailsPromise,
              function (reason) {
                  Windows.UI.Popups.MessageDialog(reason).showAsync();
              }).then(returnDataToController,
              function (reason) {
                  Windows.UI.Popups.MessageDialog(reason).showAsync();
              });
    }]);

    // TaskDetailsController
    app.controller("taskDetailsController", function ($scope, $routeParams) {
        // To do: add code to provide data for task details
        console.log("$routeParams.id = " + $routeParams.id);
    });
 

})();


