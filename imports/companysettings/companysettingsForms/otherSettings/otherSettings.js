import './otherSettings.html';

Template.otherSettings.onRendered(function(){
	$("#otherSettings").validate({
	 	rules: {
	        ratePerOffer: {
	            required: true,
	        },
	        ratePerAdvertise: {
	        	required: true,
	        },
	        ratePerBanner: {
	        	required: true,
	        }
    	}
	});
});