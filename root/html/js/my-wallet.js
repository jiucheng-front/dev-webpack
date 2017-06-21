$(function(){
	function asyncLoadData(callback) {
		//var sKey = 'SAPnym', access_token = 'XsiE5L';
	    $.ajax({
	        url: domain+'v1/my/balance',
	        type: 'POST',
	        data: {"x":jwt,"access_token":access_token},
	        // jsonp: "callback",
	        // jsonpCallback:"jsonpCallback",
	        success: function(sJWS) {
				console.log('xxxx:'+sJWS);
				var isValid = KJUR.jws.JWS.verify(sJWS, sKey)
				if(isValid) {
					var a = sJWS.split(".");
					var uHeader = b64utos(a[0]);
					var uClaim = b64utos(a[1]);
					var pHeader = KJUR.jws.JWS.readSafeJSONString(uHeader);
					var pClaim = KJUR.jws.JWS.readSafeJSONString(uClaim);
					callback(pClaim)					
				}else {
					console.log('valid jws error');
				}
	        },
	        error: function(xhr) {
	            console.log('error is:')
	            console.log(xhr)
	        }
	    })
	}

	asyncLoadData(function (data) {
		console.log('data is ');
		console.log(data);

	});
});