// Code goes here
(function () {
    var app = angular.module("brazos", ['winjs']);

    app.controller("TasklistController", function () {
        this.tasks = tasks;
        this.addComment = function (newComment) {

        }
    });

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
            templateUrl: 'components/tasklist/task.html',
            controller: function () {

                this.task = {};

            },
            controllerAs: 'taskCtrl'
        };
    });

})();


