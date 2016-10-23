/**
 * @author Ramakrishnan Sathyavageeswaran
 */
(function () {
    app.controller('MainController', function ($scope, $location,$log,ubercheap,SweetAlert) {


        $scope.getCheapPrice = function () {

            ubercheap.postLocations($scope.fromAddress.formatted_address,
                $scope.toAddress.formatted_address,$scope.phone)
                .success(function (response) {
                    $scope.response = response;
                    $log.info($scope.response);
                    SweetAlert.success("Thanks we have sent your sms with Uber request link !", {title: "Sent SMS!"});
                    $scope.fromAddress = "";
                    $scope.toAddress = "";

                })
                .error(function (data,status,headers,config) {
                    SweetAlert.error("Oops! Something went wrong try again plz!", {title: "Sorry!"});
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