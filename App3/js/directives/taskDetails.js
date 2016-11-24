/*
 * Angular module for display task details
 *
 */
(function () {
    var app = angular.module("taskDetailsDirective", ['webserviceHelper', 'idbServiceHelper', 'offlineServiceHelper']);

    app.directive("taskDetails", ['idbService', 'offlineService', 'soapService', '$q',
       function (idbService, offlineService, soapService, $q) {
           return {
               restrict: 'E',
               templateUrl: 'components/task/task.html',
               controller: function () {

                   // Todo: add code to provide binding data for task
                  
               },
               controllerAs: 'taskCtrl'
           };
       }]);

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

})();