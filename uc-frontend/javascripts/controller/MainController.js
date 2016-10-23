/**
 * @author Ramakrishnan Sathyavageeswaran
 */
(function () {
    app.controller('MainController', function ($scope, $location,$log) {


        $scope.getCheapPrice = function () {
            $log.info("Phone no " + $scope.phone );
            $log.info("From Address lat "+$scope.fromAddress.geometry.location.lat());
            $log.info("From Address lng "+$scope.fromAddress.geometry.location.lng());
            $log.info("to Address lat "+$scope.toAddress.geometry.location.lat());
            $log.info("to Address lng "+$scope.toAddress.geometry.location.lng());
        };

    });
}());