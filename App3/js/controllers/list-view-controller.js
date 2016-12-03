/*
 * Angular module to return instances data
 *
 */
(function () {
    var app = angular.module("brazos", ['webserviceHelper', 'idbServiceHelper', 'offlineServiceHelper']);

    app.controller("listViewController", ['$scope', 'idbService', 'offlineService', 'soapService', '$q',
      function ($scope, idbService, offlineService, soapService, $q) {
          var dataArray = [];
          $scope.msg = "Loading...";
          $scope.instances = [];
          // Define the data for list view
          $scope.listViewBinding = new WinJS.Binding.List(dataArray);

          // The promises
          var getFieldCheckPermitsByUserPromise = soapService.getFieldCheckPermitsByUserUsingAngular();
          var getBulkInstanceDetailsPromise = soapService.getBulkInstanceDetails;
          var returnDataToController = function (bulkInstanceDetailsReponse) {
              return $q(function (resolve, reject) {
                  var processDetails = bulkInstanceDetailsReponse.response.data.processDetails;
                  for (var i = 0; i < processDetails.length; i++) {
                      dataArray[dataArray.length] = {
                          title: processDetails[i].name,
                          text: processDetails[i].tasks[processDetails[i].tasks.length - 1].displayName
                      };
                  }
                  var itemList = new WinJS.Binding.List(dataArray);

                  // Return data to controller
                  $scope.instances = dataArray;
                  $scope.listViewBinding = itemList;
                  $scope.msg = "Done";

                  WinJS.Namespace.define("DataExample", {
                      data: itemList,
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
})();