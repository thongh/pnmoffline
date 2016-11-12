(function ($) {
    function Ajax($rootScope, $dfd) {
        var ajax = jQuery.ajax;

        return function (options) {
            var promise = ajax(options),
                dfd = $dfd();

            promise.done(function (data) {
                $rootScope.$apply(function () {
                    dfd.resolve(data);
                });
            }).fail(function () {
                var failArgs = arguments;

                $rootScope.$apply(function () {
                    dfd.reject.apply(dfd, failArgs);
                });
            });

            return dfd.promise();
        };
    }

    Ajax.$inject = ['$rootScope', '$dfd'];

    angular.module("Ajax")
      .provider("$ajax", function () {
          this.defaults = {};

          this.setOptions = function () {
              $.ajaxSetup(this.defaults = options);
          };

          this.getOptions = function () {
              return this.defaults;
          };

          this.$get = Ajax;
      });
}(jQuery));

(function ($) {
    function Dfd() {
        return function () {
            return jQuery.Deferred();
        };
    }

    angular.module("Ajax")
      .factory("$dfd", Dfd);
}(jQuery));