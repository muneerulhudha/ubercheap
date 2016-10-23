const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('UberCheap', '45f03695-a77a-469a-b5ab-35b424b874ef');

/**
 * RideController
 *
 * @description :: Server-side logic for managing rides
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	request: function(req, res){
		console.log(req.body);
		return res.send("test", 200);
	}

};



// rapid.call('Uber', 'getRideEstimate', { 
// 	'productId': '',
// 	'startLatitude': '37.621313',
// 	'startLongitude': '-122.378955',
// 	'startPlaceId': '',
// 	'endLatitude': '37.821357',
// 	'endLongitude': '-122.391503',
// 	'endPlaceId': '',
// 	'seatCount': '',
// 	'sandbox': 'false',
// 	'accessToken': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiaGlzdG9yeSIsImhpc3RvcnlfbGl0ZSIsInBsYWNlcyIsInByb2ZpbGUiLCJyaWRlX3dpZGdldHMiXSwic3ViIjoiYjk4ZWQ4ODMtMDVhNS00MzE3LWI1OTUtYjk3MTVlZDNiNzc2IiwiaXNzIjoidWJlci11czEiLCJqdGkiOiJiYzlkOTViMS0wMjUwLTQ1MGYtYjA3NS1mN2IzZjhhNGZjM2IiLCJleHAiOjE0Nzk3NzYxMTMsImlhdCI6MTQ3NzE4NDExMywidWFjdCI6Ino4ZTN2RFNJM0VOdnJzU0dqbUN4eG9zRlR6S01XRSIsIm5iZiI6MTQ3NzE4NDAyMywiYXVkIjoiSDJ5cHJlSUF1akk0X09VUjZKUkFFREx5cHZ1VDljRXAifQ.Thi4PsR6UwjVS9IQnFdT2UmgsIC4_op1wr6FaB2CccpnQtI3FGpwUwV315Lu5luKjsSynd4GK3gCUF44ZQxCdtlxm1VS3r6b_u3GXRT-yCGv_-sCzEGH13c2u9Z8bdUjmZDah6DVejGepRUl7SD-QD6mENecPJ_bRTJIM_XICQRHyAxYuEA5PJav5eApK8x2Jv0y4mky9281_HMGyvyxip0k6FPdu-TdXt_DMfMKGTeoR9DOdSg9WvtXhzAwCBkUoizHlHJKiR1OeX6z26GG3A_Shy74rU9dMBKR2aq4Q_QakJ_86RTgmKGYwZPfxs2xGNtUPDNfEbcJkSysC_aPTQ'
 
// }).on('success', (payload)=>{
// 	 /*YOUR CODE GOES HERE*/ 
// }).on('error', (payload)=>{
// 	 /*YOUR CODE GOES HERE*/ 
// });