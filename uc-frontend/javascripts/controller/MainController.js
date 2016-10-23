/**
 * @author Ramakrishnan Sathyavageeswaran
 */
(function () {
    app.controller('MainController', function ($scope, $location,$log,ubercheap) {


        $scope.getCheapPrice = function () {

            ubercheap.postLocations($scope.fromAddress.geometry.location.lat(),
                $scope.fromAddress.geometry.location.lng(),$scope.toAddress.geometry.location.lat(),
                $scope.toAddress.geometry.location.lng(),$scope.phone,$scope.toAddress.formatted_address)
                .success(function (response) {
                    $scope.response = response;
                    $log.info($scope.response);

                })
                .error(function (data,status,headers,config) {
                    $log.warn(data,status,headers,config);
                });
            $log.info("Phone no " + $scope.phone );
            $log.info($scope.toAddress.formatted_address);
            $log.info("From Address lat "+$scope.fromAddress.geometry.location.lat());
            $log.info("From Address lng "+$scope.fromAddress.geometry.location.lng());
            $log.info("to Address lat "+$scope.toAddress.geometry.location.lat());
            $log.info("to Address lng "+$scope.toAddress.geometry.location.lng());

        };

    });
}());