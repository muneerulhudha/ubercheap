var async = require('async');
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('UberCheap', '45f03695-a77a-469a-b5ab-35b424b874ef');
const productId = '26546650-e557-4a7b-86e7-6a3942445247';

//Ram's access Token
var accessToken1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiaGlzdG9yeSIsImhpc3RvcnlfbGl0ZSIsInBsYWNlcyIsInByb2ZpbGUiLCJyaWRlX3dpZGdldHMiXSwic3ViIjoiZDIzOGQ5NWYtZTBjNi00MjJhLThlZWMtNDg3MmUyNDliNjcyIiwiaXNzIjoidWJlci11czEiLCJqdGkiOiI4ZDExY2MxYi00MTkwLTQ2NjQtOTE1OC1mNTI2OTYxZGM4YzEiLCJleHAiOjE0Nzk3OTE3MDcsImlhdCI6MTQ3NzE5OTcwNiwidWFjdCI6ImN5NkFGdmsxMk92QjhYd0pGNHQxN3dvUVlESUJ3UCIsIm5iZiI6MTQ3NzE5OTYxNiwiYXVkIjoicGlsWElaa3dQMXpXSmhhYTBoc2N2V0ZSdEI5MXVrVE4ifQ.dNbT3IropqtEhYIiFUj-yl07URrYweqH0CfwFJ0DlICa6OeGAXhwtRY3ifjdmfeHDemlYkbcATlSB_ofub1JKPMT4X2_ay9FBWlxsQsdq_RxhHjeDtIfC6Y0HPk5jjyrsDYZYT5LYxV4_k8aox-CafaT0t5SXVt0q-dMaS8RIS0uzQ7CvRaeeTav1o4d7kj6gMdN9v7UWvtQez4hftPsZM61Hne6KNeKcE__ofknwCMrYhBvshOVlIybaAEtBxh5LDmuu_Ia6OmJ3zVf6D9G5nJf0BCwpxOMo0RuOjsj8TZF-argDYInEpaWxSaS6LRQ-jWgAXJ1X3-zHRHPOFLtpw';
//TestAppHackTX16 access token
var accessToken2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiaGlzdG9yeSIsImhpc3RvcnlfbGl0ZSIsInBsYWNlcyIsInByb2ZpbGUiLCJyaWRlX3dpZGdldHMiXSwic3ViIjoiYjk4ZWQ4ODMtMDVhNS00MzE3LWI1OTUtYjk3MTVlZDNiNzc2IiwiaXNzIjoidWJlci11czEiLCJqdGkiOiJkNzkxZjI4My02MTFmLTQwYzktYTcyNC1lZjU2ODc3MzIyMTYiLCJleHAiOjE0Nzk3ODY3NTMsImlhdCI6MTQ3NzE5NDc1MywidWFjdCI6IlZUNEJjdk1jVU9JcjVEbkNPdGEwemNpWElham1ldSIsIm5iZiI6MTQ3NzE5NDY2MywiYXVkIjoiVXJUQ0tRbjNCMjFXQkxfUkthS3pBeFZMdEVzZVBvSXMifQ.oFgJRobu4mKfEePyCYluZ_jwmo6dsfcdSDEavQ89Ue8flcgEBEonTRqNNkmuYe3Sux31Y6DMSfJV2TNOHUxD3TUPK93ZfprbkGy6MLwRlujfV_tQEJxd6EsHX8VXDsL0RwfBYv-ODj2lrjIbbF4CwdqIDCpTBgxL-hOrrnz6sTgt_DWfBIUdQ2S7m96stvkZ2P96v1iVDVxdEm35th-MIRP7vWncHixd-0eBMN4gH4xMzh7fosHe7tzXR80Ex4GNPBOuy_GN3vISUYU9OcDkaf5Ybu7HJnY1d6hhNNqfaS-vn5Sjeu_H--QjyXpLhAn3XcvsztqRdE6MZy2ca80Uyw';

