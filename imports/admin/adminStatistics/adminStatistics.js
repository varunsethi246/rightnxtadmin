import './adminStatistics.html';

import { users } from '/imports/api/userMasterAPI.js';
import { Business } from '/imports/api/businessMaster.js';
import { Enquiry } from '/imports/api/businessMaster.js';
import { Offers } from '/imports/api/offersMaster.js';
import { BusinessBanner } from '/imports/api/businessBannerMaster.js';


Template.adminStatistics.helpers({
	'adminStatistics':function() {
		var userCounts 		= Counts.get('noOfUserCount');
		var vendorCounts 	= Counts.get('noOfVendorCount');
		var busActCounts 	= Counts.get('noOfBusinessActive');
		var busInactCounts 	= Counts.get('noOfBusinessInactive');
		var noOfEnq 		= Counts.get('noOfEnq');
		var noOfoffer 		= Counts.get('noOfOffer');
		var noOfBanner 		= Counts.get('noOfBanner');
		var noOfAdd 		= Counts.get('noOfAds');
		// console.log('busActCounts :',busActCounts);
		// console.log('busInactCounts :',busInactCounts);
		// console.log('offerYear :' , offerYear);

		var value = {
						"userCounts" 		: userCounts,
						"vendorCounts" 		: vendorCounts,
						"busActCounts" 		: busActCounts,
						"busInactCounts" 	: busInactCounts,
						"enqWeek"			: noOfEnq,
						"offer"				: noOfoffer,
						"noOfBanner"		: noOfBanner,
						"noOfAdd"			: noOfAdd,
						
					};
		// console.log('value', value);
		return value;

	}
});


