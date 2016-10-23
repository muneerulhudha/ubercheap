
(function() {
    app.factory('ubercheap',function ($http,$log) {

        return {

            postLocations:function (fromAddressLat,fromAddressLong,toAddressLat,toAddressLong,phoneNumber,toAddress){
                $log.info(fromAddressLat);
                $log.info(fromAddressLong);
                $log.info(toAddressLat);
                $log.info(toAddressLong);
                $log.info(phoneNumber);
                return $http(
                    {
                        method:'POST',
                        url:'http://localhost:1337/ride/request',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: jQuery.param({startLat:fromAddressLat,
                            startLong:fromAddressLong,
                            endLat:toAddressLat,
                            endLong:toAddressLong,phoneNumber:phoneNumber,endAdd:toAddress})
                    }
                );
            }
        };
    });



}());