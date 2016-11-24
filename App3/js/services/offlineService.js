/*
 * Angular module to hold methods to handle app offline mode
 *
 */
(function () {
    var app = angular.module("offlineServiceHelper", ['idbServiceHelper']);


    app.factory("offlineService", ['idbService', function (idbService) {

        return {
            persistData: function () {
                idbService.clearAll();
                idbService.insert();
                idbService.read();
            }
        };

    }]);
})();