
(function() {
    app.factory('ubercheap',function ($http) {

        return {

            postLocations:function (fromAddress,toAddress,phoneNumber){

                return $http(
                    {
                        method:'POST',
                        url:'http://localhost:1337/ride/request',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: jQuery.param({fromAddress:fromAddress,
                            toAddress:toAddress,
                            phoneNumber:phoneNumber})
                    }
                );
            }
        };
    });



}());