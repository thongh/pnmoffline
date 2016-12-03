/*
 * Angular module for display task list
 *
 */
(function () {
    var app = angular.module("listViewDirective", ['webserviceHelper', 'idbServiceHelper', 'offlineServiceHelper']);

    app.directive("listView", ['idbService', 'offlineService', 'soapService', '$q',
       function (idbService, offlineService, soapService, $q) {
           return {
               restrict: 'E',
               templateUrl: 'components/winlistview/winlistview.html',
               controller: function () {

                   
                   // Define the data for list view
                   /*
                   var dataArray = [];
                   dataArray = [
                       { title: "Basic banana", text: "Low-fat frozen yogurt", picture: "images/60banana.png" },
                       { title: "Banana blast", text: "Ice cream", picture: "images/60banana.png" },
                       { title: "Brilliant banana", text: "Frozen custard", picture: "images/60banana.png" },
                       { title: "Orange surprise", text: "Sherbet", picture: "images/60orange.png" },
                       { title: "Original orange", text: "Sherbet", picture: "images/60orange.png" },
                       { title: "Vanilla", text: "Ice cream", picture: "images/60vanilla.png" },
                       { title: "Very vanilla", text: "Frozen custard", picture: "images/60vanilla.png" },
                       { title: "Marvelous mint", text: "Gelato", picture: "images/60mint.png" },
                       { title: "Succulent strawberry", text: "Sorbet", picture: "images/60strawberry.png" }
                   ];*/

                   WinJS.Namespace.define("DataExample", {
                       data: listViewBinding,
                       clickHandler: WinJS.UI.eventHandler(function (ev) {
                           console.log("item is clicked");
                       })
                   });
                   // Render this UI
                   WinJS.UI.processAll();

                   
                   

                   //offlineService.persistData();
                   //soapService.getFieldCheckPermitsByUser();
                   /*
                   var getFieldCheckPermitsByUserPromise = soapService.getFieldCheckPermitsByUserUsingAngular();
                   var getBulkInstanceDetailsPromise = soapService.getBulkInstanceDetails;
                   var renderList = function (bulkInstanceDetailsReponse) {
                       var processDetails = bulkInstanceDetailsReponse.response.data.processDetails;
                       for (var i = 0; i < processDetails.length; i++) {
                           dataArray[dataArray.length] = {
                               title: processDetails[i].name,
                               text: processDetails[i].tasks[processDetails[i].tasks.length - 1].displayName
                           };
                       }
                       var itemList = new WinJS.Binding.List(dataArray);
                       // Create a namespace to make the data publicly
                       // accessible. 
  
                       WinJS.Namespace.define("DataExample", {
                           data: itemList,
                           clickHandler: WinJS.UI.eventHandler(function (ev) {
                               console.log("item is clicked");
                           })
                       });
                       // Render this UI
                       WinJS.UI.processAll();
                   };

                   // Chain the promises 
                   getFieldCheckPermitsByUserPromise.then(getBulkInstanceDetailsPromise,
                       function (reason) {
                           Windows.UI.Popups.MessageDialog(reason).showAsync();
                       }).then(renderList,
                       function (reason) {
                           Windows.UI.Popups.MessageDialog(reason).showAsync();
                       });
                   */

               },
               controllerAs: 'listviewDirectiveCtrl'
           };
       }]);
})();