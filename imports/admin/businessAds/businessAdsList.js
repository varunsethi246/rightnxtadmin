import { BusinessAds } from '/imports/api/businessAdsMaster.js';
import { Session } from 'meteor/session';
import { Business } from '/imports/api/businessMaster.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Payment } from '/imports/api/paymentMaster.js';
import '/imports/admin/commonAdmin/commonAdmin.js';
import './businessAdsList.html';



Template.businessAdsList.onRendered(function(){
	$('.activeBanner').addClass('activeBannerColor');
	Session.set("activeAds","active");
});



Template.businessAdsList.helpers({
	adsDetails: function(){
		var adsStatus = '';
		var adsListDetails = [];
		if(Session.get("activeAds")=="active"){
			adsStatus = "active";
		}else if(Session.get("activeAds")=="new"){
			adsStatus = "new";
		} else {
			adsStatus = "inactive";
		}

		var paymentAdsArr = Payment.find({"orderType":"Ads"}).fetch();
		if(paymentAdsArr.length > 0){
			for (var i = 0; i < paymentAdsArr.length; i++) {
				var adsArray = paymentAdsArr[i].businessAds;
				if(adsArray.length>0){
					var categoryAdsArr = [];
    				var positionAdsArr = [];
    				var activeAdsArr = [];
					for (var j = 0; j < adsArray.length; j++) {
    					var adsData = BusinessAds.findOne({"_id":adsArray[j].businessAdsId,"status":adsStatus});
						if(adsData){
							var buttonStatus = '';
				    		var buttonStatusText = '';
				    		if(adsData.status=="active"){
				    			buttonStatus = "danger";
				    			buttonStatusText = "Deactivate";

				    			activeAdsArr.push({
				    				'endDate' : adsData.endDate,
				    				'adsId' : adsData._id,
				    			});
				    		}else{
				    			buttonStatus = "success";
				    			buttonStatusText = "Activate";
				    		}

				    		if(adsData.status=="inactive"&&paymentAdsArr[i].paymentStatus=='unpaid'){
				    			buttonInactive = true;
				    		}else{
				    			buttonInactive = false;
				    		}

				    		categoryAdsArr.push(adsData.category);
		    				// positionAdsArr.push(adsData.position);

		    				if(j==0){
		    					var objData = {
							    	rowSpanLength		: adsArray.length,
							    	paymentId 			: paymentAdsArr[i]._id,
							    	categoryArrList		: adsData.category,
				    				businessLink		: adsData.businessLink,
				    				bussinessTitle		: adsData.businessTitle,
				    				businessPosition	: adsData.position,
				    				businessArea		: adsData.areas,
				    				bannerDuration		: adsData.noOfMonths,
				    				buttonStatusText 	: buttonStatusText,
									buttonStatus 		: buttonStatus,
									buttonInactive 		: buttonInactive,
									startDate			: moment(adsData.startDate).format('DD/MM/YYYY'),
									endDate				: moment(adsData.endDate).format('DD/MM/YYYY'),
				    			};
		    				}else{
		    					var objData = {
							    	categoryArrList		: adsData.category,
				    				businessPosition	: adsData.position,
				    				businessArea		: adsData.areas,
				    				bannerDuration		: adsData.noOfMonths,
									startDate			: moment(adsData.startDate).format('DD/MM/YYYY'),
									endDate				: moment(adsData.endDate).format('DD/MM/YYYY'),
				    			};
		    				}

	    					adsListDetails.push(objData);
						}	
					}
				}

				// if(adsData){
				// 	var objData = {
				//     	categoryArrList		: categoryAdsArr,
	   //  				businessLink		: adsData.businessLink,
	   //  				bussinessTitle		: adsData.businessTitle,
	   //  				businessPosition	: positionAdsArr,
	   //  				bannerDuration		: adsData.noOfMonths,
	   //  				buttonStatusText 	: buttonStatusText,
				// 		buttonStatus 		: buttonStatus,
				// 		startDate			: moment(adsData.startDate).format('DD/MM/YYYY'),
				// 		endDate				: moment(adsData.endDate).format('DD/MM/YYYY'),
	   //  			};
	    			
	   //  			adsListDetails.push(objData);
				// }

				activeAdsArr.sort(function(a, b){
					// console.log('new Date(b.endDate) - new Date(a.endDate)',new Date(b.endDate),new Date(a.endDate));
					return new Date(b.endDate) - new Date(a.endDate);
				});
				if(activeAdsArr&&activeAdsArr.length>0){
	    			var currentDate = new Date();
	    			var adsEndDate = new Date(activeAdsArr[0].endDate);
		    		// console.log('adsEndDate',adsEndDate);
	    			if(currentDate>adsEndDate){
	    				for (var k = 0; k < activeAdsArr.length; k++) {
		    				var id = activeAdsArr[k].adsId;
		    				Meteor.call('deactivateAds', id , function(error,position){
								if(error){
								}else{
								}
							});
	    				}
	    			}
    			}
			}
		}

    	// var bannerData = BusinessBanner.find({"status":bannerStatus}).fetch();

    	// if(bannerData){
    	// 	var data = _.uniq(bannerData, function(p){ return p.businessLink; });
    	// 	for(i=0;i<data.length;i++){
    	// 		var categoryArr = [];
    	// 		var positionArr = [];
    	// 		for(j=0;j<bannerData.length;j++){
	    // 			if(data[i].businessLink==bannerData[j].businessLink){
	    // 				categoryArr.push(bannerData[j].category);
	    // 				var position = bannerData[j].position + "-" + bannerData[j].rank;
	    // 				positionArr.push(position);
	    // 			}
	    // 		}

	    // 		var buttonStatus = '';
	    // 		var buttonStatusText = '';
	    // 		if(data[i].status=="active"){
	    // 			buttonStatus = "danger";
	    // 			buttonStatusText = "Deactivate";
	    // 		}else{
	    // 			buttonStatus = "success";
	    // 			buttonStatusText = "Activate";
	    // 		}

	    // 		var objData = {
    	// 			categoryArrList		: categoryArr,
    	// 			businessLink		: data[i].businessLink,
    	// 			bussinessTitle		: data[i].businessTitle,
    	// 			businessPosition	: positionArr,
    	// 			bannerDuration		: data[i].noOfMonths,
    	// 			buttonStatusText 	: buttonStatusText,
					// buttonStatus 		: buttonStatus,
					// startDate			: moment(data[i].startDate).format('DD/MM/YYYY'),
					// endDate				: moment(data[i].endDate).format('DD/MM/YYYY'),
    	// 		};
    			
    	// 		bannerListDetails.push(objData);
	    		
    	// 	}
    	// }

    	// Search by Business Title or Business Category
    	if(Session.get('adsTextSearch')){
    		var textSearch = (Session.get('adsTextSearch')).toUpperCase();
    		filteredArr = [];
    		for(var i=0;i<adsListDetails.length;i++){

				var searchTextString = false;
				for(var j=0;j<adsListDetails[i].categoryArrList.length;j++){
					if(((adsListDetails[i].categoryArrList[j]).toUpperCase()).indexOf(textSearch) != -1){
						searchTextString = true;
					}
				}

				if((adsListDetails[i].bussinessTitle.toUpperCase()).indexOf(textSearch) != -1 || searchTextString){
					filteredArr.push(adsListDetails[i]);
				}
    		}
			return filteredArr;
    	}


    	// console.log('adsListDetails',adsListDetails);
    	return adsListDetails;
	},
});

