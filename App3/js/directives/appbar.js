/*
 * Angular module for app bar
 *
 */
(function () {
    var app = angular.module("appBarDirective", ['winjs']);

    app.directive("appBar", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/appbar/appbar.html',
            controller: function () {
                
            },
            controllerAs: 'appBarCtrl'
        };
    });
           
})();