import { BusinessBanner } from '/imports/api/businessBannerMaster.js';
import { Session } from 'meteor/session';
import { Business } from '/imports/api/businessMaster.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Payment } from '/imports/api/paymentMaster.js';
import '/imports/admin/commonAdmin/commonAdmin.js';
import './businessBannerList.html';




Template.businessBannerList.onRendered(function(){
	$('.activeBanner').addClass('activeBannerColor');

	// if($('.activeBanner').hasClass('activeBannerColor')){
	// 	$('.deleteBanner').addClass('activeBannerHide').removeClass('activeBannerShow');
	// }
	Session.set("activeBanners","active");
});



Template.businessBannerList.helpers({
	bannerDetails: function(){
		var bannerStatus = '';
		var bannerListDetails = [];
		if(Session.get("activeBanners")=="active"){
			bannerStatus = "active";
		}else if(Session.get("activeBanners")=="new"){
			bannerStatus = "new";
		} else {
			bannerStatus = "inactive";
		}

		var paymentArr = Payment.find({"orderType":"Banner"}).fetch();
		if(paymentArr.length > 0){
			for (var i = 0; i < paymentArr.length; i++) {
				var bannerArray = paymentArr[i].businessBanner;
				if(bannerArray.length>0){
					var categoryArr = [];
    				var positionArr = [];
					for (var j = 0; j < bannerArray.length; j++) {
    					var bannerData = BusinessBanner.findOne({"_id":bannerArray[j].businessBannerId,"status":bannerStatus});
						if(bannerData){
							var buttonStatus = '';
				    		var buttonStatusText = '';
				    		if(bannerData.status=="active"){
				    			buttonStatus = "danger";
				    			buttonStatusText = "Deactivate";
				    		}else{
				    			buttonStatus = "success";
				    			buttonStatusText = "Activate";
				    		}

				    		categoryArr.push(bannerData.category);
		    				var position = bannerData.position + "-" + bannerData.rank;
		    				positionArr.push(position);
						}	
					}
				}

				if(bannerData){
					var objData = {
				    	categoryArrList		: categoryArr,
	    				businessLink		: bannerData.businessLink,
	    				bussinessTitle		: bannerData.businessTitle,
	    				businessPosition	: positionArr,
	    				bannerDuration		: bannerData.noOfMonths,
	    				buttonStatusText 	: buttonStatusText,
						buttonStatus 		: buttonStatus,
						startDate			: moment(bannerData.startDate).format('DD/MM/YYYY'),
						endDate				: moment(bannerData.endDate).format('DD/MM/YYYY'),
	    			};
	    			bannerListDetails.push(objData);
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
    	if(Session.get('bannerTextSearch')){
    		var textSearch = (Session.get('bannerTextSearch')).toUpperCase();
    		filteredArr = [];
    		for(i=0;i<bannerListDetails.length;i++){

				var searchTextString = false;
				for(j=0;j<bannerListDetails[i].categoryArrList.length;j++){
					if(((bannerListDetails[i].categoryArrList[j]).toUpperCase()).indexOf(textSearch) != -1){
						searchTextString = true;
					}
				}

				if((bannerListDetails[i].bussinessTitle.toUpperCase()).indexOf(textSearch) != -1 || searchTextString){
					filteredArr.push(bannerListDetails[i]);
				}
    		}
			return filteredArr;
    	}


    	
    	return bannerListDetails;
	},
});

Template.businessBannerList.events({
	'click .activeBanner':function(event){
		$('.bannerComClass').removeClass('activeBannerColor');
		$('.activeBanner').addClass('activeBannerColor');
		Session.set("activeBanners","active");
		// setTimeout(function() {
		// 	if($('.activeBanner').hasClass('activeBannerColor')){
		// 		$('.deleteBanner').addClass('activeBannerHide').removeClass('activeBannerShow');
		// 	}
		// },1);
	},
	'click .newBanner':function(event){
		$('.bannerComClass').removeClass('activeBannerColor');
		$('.newBanner').addClass('activeBannerColor');
		Session.set("activeBanners","new");
		// if($('.newBanner').hasClass('activeBannerColor')){
		// 	$('.deleteBanner').addClass('activeBannerShow').removeClass('activeBannerHide');
		// }
	},
	'click .inactiveBanner':function(event){
		$('.bannerComClass').removeClass('activeBannerColor');
		$('.inactiveBanner').addClass('activeBannerColor');
		Session.set("activeBanners","inactive");
		// if($('.inactiveBanner').hasClass('activeBannerColor')){
		// 	$('.deleteBanner').addClass('activeBannerShow').removeClass('activeBannerHide');
		// }
	},
	'keyup .listBannerSearch': function(event){
		var textBanner = $('.listBannerSearch').val();
		Session.set('bannerTextSearch',textBanner);
		
		// if($('.activeBanner').hasClass('activeBannerColor')){
		// 	setTimeout(function() {
		// 		$('.deleteBanner').addClass('activeBannerHide').removeClass('activeBannerShow');
		// 	},1);
		// }
		// if(($('.inactiveBanner').hasClass('activeBannerColor'))||($('.newBanner').hasClass('activeBannerColor'))){
		// 	$('.deleteBanner').addClass('activeBannerShow').removeClass('activeBannerHide');
		// }
		
	},
	'click .btnStatAction': function(event){
		var businessLink = $(event.currentTarget).parent().parent().parent().parent().parent().parent().siblings('.bannerTitleFont').children('.bannerLinkFont').text();
    	var bannerData = BusinessBanner.find({"businessLink":businessLink}).fetch();

		if(bannerData){
			if($('.activeBanner').hasClass('activeBannerColor')){
				for(i=0;i<bannerData.length;i++){
					var catg = bannerData[i].category;

					Meteor.call('deactivateBannerPayment', businessLink, catg, function(error,position){
						if(error){
							console.log('Error occured while removing Business Banner: ', error);
						}else{
							$('.modal-backdrop').hide();
						}
					});
				}
			} else if($('.newBanner').hasClass('activeBannerColor')){
				for(i=0;i<bannerData.length;i++){
					var catg = bannerData[i].category;
					var checkBus = Business.findOne({'businessLink':businessLink},{fields:{"status":1}});
					if(checkBus.status != "inactive"){
						Meteor.call('activateBannerPayment', businessLink, catg, function(error,position){
							if(error){
								console.log('Error occured while removing Business Banner: ', error);
							}else{
								console.log('Business Bannerremoved successfully');
								$('.modal-backdrop').hide();
							}
						});
					}else{
						Bert.alert('Activate the Business First','danger','growl-top-right');
					}
					
				}
			} else if($('.inactiveBanner').hasClass('activeBannerColor')){
				for(i=0;i<bannerData.length;i++){
					var catg = bannerData[i].category;
					var checkBus = Business.findOne({'businessLink':businessLink},{fields:{"status":1}});
					if(checkBus.status != "inactive"){
						Meteor.call('activateBannerPayment', businessLink, catg, function(error,position){
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
		// console.log('bannerArray:',this);
    	var selector = [];
		var categoryArray = this.categoryArrList;
		if(categoryArray.length>0){
			for (var i = 0; i < categoryArray.length; i++) {
    			var bannerData = BusinessBanner.findOne({"businessLink":this.businessLink,"category":categoryArray[i]});
    			if(bannerData){
					selector.push({"businessBannerId" : bannerData._id});
					Meteor.call('removeBusinessBannerAll', this.businessLink, categoryArray[i], function(error,position){
						if(error){
							console.log('Error occured while removing Business Banner: ', error);
						}else{
							console.log('Business Bannerremoved successfully');
							$('.modal-backdrop').hide();
						}
					});
    			}
			}
			Meteor.call('removeBannerinPayment',selector, function(error,result){
				if(error){
					console.log('Error occured while removing Business Banner: ', error);
				}else{
					console.log('Banner from payment removed successfully.');	
				}
			});
		}

		//Old Code
		// var businessLink = $(event.currentTarget).parent().parent().parent().parent().parent().parent().siblings('.bannerTitleFont').children('.bannerLinkFont').text();
  //   	var bannerData = BusinessBanner.find({"businessLink":businessLink}).fetch();
    	
		// for(i=0;i<bannerData.length;i++){
		// 	var catg = bannerData[i].category;
		// 	Meteor.call('removeBusinessBannerAll', businessLink, catg, function(error,position){
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

businessBannerListForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'businessBannerList'});
}

export { businessBannerListForm }