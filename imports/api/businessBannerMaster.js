import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';

import { Business } from '/imports/api/businessMaster.js';
import { Position } from '/imports/api/discountMaster.js';
import { Payment } from '/imports/api/paymentMaster.js';



export const BusinessBanner = new Mongo.Collection('businessBanner');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('allbusinessBanner', function allbusinessBanner() {
    return BusinessBanner.find({});
  });
}


Meteor.methods({
	'insertBusinessBanner':function(formValues){
		var loggedInUser = Meteor.userId();
		var business = Business.findOne({"businessLink": formValues.businessLink, "status":"active"});

		var positionDetails = Position.findOne({'position':parseInt(formValues.position)});
		if(positionDetails){
			var bannerRate = positionDetails.rate;
		}else{
			var bannerRate = 0;
		}

		return BusinessBanner.insert({ 
			"businessTitle" : business.businessTitle,
			"businessLink" 	: formValues.businessLink,
			"category" 		: formValues.category,
			"position" 		: formValues.position,
			"rank" 			: formValues.rank,
			"areas" 	    : formValues.selectedAreas,
			"bannerRate" 	: bannerRate,
			"startDate" 	: formValues.startDate,
			"noOfMonths" 	: formValues.noOfMonths,
			"endDate" 		: formValues.endDate,
			"createdAt"	    : new Date(),
			"status"		: "new",
			"createdBy"		: loggedInUser,
			// "payment"		: 'incomplete'
		}, function(error,result){
			if(error){
				// console.log(error);
				return error;
			}
			if(result){
				return result;
			}
		}

		);		
	},
	
	'removeBusinessBanner': function(businessLink, catg,pos,rank){
		BusinessBanner.remove({"businessLink": businessLink, "category":catg,"position":pos,"rank":rank});
	},

	'removeBusinessBannerId': function(id){
		BusinessBanner.remove({"_id": id});
	},

	'removeBusinessBannerAll': function(id){
		BusinessBanner.remove({"_id": id});
	},


	'activateBannerPayment':function(businessLink,catg){
		BusinessBanner.update( 
			{"businessLink": businessLink,"category":catg},
			{$set : {
				"status"		: "active",
				}
			}, 
			function(error,result){
				if(error){
					// console.log(error);
					return error;
				}
				if(result){
					Payment.update(
						{"businessLink":businessLink,"orderType":"Banner",'paymentStatus':'unpaid'},
						{ $set:	{ 
								"paymentStatus" 			: "paid",
								"paymentDate" 				: new Date(),
								"modeOfPayment" 			: "cash"
							}, 
						}
					);
					return result;
				}
			}
		);
	},


	// 'updateBusinessBanner':function(formValues,areaNames){
	// 	BusinessBanner.update( 
	// 		{businessLink: formValues.businessLink,category: formValues.category,position: formValues.position,rank: formValues.rank},
	// 		{$set : {
	// 			"areas"			: areaNames,
	// 			"payment"		: 'incomplete'
	// 			}
	// 		}, 
	// 		function(error,result){
	// 			if(error){
	// 				// console.log(error);
	// 				return error;
	// 			}
	// 			if(result){
	// 				return result;
	// 			}
	// 		}
	// 	);
	// 	// return businessLink;
	// }



	
	'deactivateBannerPayment':function(businessLink,catg){
		BusinessBanner.update( 
			{"businessLink": businessLink,"category":catg},
			{$set : {
				"status"		: "inactive",
				}
			}, 
			function(error,result){
				if(error){
					// console.log(error);
					return error;
				}
				if(result){
					return result;
				}
			}
		);
	},

	'deactivateBanner':function(id){
		console.log('id',id);
		BusinessBanner.update( 
			{"_id": id},
			{$set : {
				"status"		: "inactive",
				}
			}, 
			function(error,result){
				if(error){
					// console.log(error);
					return error;
				}
				if(result){
					return result;
				}
			}
		);
	},
});