Template.businessAdsList.events({
	'click .activeBanner':function(event){
		$('.bannerComClass').removeClass('activeBannerColor');
		$('.activeBanner').addClass('activeBannerColor');
		Session.set("activeAds","active");
	},
	'click .newBanner':function(event){
		$('.bannerComClass').removeClass('activeBannerColor');
		$('.newBanner').addClass('activeBannerColor');
		Session.set("activeAds","new");
	},
	'click .inactiveBanner':function(event){
		$('.bannerComClass').removeClass('activeBannerColor');
		$('.inactiveBanner').addClass('activeBannerColor');
		Session.set("activeAds","inactive");
	},
	'keyup .listBannerSearch': function(event){
		var textBanner = $('.listBannerSearch').val();
		Session.set('adsTextSearch',textBanner);
	},
	'click .btnStatAction': function(event){
		var businessLink = $(event.currentTarget).parent().parent().parent().parent().parent().parent().siblings('.bannerTitleFont').children('.bannerLinkFont').text();
    	var bannerData = BusinessAds.find({"businessLink":businessLink}).fetch();

		if(bannerData){
			if($('.activeBanner').hasClass('activeBannerColor')){
				for(var i=0;i<bannerData.length;i++){
					var catg = bannerData[i].category;

					Meteor.call('deactivateAdsPayment', businessLink, catg, function(error,position){
						if(error){
							// console.log('Error occured while removing Business Banner: ', error);
						}else{
							// console.log('Business Bannerremoved successfully');
							$('.modal-backdrop').hide();
						}
					});
				}
			} else if($('.newBanner').hasClass('activeBannerColor')){
				for(var i=0;i<bannerData.length;i++){
					var catg = bannerData[i].category;
					var checkBus = Business.findOne({'businessLink':businessLink},{fields:{"status":1}});
					// console.log("checkBus: ",checkBus);
					if(checkBus.status != "inactive"){
						Meteor.call('activateAdsPayment', businessLink, catg, function(error,position){
							if(error){
								console.log('Error occured while removing Business Banner: ', error);
							}else{
								// console.log('Business Bannerremoved successfully');
								$('.modal-backdrop').hide();
							}
						});
					}else{
						Bert.alert('Activate the Business First','danger','growl-top-right');
					}
					
				}
			} else if($('.inactiveBanner').hasClass('activeBannerColor')){
				for(var i=0;i<bannerData.length;i++){
					var catg = bannerData[i].category;
					var checkBus = Business.findOne({'businessLink':businessLink},{fields:{"status":1}});
					if(checkBus.status != "inactive"){
						Meteor.call('activateAdsPayment', businessLink, catg, function(error,position){
							if(error){
								console.log('Error occured while removing Business Banner: ', error);
							}else{
								// console.log('Business Bannerremoved successfully');
								$('.modal-backdrop').hide();
							}
						});
					}else{
						Bert.alert('Activate the Business First','danger','growl-top-right');
					}
					
				}
			}


			
		}
	},
	'click .btnDeleteAction': function(event){
		// console.log('adsArray:',this);
		Meteor.call('removeAdsinPayment',this.paymentId, function(error,result){
			if(error){
				console.log('Error occured while removing Business Banner: ', error);
			}else{
				// console.log('Ads from payment removed successfully.');	
				$('.modal-backdrop').hide();
			}
		});

		//Old Code
		// var businessLink = $(event.currentTarget).parent().parent().parent().parent().parent().parent().siblings('.bannerTitleFont').children('.bannerLinkFont').text();
  //   	var bannerData = BusinessAds.find({"businessLink":businessLink}).fetch();
		// for(i=0;i<bannerData.length;i++){
		// 	var catg = bannerData[i].category;
		// 	Meteor.call('removeBusinessAdsAll', businessLink, catg, function(error,position){
		// 		if(error){
		// 			console.log('Error occured while removing Business Banner: ', error);
		// 		}else{
		// 			console.log('Business Bannerremoved successfully');
		// 			$('.modal-backdrop').hide();
		// 		}
		// 	});
		// }
	},
});

businessAdsListForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'businessAdsList'});
}

export { businessAdsListForm }