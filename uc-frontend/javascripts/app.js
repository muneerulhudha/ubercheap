/**
 * Angular App Module
 *
 * @author Ramakrishnan Sathyavgeeswaran.
 */

var app = angular.module("ubercheap", ["ngRoute","ui.router","uiRouterStyles","google.places","ng-sweet-alert"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'partials/home.html',
            controller: "MainController",
            data: {
                css: ['stylesheet/main.css','stylesheet/vendor/autocomplete.css','stylesheet/vendor/sweetalert.css'
                ]
            }
        });




});