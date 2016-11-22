// Code goes here
(function () {
    // Declare the angular app
    var app = angular.module("brazos", ['winjs', 'indexedDB', 'angularSoap', 'webserviceHelper', 'idbServiceHelper', 'offlineServiceHelper'])
        .config(function ($indexedDBProvider) {
            // Initialze indexeddb for this app
            $indexedDBProvider
                .connection('TasksDB')
                .upgradeDatabase(1, function (event, db, tx) {
                    var objStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
                    objStore.createIndex('permitnumber_idx', 'permitnumber', { unique: true });
                    objStore.createIndex('title_idx', 'title', { unique: false });
                });
        });

    /* ********* CONTROLLERS ********* */
    // Wins list view controller
    app.controller("IndexedDBController", ['$indexedDB', 'idbService', 'offlineService', 'soapService', '$q',
        function ($indexedDB, idbService, offlineService, soapService, $q) {
            var OBJECT_STORE_NAME = 'tasks'; 

            
             
    }]);
 


    /* ********* DIRECTIVES ********* */
    // Brazos template header
    app.directive("brazosHeader", function () {
        return {
            restrict: 'E',
            templateUrl: 'lib/brazosjs-5.0/controls/brazosTemplate/brazosHeader.html'
        }
    });

    // Brazos template body
    app.directive("brazosBody", function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'lib/brazosjs-5.0/controls/brazosTemplate/brazosBody.html'
        }
    });

    // Brazos template footer
    app.directive("brazosFooter", function () {
        return {
            restrict: 'E',
            templateUrl: 'lib/brazosjs-5.0/controls/brazosTemplate/brazosFooter.html'
        }
    });

    // Task list
    app.directive("taskList", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tasklist/tasklist.html',
            controller: function () {

                this.tasks = [
                    { text: 'Learn AngularJS', done: false },
                    { text: 'Build an app', done: false },
                    { text: 'Build an app', done: false },
                    { text: 'Build an app', done: false },
                    { text: 'Build an app', done: false },
                    { text: 'Build an app', done: false }
                ];

                this.getTotalTasks = function () {
                    return this.tasks.length;
                };


                this.addTask = function (addTask) {
                    this.tasks.push({ text: addTask, done: false });
                    this.formTaskText = '';
                };

                this.tasks = _.filter(this.tasks, function (task) {
                        return !task.done;
                });
 
            },
            controllerAs: 'tasklistCtrl'
        }
    });

    // Task
    app.directive("task", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/task/task.html',
            controller: function () {

                this.task = {};

            },
            controllerAs: 'taskCtrl'
        };
    });

    // Wins list view
    app.directive("listView", ['idbService', 'offlineService', 'soapService', '$q', 
        function (idbService, offlineService, soapService, $q) {
        return {
            restrict: 'E',
            templateUrl: 'components/winlistview/winlistview.html',
            controller: function () {
                
                // Define the data for list view
                var dataArray = [];
                /*
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

                //offlineService.persistData();
                var getFieldCheckPermitsByUserPromise = soapService.getFieldCheckPermitsByUser2();
                var getBulkInstanceDetailsPromise = soapService.getBulkInstanceDetails;
                var renderList = function (bulkInstanceDetailsReponse) {
                    var processDetails =  bulkInstanceDetailsReponse.response.data.processDetails;
                    for (var i = 0; i < processDetails.length; i++) {
                        dataArray[dataArray.length] = { title: processDetails[i].name, text: processDetails[i].tasks[processDetails[i].tasks.length-1].displayName };
                    }
                    var itemList = new WinJS.Binding.List(dataArray);
                    // Create a namespace to make the data publicly
                    // accessible. 
                    var publicMembers =
                        {
                            itemList: itemList
                        };
                    WinJS.Namespace.define("DataExample", publicMembers);
                    // Render this UI
                    WinJS.UI.processAll();
                };

                // Chain the promises
                getFieldCheckPermitsByUserPromise.then(getBulkInstanceDetailsPromise,
                    function (reason) {
                        Windows.UI.Popups.MessageDialog(reason).showAsync();
                    }).then(renderList,
                    function(reason) {
                        Windows.UI.Popups.MessageDialog(reason).showAsync();
                    });
               
                
            },
            controllerAs: 'listviewCtrl'
        };
     }]);


})();


