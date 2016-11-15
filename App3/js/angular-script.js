// Code goes here
(function () {
    // Declare the angular app
    var app = angular.module("brazos", ['winjs', 'indexedDB', 'angularSoap', 'webserviceHelper'])
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

    app.controller("IndexedDBController",
        ['$scope', '$http', '$indexedDB', 'soapService',
            function ($scope, $http, $indexedDB, soapService) {

        var _this = this;
        _this.tasks = [];
        $indexedDB.openStore('tasks', function (store) {

            //store.insert({"id": "444-444-222-111","permitnumber": "1000", "title": "test permit"})
            //    .then(function (e) {
            //        console.log("insert to indexed db successfully");
            //    });

            store.getAll().then(function(tasks) {  
                // Update scope
                $scope.objects = tasks;
                console.log("thong debug");
                console.log($scope.objects);
            });
           
            // Using winjs.xhr
            //webservice.convertCurrency();
            soapService.getFieldCheckPermitsByUser2();

            
        });
    }]);

    app.controller("WebserviceController", ['$http', function ($scope, $http) {
        $scope.tasks = [];
        var webserviceUrl = "http://msedgewin10:8088/mocksoap12PNMUntetheredServicesSoapSoapBinding?WSDL&interface=soap12PNMUntetheredServicesSoapSoapBinding&part=PNMUntetheredServices.wsdl";
        $http.get(webserviceUrl).success(function(data) {
            console.log("successfully receive data from webservice");
            console.log(data);
        });
        
    }]);

    app.controller("PanelController", function () {
        // Controller to handle tabs UI logic
        // First, create a property 'tab' and initialize it to 1
        this.tab = 1;
        // Implement ng-click="tab = 1"
        this.selectTab = function (settab) {
            this.tab = settab;
        };
        this.isSelected = function (checktab) {
            return this.tab === checktab;
        }
    });

    app.controller("ReviewController", function () {
        this.review = {};
        this.addReview = function (product) {
            product.reviews.push(this.review);
            this.review = {};
        }
    });

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
    app.directive("listView", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/winlistview/winlistview.html',
            controller: function () {
                
                this.dataArray = [];
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
                ];
                

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
            },
            controllerAs: 'listviewCtrl'
        };
    });
})();