/**
 * RideController
 *
 * @description :: Server-side logic for managing rides
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	request: function(req, res){
		var query = req.body;

		console.log();

		getLatLong(query.fromAddress, query.toAddress, function (err, output) {

			 console.log(output);

			var latLongList = fetchLatLong(output.startLat, output.startLong);

				requestUber(latLongList, output.startLat, output.startLong, output.endLat, output.endLong, function (err, data) {
					console.log(data);

					sendSMS(query.phoneNumber, query.toAddress, data.latitude, data.longitude, query.endLat, query.endLong, function (err, result) {

						return res.send(data, 200);
					});

				});
		//	});
		});

	}

};

function getLatLong(fromAddress, toAddress, callback) {

	var data = {};

	rapid.call('GoogleGeocodingAPI', 'addressToCoordinates', { 
	    'address': fromAddress,
	    'apiKey': 'AIzaSyCY1CEOnov618n8fmOzP0V0FsmXnMecPrM'

	}).on('success', (payload)=>{
	     
		var res1 = JSON.parse(payload);

		data.startLat = res1.lat;
		data.startLong = res1.lng;

	    rapid.call('GoogleGeocodingAPI', 'addressToCoordinates', { 
		    'address': toAddress,
		    'apiKey': 'AIzaSyCY1CEOnov618n8fmOzP0V0FsmXnMecPrM'

		}).on('success', (payload1)=>{
		     
		    var res2 = JSON.parse(payload1);
			data.endLat = res2.lat;
			data.endLong = res2.lng;

			callback(null, data);

		}).on('error', (payload1)=>{
		     /*YOUR CODE GOES HERE*/ 
		});

	}).on('error', (payload)=>{
	     /*YOUR CODE GOES HERE*/ 
	});

};

function fetchLatLong(latitude, longitude) {

	var startLat = parseFloat(latitude) + 0.0005;
	var startLong = parseFloat(longitude) - 0.0005;

	var list = [], count =0;

	for(var i=0; i<2; i++){
		for(var j=0; j<2;j++){
			var element = [];
			element[0] = startLat + 0.0001;
			startLat = element[0];
			element[1] = startLong + 0.0001;
			startLong = element[1];
			list[count++] = element;
		}
	}

	return list;
};


function requestUber(latLongList, startLat, startLong, endLat, endLong, callback){

	var count = 0;
	var min = 1000.00;
	var finalLat, finalLong;

	async.each(latLongList,
	
	  function(element, cb){
	
		var start = element[0];
		var end = element[1];

		rapid.call('Uber', 'getRideEstimate', { 
			'productId': productId,
			'startLatitude': start,
			'startLongitude': end,
			'startPlaceId': '',
			'endLatitude': endLat,
			'endLongitude': endLong,
			'endPlaceId': '',
			'seatCount': '',
			'sandbox': 'false',
			'accessToken': accessToken1
		 
		}).on('success', (payload)=>{
			var output = JSON.parse(payload);
			 console.log(output.price.display);
			 var currency = output.price.display;
			 var number = Number(currency.replace(/[^0-9\.]+/g,""));
			 if(number < min){
			 	min = number;
			 	finalLat = start;
			 	finalLong = end;
			 }
			 //callback(null, output.price.display);
			 cb();
		}).on('error', (payload)=>{
			console.log("error");
			console.log(payload);
			cb();
		});

	  },
	  
	  function(err){
	    // All tasks are done now
	    var data = {};
	    data.fare = min;
	    data.latitude = finalLat;
	    data.longitude = finalLong;

	    callback(null, data);
	  }
	);

};

function sendSMS(phoneNumber, toAddress, startLat, startLong, endLat, endLong, callback) {

	var dropOff = encodeURI(toAddress);

	var message = 'uber://?product_id=26546650-e557-4a7b-86e7-6a3942445247&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&pickup[nickname]=UberHQ&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=37.8698674&dropoff[longitude]=-122.2675641&dropoff[nickname]=2177%20Shattuck%20Ave&dropoff[formatted_address]=2177%20Shattuck%20Ave,%20Berkeley,%20CA%2094704,%20USA&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383';

	rapid.call('Twilio', 'sendSms', { 
		'accountSid': 'AC0db15c197fa4bda3d1eecdea04c65b1a',
		'accountToken': '9a6f5ac188b4c03cf4df558a52f6bc8a',
		'from': '+14697891582',
		'to': phoneNumber,
		'applicationSid': '',
		'statusCallback': '',
		'messagingServiceSid': 'MG41b2ed7bc1b7ef74b083acb5d00545a5',
		'body': message,
		'maxPrice': '',
		'provideFeedback': ''
	 
	}).on('success', (payload)=>{
		 callback(null, "SMS sent"); 
	}).on('error', (payload)=>{
		 callback(null, "SMS failed");
	});

}