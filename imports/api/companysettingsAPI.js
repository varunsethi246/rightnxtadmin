import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import { Payment } from './paymentMaster.js';

export const CompanySettings = new Mongo.Collection('companySettings');
export const TempLogoImage = new Mongo.Collection('tempLogoImage');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('companySettings', function companySettings() {
    return CompanySettings.find({});
  });

  Meteor.publish('tempLogoImage', function tempLogoImage(){
	    return TempLogoImage.find({});
  });
}


Meteor.methods({

	'insertCompanyInfo':function(companyInfoFormValue){
		//Insert into collection 
		var count = CompanySettings.find({'companyId':101}).count();

		if(count){
			// console.log('true');
			if(companyInfoFormValue.companyName != '' && companyInfoFormValue.companyContactNumber != '' &&
				companyInfoFormValue.companyEmail != '' && companyInfoFormValue.companyAddress != '' &&
				companyInfoFormValue.companyPincode != '' && companyInfoFormValue.companyCity != '' &&
				companyInfoFormValue.companyState != '' && companyInfoFormValue.companyCountry != ''){		
				CompanySettings.update(
				{"companyId"    : 101,"companyLocationsInfo.companyLocationId":0},
				{$set:
					{
						"companyName"          : companyInfoFormValue.companyName,
						"companyContactNumber" : companyInfoFormValue.companyContactNumber,
						"companyEmail"         : companyInfoFormValue.companyEmail,
						"companyLocationsInfo.$.companyLocationId" : 0,
						"companyLocationsInfo.$.mainLocation" : "Headoffice",
						"companyLocationsInfo.$.companyAddress" : companyInfoFormValue.companyAddress,
						"companyLocationsInfo.$.companyPincode" : companyInfoFormValue.companyPincode,
						"companyLocationsInfo.$.companyCity" : companyInfoFormValue.companyCity,
						"companyLocationsInfo.$.companyState" : companyInfoFormValue.companyState,
						"companyLocationsInfo.$.companyCountry" : companyInfoFormValue.companyCountry,
						// "logoFilename"         : companyInfoFormValue.logoFilename,
						// "companyLogo"          : companyInfoFormValue.companyLogo,
					}
				}
				);
			}
		}else{
			CompanySettings.insert({
				"companyId"            : 101,
				"companyName"          : companyInfoFormValue.companyName,
				"companyContactNumber" : companyInfoFormValue.companyContactNumber,
				"companyEmail"         : companyInfoFormValue.companyEmail,
				// "logoFilename"         : companyInfoFormValue.logoFilename,
					// "companyLogo"      : companyInfoFormValue.companyLogo,
				"companyLocationsInfo" : [{
					"companyLocationId": 0,
					"mainLocation"     : "Headoffice",
					"companyAddress"   : companyInfoFormValue.companyAddress,
					"companyPincode"   : companyInfoFormValue.companyPincode,
					"companyCity"	   : companyInfoFormValue.companyCity,
					"companyState"     : companyInfoFormValue.companyState,
					"companyCountry"   : companyInfoFormValue.companyCountry,
				}],
				"rates" : {
					"ratePerOffer"   	: 100,
					"ratePerAdvertise"  : 100,
					"ratePerBanner"	    : 100,
				},
			});
		}
		// Meteor.call('tempLogoImageDelete',companyInfoFormValue.logoFilename);
		// TempLogoImage.remove({'logoFilename' : logoFilename});
	},

	'insertCompanyLocations':function(companyLocationFormValue){
			// var address = Session.get("companyAddress");
			var userId = CompanySettings.findOne({"companyId" : 101});
			if(userId && companyLocationFormValue.companyLocation !="" && companyLocationFormValue.companyAddress !=""){	
				if(userId.companyLocationsInfo){
					if(userId.companyLocationsInfo.length > 0){
						var companyLocationId = userId.companyLocationsInfo.length;
					}else{
						var companyLocationId = 0;
					}
				}else{
					var companyLocationId = 0;
				}		
				CompanySettings.update({"companyId" : 101},
					{$push:{ companyLocationsInfo : {
							companyLocationId : companyLocationId,
							companyLocation: companyLocationFormValue.companyLocation,
							companyAddress : companyLocationFormValue.companyAddress,
							companyPincode : companyLocationFormValue.companyPincode,
							companyCity    : companyLocationFormValue.companyCity,
							companyState   : companyLocationFormValue.companyState,
							companyCountry : companyLocationFormValue.companyCountry,
							
							}
						}
				});
			}
		
	},
	removeallCompanyLocations: function(selectedLocation){
      CompanySettings.update({'companyId': 101}, {$pull : {'companyLocationsInfo' : selectedLocation}});
      
    },
	'updateCompanyLocations':function(companyLocationFormValue){
		var userId = CompanySettings.findOne({"companyId" : 101});
		
		if(userId){
			CompanySettings.update({'_id' : userId._id, 'companyLocationsInfo.companyLocationId':companyLocationFormValue.companyLocationId },
					{$set: {
							'companyLocationsInfo.$.companyLocationId': companyLocationFormValue.companyLocationId,
							'companyLocationsInfo.$.companyLocation': companyLocationFormValue.companyLocation,
							'companyLocationsInfo.$.companyAddress' : companyLocationFormValue.companyAddress,
							'companyLocationsInfo.$.companyPincode' : companyLocationFormValue.companyPincode,
							'companyLocationsInfo.$.companyCity'    : companyLocationFormValue.companyCity,
							'companyLocationsInfo.$.companyState'   : companyLocationFormValue.companyState,
							'companyLocationsInfo.$.companyCountry' : companyLocationFormValue.companyCountry,
							
							}
						}
				);

		}
		

	},

	'updateBankDetails':function(companyBankDetailsFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId && companyBankDetailsFormValue.accNumber != "" && companyBankDetailsFormValue.ifscCode != "" && companyBankDetailsFormValue.accHolderName != ""){
			CompanySettings.update({'_id': userId._id,'bankDetails.accNumber':companyBankDetailsFormValue.accNumber},
				{$set:{ 
					'bankDetails.$.accHolderName': companyBankDetailsFormValue.accHolderName,
					'bankDetails.$.bankName'	 : companyBankDetailsFormValue.bankName,
					'bankDetails.$.branchName'	 : companyBankDetailsFormValue.branchName,
					'bankDetails.$.accNumber'	 : companyBankDetailsFormValue.accNumber,
					'bankDetails.$.ifscCode'	 : companyBankDetailsFormValue.ifscCode,
						
						
					}
				});
		} //end of if userid
	},

	removeBankDetails: function(bankDetails){
      CompanySettings.update({'companyId': 101}, {$pull : {'bankDetails' : bankDetails}});
      
    },
	

	'insertCompanyBankDetails':function(companyBankDetailsFormValue){
		
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId && companyBankDetailsFormValue.accNumber != "" && companyBankDetailsFormValue.ifscCode != "" && companyBankDetailsFormValue.accHolderName != ""){
			
			CompanySettings.update({'_id': userId._id},
				{$push:{ bankDetails : {
						accHolderName : companyBankDetailsFormValue.accHolderName,
						bankName      : companyBankDetailsFormValue.bankName,
						branchName    : companyBankDetailsFormValue.branchName,
						accNumber	  : companyBankDetailsFormValue.accNumber,
						ifscCode      : companyBankDetailsFormValue.ifscCode,
						
						}
					}
				});
		} //end of if userid
	},


	'insertGeneralSettings':function(generalSettingsFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId){
		
		CompanySettings.update({'_id': userId._id},
			{$set:{ generalSettings :{
					scaleProcess: generalSettingsFormValue.scaleType,
					shopType    : generalSettingsFormValue.shopType,
					processType : generalSettingsFormValue.processType,
					storeType	: generalSettingsFormValue.storeType,
					}
				}
			},function(error,result){
				                if(error) {
				                	return error;
				                } else {
				                	FlowRouter.go('/');
				                	Bert.alert( 'Theme Setting Successful!', 'success', 'growl-top-right' );
				                	return result;
				                }
				}
		);
		}
	},



	'insertTaxSettings':function(taxSettingsFormValue){
		
		
		// Refer http://stackoverflow.com/questions/7556591/javascript-date-object-always-one-day-off

		//First find previous day of FromDate. 
		//Update Previous Record for same TaxType. Put ToDate = 1 Day prior to FromDate
		if(taxSettingsFormValue.effectiveFrom != '' && taxSettingsFormValue.applicableTax != ''){
			var userId = CompanySettings.findOne({"companyId" : 101});
			if(userId){
			var fromDate1 = taxSettingsFormValue.effectiveFrom.replace(/-/g, '\/');
			var toDateForPreviousRecordISOFormat = new Date(new Date(fromDate1) - (24*60*60*1000) );
			var formateddate = new Date(toDateForPreviousRecordISOFormat);
			var newdate = new Date(taxSettingsFormValue.effectiveFrom);
			newdate.setDate(newdate.getDate() - 1); // minus the date
			var nd = new Date(newdate);
			
			//Convert ISO Date in to only date format 2016-06-11
			// var toDateForPreviousRecord = formateddate.getFullYear()+'-' + (formateddate.getMonth()+1) + '-'+formateddate.getDate();
			var toDateForPreviousRecord = moment(nd).format('YYYY-MM-DD');
			// console.log(toDateForPreviousRecord);
			var queryResult = CompanySettings.find({'_id': userId._id, 
					  'taxSettings.taxType' : taxSettingsFormValue.taxType , 
					  'taxSettings.effectiveTo' : '',}).count();	
			
			
				if(queryResult){
				CompanySettings.update({'taxSettings':
											{
												$elemMatch:
												{ 
						 							'taxType' : taxSettingsFormValue.taxType , 
						  							'effectiveTo' : "",
						  						}
										}
					},
					{$set:{ 
							'taxSettings.$.effectiveTo' : toDateForPreviousRecord,
							
						  }
					},
				);

				CompanySettings.update({'_id': userId._id},
					{$push:{ taxSettings :{

							taxType       : taxSettingsFormValue.taxType,
							applicableTax : taxSettingsFormValue.applicableTax,
							effectiveFrom : taxSettingsFormValue.effectiveFrom,
							effectiveTo	  : '',
							createdAt     : new Date(),
						}
					}
				},
				);

			}else{
				
				CompanySettings.update({'_id': userId._id},
					{$push:{ taxSettings :{

							taxType       : taxSettingsFormValue.taxType,
							applicableTax : taxSettingsFormValue.applicableTax,
							effectiveFrom : taxSettingsFormValue.effectiveFrom,
							effectiveTo	  : '',
							createdAt     : new Date(),
						}
					}
				},
				);
			}
			}
		}
		},
		
		removeTaxDetails: function(taxDetails){
     		 CompanySettings.update({'companyId': 101}, {$pull : {'taxSettings' : taxDetails}});
      
    	},
	

		'updatetaxSettings':function(taxSettingsFormValue,targetedID){
		
		
		var targetedID =targetedID;
		// Refer http://stackoverflow.com/questions/7556591/javascript-date-object-always-one-day-off

		//First find previous day of FromDate. 
		//Update Previous Record for same TaxType. Put ToDate = 1 Day prior to FromDate
		var userId = CompanySettings.findOne({"companyId" : 101});
			if(userId){
			var fromDate1 = taxSettingsFormValue.effectiveFrom.replace(/-/g, '\/');
			var toDateForPreviousRecordISOFormat = new Date(new Date(fromDate1) - (24*60*60*1000) );
			var formateddate = new Date(toDateForPreviousRecordISOFormat);
			
			// var userId = CompanySettings.findOne({"companyId" : 101});
			//Convert ISO Date in to only date format 2016-06-11
			var toDateForPreviousRecord = formateddate.getFullYear()+'-' + (formateddate.getMonth()+1) + '-'+formateddate.getDate();
			var queryResult = CompanySettings.find({'_id': userId._id, 
					  'taxSettings.taxType' : taxSettingsFormValue.taxType }).count();	
		
			
				if(userId){
				CompanySettings.update({'_id': userId._id, 'taxSettings.taxType':taxSettingsFormValue.taxType},
					{$set:{
							['taxSettings.'+targetedID+'.taxType']       :taxSettingsFormValue.taxType,
							['taxSettings.'+targetedID+'.applicableTax'] : taxSettingsFormValue.applicableTax,
							['taxSettings.'+targetedID+'.effectiveFrom'] : taxSettingsFormValue.effectiveFrom,
							
						
					}
				},
				);

			}
		}
	},

	'insertLabourCharges':function(labourChargesDetailsFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId && labourChargesDetailsFormValue.labourChargeCategory !="" && labourChargesDetailsFormValue.labourChargeRate != ""){
			
			CompanySettings.update({'_id': userId._id},
				{$push:{ labourChargesDetails:{
						labourChargeCategory : labourChargesDetailsFormValue.labourChargeCategory,
						labourChargeRate     : labourChargesDetailsFormValue.labourChargeRate						
						}
					}
				});
		} //end of if userid
	},

	'insertEventName':function(eventInfoFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId && eventInfoFormValue.eventName != ""){
			
			CompanySettings.update({'_id': userId._id},
				{$push:{ TemplateEventName:{
						eventName : eventInfoFormValue.eventName,
						}
					}
				});
		} //end of if userid
	},

	'insertBusinessRate':function(eventInfoFormValue){
		// console.log(eventInfoFormValue);
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId){
			if(userId.BusinessRates){
				if(userId.BusinessRates.length > 0){
					// if(userId.BusinessRates.length == 1){
						CompanySettings.update(
							{"_id" : userId._id},
							{$set :{
								   'BusinessRates.0.monthlyRate' : eventInfoFormValue.monthlyRate,
								   'BusinessRates.0.categoryRate': eventInfoFormValue.categoryRate,
								   'BusinessRates.0.areaRate' : eventInfoFormValue.areaRate,
						        }
							}
						);	
					// }
				}else{
					CompanySettings.update({'_id': userId._id},
						{$push:{ BusinessRates:{
								monthlyRate     : eventInfoFormValue.monthlyRate,
							    categoryRate    : eventInfoFormValue.categoryRate,
							    areaRate        : eventInfoFormValue.areaRate,
								}
							}
						}
					);
				}
			}else{
				CompanySettings.update({'_id': userId._id},
					{$push:{ BusinessRates:{
							monthlyRate     : eventInfoFormValue.monthlyRate,
						    categoryRate    : eventInfoFormValue.categoryRate,
						    areaRate        : eventInfoFormValue.areaRate,
							}
						}
					}
				);
			}
		} //end of if userid
	},

	'insertEventTemplateName':function(eventTemplateInfoFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId && eventTemplateInfoFormValue.eventTemplateName != ""){
			
			CompanySettings.update({'_id': userId._id},
				{$push:{ TemplateName:{
						templateName : eventTemplateInfoFormValue.eventTemplateName,
						}
					}
				});
		} //end of if userid
	},

	'removeBusinessRate':function(){
		CompanySettings.update({'companyId': 101},{$unset:{'BusinessRates':1}});
	},

	removeEventDetails: function(eventDetails){
     		 CompanySettings.update({'companyId': 101}, {$pull : {'TemplateEventName' : eventDetails}});
      
    	},

	removeEventTemplateDetails: function(eventDetails){
 		 CompanySettings.update({'companyId': 101}, {$pull : {'TemplateName' : eventDetails}});
  
	},
	
	removeLabourChargesDetails: function(labourChargeDetails){
     		 CompanySettings.update({'companyId': 101}, {$pull : {'labourChargesDetails' : labourChargeDetails}});
      
    },

    'updateLabourChargeSettings':function(labourChargesDetailsFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId){
			
			CompanySettings.update({'_id': userId._id,'labourChargesDetails.labourChargeCategory':labourChargesDetailsFormValue.labourChargeCategory},
				{$set:{ 
					// 'labourChargesDetails.$. labourChargeCategory':companyBankDetailsFormValue.labourChargeCategory,
					'labourChargesDetails.$.labourChargeRate'	 : labourChargesDetailsFormValue.labourChargeRate,
				}
			});
		} //end of if userid
	},
    
    'insertRateDetails':function(rateDetailsFormValue){
		
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId && rateDetailsFormValue.silverRate != ""){
			
			CompanySettings.update({'_id': userId._id},
				{$push:{ rates:{
						silver : rateDetailsFormValue.silverRate,
						gold   : rateDetailsFormValue.goldRate,
						date   : new Date()					
						}
					}
				},function(error,result){
				                if(error) {
				                	return error;
				                } else {
				                	Bert.alert( 'Rate Inserted Successful!', 'success', 'growl-top-right' );
				                	return result;
				                }
				}
			);
		} //end of if userid
	},
	removeRateDetails: function(rateDetailsArray){
		console.log(rateDetailsArray);
     		CompanySettings.update({"companyId":101},{$pull:{"rates":rateDetailsArray}});
      
    },

    'updateUserProfile1' :function(loggedInUser,firstName,lastName){
    	Meteor.users.update(
    		{'_id': loggedInUser },
    		{
    			$set:{
					"profile.firstName"    : firstName ,
					"profile.lastName"     : lastName,
					// "services.password.bcrypt" : password,
    		} //End of set
    	}
    	);
    },

    'updateUserPassword1' :function(loggedInUser,password){
	// Accounts.setPassword(urlUID, passwordVar1);
	
    	Accounts.setPassword(loggedInUser, password);
    },

    'tempLogoImageUpload':function(fileName, fileData){
    	var istempLogo = TempLogoImage.findOne({});
    	if(istempLogo){
    		TempLogoImage.update(
	    		{'_id': istempLogo._id },
	    		{
	    			$set:{
						'createdAt'		: new Date(),
				        'logoFilename'  : fileName,
				     	'tempLogoImg'   : fileData,
						// "services.password.bcrypt" : password,
		    		} //End of set
		    	}
	    	);
    	}else{
			TempLogoImage.insert(
			    {
			        'createdAt'		: new Date(),
			        'logoFilename'  : fileName,
			     	'tempLogoImg'   : fileData, 
			    }, function(error,result){
		                // console.log(error,result);
		                if(error) {
		                    return error;
		                } else {
		                    return result;
		                }
	            	}
		    );
    	}
	},

    'tempLogoImageDelete':function(fileName){
		TempLogoImage.remove(
		    {
		        'logoFilename'  : fileName,
		    }, function(error,result){
	                // console.log(error,result);
	                if(error) {
	                    return error;
	                } else {
	                    return result;
	                }
            	}
	      );
	},

	'insertOtherSettings':function(otherSettingsFormValue){
		// console.log("true");	
		// console.log(JSON.stringify(otherSettingsFormValue));
		var userId = CompanySettings.findOne({"companyId" : 101});
		if(userId){
			if(userId.rates){
				var offerUpdate = Payment.update({'offerPricePerMonth': userId.rates.ratePerOffer,'paymentStatus':'unpaid'},
					{	
						$set: { 
							'offerPricePerMonth' : otherSettingsFormValue.ratePerOffer,
						}
					},{multi:true}
				);	

				// console.log('offerUpdate',offerUpdate);
				if(offerUpdate||!offerUpdate){
					CompanySettings.update({'_id': userId._id},
						{	
							$set: { rates : {
								ratePerOffer 		  : otherSettingsFormValue.ratePerOffer,
								ratePerAdvertise      : otherSettingsFormValue.ratePerAdvertise,
								ratePerBanner    	  : otherSettingsFormValue.ratePerBanner,
								
								}
							}
						}
					);
				}
			}
		} //end of if userid
	},
});
