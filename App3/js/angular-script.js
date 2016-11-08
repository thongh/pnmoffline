// Code goes here
(function () {
    var app = angular.module("brazos", ['winjs']);

    app.controller("StoreController", function () {
        this.products = gems;
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

    app.directive("brazosBody", function () {
        return {
            restrict: 'E',
            templateUrl: 'lib/brazosjs-5.0/controls/brazosTemplate/brazosBody.html'
        }
    });

    app.directive("brazosFooter", function () {
        return {
            restrict: 'E',
            templateUrl: 'lib/brazosjs-5.0/controls/brazosTemplate/brazosFooter.html'
        }
    });

})();


