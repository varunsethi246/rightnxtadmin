import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Business } from '/imports/api/businessMaster.js';
import { Area } from '/imports/api/masterData/areaMaster.js';
import { City } from '/imports/api/masterData/cityMaster.js';
import { State } from '/imports/api/masterData/stateMaster.js';
import { CompanySettings } from '/imports/api/companysettingsAPI.js';
import { BusinessBanner } from '/imports/api/businessBannerMaster.js';
import { BusinessAds } from '/imports/api/businessAdsMaster.js';
import { AdsDiscount } from '/imports/api/discountMaster.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { AdsPosition } from '/imports/api/discountMaster.js';
import { Payment } from '/imports/api/paymentMaster.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './adsInvoice.html';
import './businessAds.html';
import './businessAdsList.html';
import './businessAdsList.js';
import './positionAndDiscountManagement/adsManagement.js';
import '/imports/admin/commonAdmin/commonAdmin.js';

var options = {
  keepHistory: 0,
  localSearch: false
};
var fields2 = ['businessTitle'];
adsBussinessSearch1 = new SearchSource('adsBusiness', fields2, options);

var fields2 = ['area'];
areaAdsSearch1 = new SearchSource('adsArea', fields2, options);

var selectedAdsCategories = [];
var fields = ['level0', 'level1', 'level2','level3','level4'];
adsCategorySearch1 = new SearchSource('adsCategories', fields, options);
// var dataIndex = 0;

Template.businessAds.onRendered(function(){
	// To set Current Date plus One Day to Input Field
	var currentdate = new Date();
	var startDate = moment(currentdate);
    var setDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    $('#dateCurrent').val(setDate);

    // var startDate = moment(setDate);
    var futureMonth = moment(setDate).add(1, 'M').format('YYYY-MM-DD');
    $('.enddate').val(futureMonth);
});
Template.businessAds.onCreated(function () {
	Session.set("adsBusinessLink",null);
	// Session.set("businessLink",null);
	Session.set('areaAdsArray',null);
	Session.set("addAdsCategory",null);
	Session.set('catgAdsArray',null);
	Session.set('addadsStateSess',null);
   	Session.set("addadsCitySess",null);
});

Template.businessAds.helpers({
	getAdsbusiness: function() {
		var state = Session.get("addadsStateSess");
	    var city = Session.get("addadsCitySess");

	    if(state && city && state!="--Select--" && city!="--Select--"){
	    	return adsBussinessSearch1.getData();
	    }
  	},
  	getAdscategory: function() {
	    var data =  adsCategorySearch1.getData();
	    data = _.uniq(data, function(p){ return p.level1; });
	    // console.log("data: ",data);
	    return data;
  	},
  	ifDashData: function(content){
  		if(content == '--'){
  			return false;
  		}
  		else
  			return true;
  	},
  	selectedAdsCategories: function(){
  		// var catgArray = Session.get('catgAdsArray');
  		//updated code
  		var catgArray = Session.get('catgoryAdsArray');
  		return catgArray;
  	},
  	getAdsArea: function() {
  		var areaArray = [];
		var areaList = [];
		var areas = areaAdsSearch1.getData();
		// console.log(areas);
		if(areas){
		    for(var i=0;i<areas.length;i++){
		      areaArray.push({'area':areas[i].area})
		    }//i
		    var pluck = _.pluck(areaArray, 'area');
		    data = _.uniq(pluck);
		    // console.log('data ...',data);

		    if(data.length>0){
		      for(var j=0;j<data.length;j++){
		          var uniqueArea = data[j];
		          var areaLists = Area.findOne({'area':uniqueArea});
		          if(areaLists){
		            areaList.push({
		                          'area'    : uniqueArea,
		                          'country' : areaLists.country,
		                          'state'   : areaLists.state,
		                          'city'    : areaLists.city,
		                          'zipcode' : areaLists.zipcode,
		                          'status'  : areaLists.status,
		                        });
		          }
		      }//j
		    }//length
		}
		areaList.sort(function(a, b) {
		    var textA = a.area.toUpperCase();
		    var textB = b.area.toUpperCase();
		    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});

        return areaList;

		//old code of area
	    // return areaAdsSearch1.getData({
	    //   	docTransform: function(doc) {
		   //      return _.extend(doc, {
		   //        	owner: function() {
		   //          	return Area.find({status :"active"})
		   //      	}
		   //      })
	    //   },
	    //   sort: {isoScore: -1}
	    // }, true);
	},
	selectedAdsAreas(){
  		var areaArray = Session.get('areaAdsArray');
  		return areaArray; 
  	},
  	// businessRankEqualToa(businessRow){
  	// 	if(businessRow == 1){
  	// 		return true;
  	// 	}else{
  	// 		return false;
  	// 	}
  	// },
  	states(){
  		var states = State.find({"country":"India","status":"active"}).fetch();
        if(states){
         	states.sort(function(a, b) {
			    var textA = a.states;
			    var textB = b.states;
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
            return states;
        }
  	},

  	cities(){
      	var adsState = Session.get("addadsStateSess");
      	if(adsState){
	  		var cities = City.find({"country":"India","state":adsState,"status":"active"}).fetch();
	        console.log(cities);
	        if(cities){
				cities.sort(function(a, b) {
				    var textA = a.cities;
				    var textB = b.cities;
				    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});
	            return cities;
	        }
	    }
  	},

  	disableArea(){
  		var businessLink = Session.get("adsBusinessLink");
  		if(businessLink){
  			var businessObj = Business.findOne({'businessLink':businessLink});
  			if(businessObj){
  				if(businessObj.businessArea){
  					// console.log(businessObj.businessArea);
			  		return businessObj.businessArea;
  				}
  			}
  		}
  	},

  	'businessAdsCategories':function(){
  		var businessLink = Session.get("adsBusinessLink");
  		var categoryArray = []; 
  		var newCatgArray = []; 
    	if(businessLink){
	  		var businessDetails = Business.findOne({'businessLink':businessLink});
 	  		if(businessDetails){
	   			if(businessDetails.businesscategories.length > 0){
	 	  			var busCatLength = businessDetails.businesscategories.length;
	 	  			// Category Loop
	   				for(var i=0; i <busCatLength ; i++){
	   					var buscategoryVal = businessDetails.businesscategories[i];
	   					// First check if the category value already been processed.
	   					// if yes, then skip this category processing.
	   					var catgAlreadyProcessed = false;

	   					if(buscategoryVal != ""){
	 	  					var split = buscategoryVal.split(">");
		  					var category = split[1];  					
							var categoryVal = category.trim();

		   					if(categoryArray.length > 0){
			   					for(j=0; j<categoryArray.length; j++){
								    if (categoryArray[j].category == categoryVal) {
								        catgAlreadyProcessed = true;
								        break;
								    }
			   					}	   						
		   					}

		   					if(!catgAlreadyProcessed){
								var categoryBusObj = {
									"category" : categoryVal,
									"businessArray" : [],
								};
								categoryArray.push(categoryBusObj);		   						
								newCatgArray.push(categoryVal);
		   					}

	 					}// if buscategoryVal

	 	  			}// for i loop


	   				//Add categories coming from "add Category" input field.
	 	  			if(Session.get("catgAdsArray")){
		   				catgAlreadyProcessed = false;
				    	var addCategory = Session.get("catgAdsArray");
				    	// console.log('helper addCategory: ', addCategory);
	   					if(categoryArray.length > 0){
		   					for(j=0; j<categoryArray.length; j++){
		   						for(k=0; k<addCategory.length; k++){
								    if(categoryArray[j].category == addCategory[k]) {
								        catgAlreadyProcessed = true;
								        break;
								    }		   							
		   						}
		   						if(catgAlreadyProcessed){break;}
		   					}	   						
	   					}

	   					if(!catgAlreadyProcessed){
	   						for(k=0; k<addCategory.length; k++){
								var categoryBusObj = {
									"category" : addCategory[k],
									"businessArray" : [],
								};
								categoryArray.push(categoryBusObj);
								newCatgArray.push(categoryVal);
							}
	   					}

	 	  			}
					Session.set('catgoryAdsArray',newCatgArray);
	 	  		}//businessDetails.businesscategories
	 	  		// Session.set('businessUrl', businessurl);
 	  		}//businessDetails
	   		
    	}//businessId
 
    	if(categoryArray.length > 0){
    		for(i=0;i<categoryArray.length;i++){
		    	var pos = 0;
    			for(j=0;j<12;j++){
    				var businessName = '';
    				var status = '';

    				// if(j%3 == 0){
	    			// 	var businessRow = true;
	    			// 	// pos = parseInt(j) + 1;
    				// }else{
	    			// 	var businessRow = false;
    				// }
	    			pos = parseInt(j) + 1;


    				var businessPosition = pos.toString();
    				var selector = {
    								 "position"  	: businessPosition,
									 "category" 	: categoryArray[i].category, 
									 // "rank" 		: businessRank,
									 "status" 		: {$in : ['active','new']},
									};
					// console.log('selector = ',selector);

    				// var businessBanner = BusinessBanner.findOne(selector);
    				var businessAds = BusinessAds.findOne(selector);

					if(businessAds){
						// console.log('businessAds = ',businessAds);
						businessName = businessAds.businessTitle;
						status = businessAds.status;
					}    				

    				if(businessName == '') {
    					var className = "blankRow";
    				}else{
    					var className = "contentRow";
    				}


    				var businessArrayObj = {
    					"businessName" 		: businessName,
    					"businessPosition" 	: pos,
    					// "businessRow" 		: businessRow,
    					"className"			: className,
    					"status"			: status,
    				}
    				categoryArray[i].businessArray.push(businessArrayObj);
    			}
	    	}
    	}
		
 	  	return categoryArray; 
  	},
  	selectedAdsCategoryPayment(){		

  		var businessLink = Session.get("adsBusinessLink");
  		

    	var businessAds = BusinessAds.find({"businessLink":businessLink,"status":"new"}).fetch();
    	if(businessAds){
    		for(i=0;i<businessAds.length;i++){
    			if(businessAds[i].areas){
    				businessAds[i].numOfAreas=businessAds[i].areas.length;
    			}else{
    				businessAds[i].numOfAreas=0;
    			}
				var monthlyRate = AdsPosition.findOne({'position':parseInt(businessAds[i].position)});
				// console.log("monthlyRate: ",monthlyRate);

    			businessAds[i].monthlyRate 	= monthlyRate.rate;
				businessAds[i].totalAmount 	= parseInt(monthlyRate.rate) * parseInt(businessAds[i].areas.length) * parseInt(businessAds[i].noOfMonths);
    		}
    	}
		return businessAds;
  	},
  	states(){
  		var states = State.find({"country":"India","status":"active"}).fetch();
         if(states){
         	states.sort(function(a, b) {
			    var textA = a.states;
			    var textB = b.states;
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
            return states;
        }
  	},

  	cities(){
      	var bannerState = Session.get("addadsStateSess");
      	if(bannerState){
	  		var cities = City.find({"country":"India","state":bannerState,"status":"active"}).fetch();
	         if(cities){
				cities.sort(function(a, b) {
				    var textA = a.cities;
				    var textB = b.cities;
				    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});
	            return cities;
	        }
	    }else{
	    	return [];
	    }
  	},
});

Template.adsInvoice.events({
	'click .bannerPayButton': function(event){
		var currentLink = $(event.currentTarget).attr('data-busLink');
		var currentVal = $(event.currentTarget).siblings('.bannerPayButtonRadio').val();
		var current = window.location.host;
		if(currentVal == "online"){
			Meteor.call("updateAdsPaymentOnline",currentLink,current,(error, result)=>{
				if(result){
					window.location = result;
				}
			});
		}else{
			FlowRouter.go("/businessAdsList");
		}
	},
});


Template.adsInvoice.helpers({
	viewDisable(){
		var businessLink = FlowRouter.getParam('businessLink');
		var currentPath = FlowRouter.current().path;
		var paymentId = FlowRouter.getParam('paymentId');
		if(currentPath == '/businessAdsInvoice/'+businessLink+'/'+paymentId){
			return false;
		}else{
			return true;
		}
	},

	checkPaymentStatus(data){
		if(data == "paid"){
			return false;
		}else{
			return true;
		}
	},
	adsInvoiceData(){
		var id = FlowRouter.getParam('paymentId');
		var businessLink = FlowRouter.getParam('businessLink');
  		var businessDetails = Business.findOne({"businessLink":businessLink, "status":"active"});
  		var businessAdsArray = [];
  		if(id){
			var paymentCheck = Payment.find({"_id":id}).fetch();
  		}else{
			var paymentCheck = Payment.find({"businessLink":businessLink,"orderType":"Ads",'paymentStatus':'unpaid'}).fetch();
  		}

		if(paymentCheck.length>0) {
			businessDetails.invoiceNumber 	= paymentCheck[0].invoiceNumber;
	    	businessDetails.discountPercent = paymentCheck[0].discountPercent;
	    	businessDetails.totalDiscount 	= paymentCheck[0].totalDiscount;
	    	businessDetails.discountedPrice = paymentCheck[0].discountedPrice;
	   //  	if(paymentCheck[0].paymentStatus == 'unpaid'){
				// businessDetails.invoiceDate = moment(paymentCheck[0].invoiceDate).format('DD/MM/YYYY');
	   //  	}else{
				// businessDetails.invoiceDate = moment(paymentCheck[0].paymentDate).format('DD/MM/YYYY');
	   //  	}
			businessDetails.invoiceDate = moment(paymentCheck[0].invoiceDate).format('DD/MM/YYYY');

			var totalPrice = 0;
			if(paymentCheck[0].businessAds){
				if(paymentCheck[0].businessAds.length > 0){
					for (var i = 0; i < paymentCheck[0].businessAds.length; i++) {
	    				var businessAds = BusinessAds.findOne({"_id":paymentCheck[0].businessAds[i].businessAdsId});
						if(businessAds){
			    			if(businessAds.areas){
			    				var numOfAreas=businessAds.areas.length;
			    			}else{
			    				var numOfAreas=0;
			    			}
							var monthlyRate = AdsPosition.findOne({'position':parseInt(businessAds.position)});
			    			if(monthlyRate){
				    			var monthlyRate1 	= monthlyRate.rate;
								var totalAmount 	= parseInt(monthlyRate.rate) * parseInt(businessAds.areas.length) * parseInt(businessAds.noOfMonths);
				    			totalPrice= totalPrice + totalAmount;
			    			}
			    			businessAdsArray.push({
			    				'numOfAreas'  : numOfAreas,
			    				'monthlyRate' : monthlyRate1,
			    				'totalAmount' : totalAmount,
			    				'totalPrice'  : totalPrice,
			    				'category'	  : businessAds.category,
			    				'position'	  : businessAds.position,
			    				'noOfMonths'  : businessAds.noOfMonths,
			    			});
				    	}			
					}
				}
			}
	  		// if(id){
	    // 		var businessAds = BusinessAds.find({"businessLink":businessLink}).fetch();
	    // 	}else{
	    // 		var businessAds = BusinessAds.find({"businessLink":businessLink,"status":"new"}).fetch();
	    // 	}
	    // 	if(businessAds){
	    // 		for(i=0;i<businessAds.length;i++){
	    // 			if(businessAds[i].areas){
	    // 				businessAds[i].numOfAreas=businessAds[i].areas.length;
	    // 			}else{
	    // 				businessAds[i].numOfAreas=0;
	    // 			}
					// var monthlyRate = AdsPosition.findOne({'position':parseInt(businessAds[i].position)});
	    // 			businessAds[i].monthlyRate 	= monthlyRate.rate;
					// businessAds[i].totalAmount 	= parseInt(monthlyRate.rate) * parseInt(businessAds[i].areas.length) * parseInt(businessAds[i].noOfMonths);
	    // 			totalPrice= totalPrice + businessAds[i].totalAmount;
	    // 		}
	    // 	}

		}else{
			businessDetails.invoiceNumber = 'None';
		}

		var companyDetails 	= CompanySettings.findOne({'companyId':101});

		if(companyDetails){
			businessDetails.companyName = companyDetails.companyName;
			businessDetails.companyAddress = companyDetails.companyLocationsInfo[0].companyAddress;
			businessDetails.companyCity = companyDetails.companyLocationsInfo[0].companyCity;
			businessDetails.companyState = companyDetails.companyLocationsInfo[0].companyState;
			businessDetails.companyPincode = companyDetails.companyLocationsInfo[0].companyPincode;
		}

    	businessDetails.totalPrice = totalPrice;
    	businessDetails.businessAds = businessAdsArray;
		return businessDetails;
	},
});





Template.businessAds.events({
	'change #dateCurrent': function(event){
		var changeFromDate = new Date(event.currentTarget.value);
		var months = $('#adsMonth').val();
		if(months){
			var numOfMonths = months;
		}else{
			var numOfMonths = 1;
		}

		var result = moment(changeFromDate).add(numOfMonths, 'months');
		var newToDate = moment(result).format('YYYY-MM-DD');
		$('#adsEndDate').val(newToDate);
	},
	'change .addadsState':function(event){
		event.preventDefault();
		var state = $(".addadsState").val();
      	Session.set("addadsStateSess",state);

      	var myFuncVar = $(".addadsState").val();
      	// console.log(state,myFuncVar);
        if (myFuncVar==null||myFuncVar==""||myFuncVar=='--Select--') {
            $(".SpanAdsBusinessState").addClass("ErrorRedText");
            $(".addadsState").addClass("SpanLandLineRedBorder");
            $( ".SpanAdsBusinessState" ).text("Please select Valid State" );
        } else {
            $(".SpanAdsBusinessState").removeClass("ErrorRedText");
            $(".SpanAdsBusinessState").text("");
            $(".addadsState").removeClass("SpanLandLineRedBorder");
        }
	},

	'change .addadsCity':function(event){
		event.preventDefault();
		var city = $(".addadsCity").val();
      	Session.set("addadsCitySess",city);

      	var myFuncVar = $(".addadsCity").val();
      	// console.log(city,myFuncVar);
        if (myFuncVar==null||myFuncVar==""||myFuncVar=='--Select--') {
	        $(".SpanAdsBusinessCity").addClass("ErrorRedText");
	        $(".addadsCity").addClass("SpanLandLineRedBorder");
	        $( ".SpanAdsBusinessCity" ).text("Please Enter Valid City" );
	    } else {
	        $(".SpanAdsBusinessCity").removeClass("ErrorRedText");
	        $(".SpanAdsBusinessCity").text("");
	        $(".addadsCity").removeClass("SpanLandLineRedBorder");
	    }
	},
	
	'click .adsButton':function(event){
		event.preventDefault();
		var invoiceNumber 	= Counts.get('noOfInvoiceCount')+1;
		var businessLink 	= Session.get("adsBusinessLink");
		var businessData 	= Business.findOne({"businessLink":businessLink, "status":"active"});
		var businessAdsArr = [];
		if (businessData) {
			var totalPrice 		= 0;
	    	var businessAds 	= BusinessAds.find({"businessLink":businessLink,"status":"new"}).fetch();
	    	
	    	if(businessAds){
	    		for(var i=0;i<businessAds.length;i++){
	    			businessAdsArr.push({"businessAdsId": businessAds[i]._id});
	    			if(businessAds[i].areas){
	    				businessAds[i].numOfAreas=businessAds[i].areas.length;
	    			}else{
	    				businessAds[i].numOfAreas=0;
	    			}
					var monthlyRate = AdsPosition.findOne({'position':parseInt(businessAds[i].position)});

	    			businessAds[i].monthlyRate 	= monthlyRate.rate;
					businessAds[i].totalAmount 	= parseInt(monthlyRate.rate) * parseInt(businessAds[i].areas.length) * parseInt(businessAds[i].noOfMonths);
	    			totalPrice= totalPrice + businessAds[i].totalAmount;
	    		}
	    	}

	    	var discountData = AdsDiscount.find({}).fetch();
			// To sort an discount percent array by price
			function sortArrOfObjectsByParam(a, b) {
			  const genreA = parseInt(a.price);
			  const genreB = parseInt(b.price);
			  let comparison = 0;
			  if (genreA > genreB) {
			    comparison = 1;
			  } else if (genreA < genreB) {
			    comparison = -1;
			  }
			  return comparison;
			}
			discountData.sort(sortArrOfObjectsByParam);

			var discountPercent = 0;
			if(discountData){
				for(var i=0;i<discountData.length;i++){
					if(totalPrice>discountData[i].price){
						discountPercent = discountData[i].discount;
					}
				}
			}

			var totalDiscount = totalPrice*(discountPercent/100)
			var discountedPrice = totalPrice-totalDiscount;

			formValues = {
				'vendorId' 			: 	businessData.businessOwnerId,
				'businessId' 		: 	businessData._id,
				'businessLink' 		: 	businessLink,
				'invoiceNumber'		: 	invoiceNumber,
				'totalAmount'		:	totalPrice,
				'discountPercent'	: 	discountPercent,
				'totalDiscount'		: 	totalDiscount,
				'discountedPrice'	: 	discountedPrice,
				'businessAds' 		: 	businessAdsArr,
			}

			var paymentCheck = Payment.find({"businessLink":businessLink,"orderType":'Ads','paymentStatus':'unpaid'}).fetch();
			// console.log('paymentCheck',paymentCheck);
			if(paymentCheck.length>0) {
				formValues.invoiceNumber = paymentCheck[0].invoiceNumber;
				Meteor.call('updateAdsPayment', formValues, function(error,position){
					if(error){
						console.log('Error occured while updating Business Banner: ', error);
					}else{
						if(formValues.totalAmount>0){
							FlowRouter.go('/businessAdsInvoice/:businessLink',{'businessLink':businessLink});
						}
						// console.log('Business Banner payment information added successfully');
					}
				});
			} else{
				Meteor.call('insertAdsPayment', formValues, function(error,position){
					if(error){
						console.log('Error occured while inserting Business Banner: ', error);
					}else{
						if(formValues.totalAmount>0){
							FlowRouter.go('/businessAdsInvoice/:businessLink',{'businessLink':businessLink});
						}
					}
				});
			}
		}else{
			console.log('error')
			Bert.alert( 'Please provide all data!', 'danger', 'growl-top-right' );
		}
	},
	'keydown #business': function(e){
        var state = Session.get("addadsStateSess");
	    var city = Session.get("addadsCitySess");
	    // console.log('state,city',city,state);
		if(!state||!city||state=="--Select--"||city=="--Select--"){
			e.preventDefault();
		}
    },
	"keyup #business": _.throttle(function(e) {
	    var searchText = $(e.target).val().trim();
	    var state = Session.get("addadsStateSess");
	    var city = Session.get("addadsCitySess");
	    // var area = $('.addbannerArea').val();

	    if(state && city && state!="--Select--" && city!="--Select--" && searchText){
	    	var searchTxt = state + '|' + city + '|' + 'undefined' + '|' + searchText;
	    	// console.log('searchTxt',searchTxt);
	    	if(searchTxt){
	    		// bannerBussinessSearch1.search(searchTxt);		    
	    		adsBussinessSearch1.search(searchText);		    
	    	}
	    }
	}, 200),

	"keyup #getAdsCategory": _.throttle(function(e) {
	    var text = $(e.target).val().trim();
	    adsCategorySearch1.search(text);
	}, 200),

	"keyup #area": _.throttle(function(e) {
	    var areaVal = $(e.target).val().trim();
	    var areaCity = Session.get("busAdsAreaCity");
	    var text = areaVal + '|' + areaCity;
	    areaAdsSearch1.search(text);		    
	}, 200),

	'change #business': function(event){
		var selectedOption = event.currentTarget.value;
		if(selectedOption){
			var splitOption = selectedOption.split('|');

			var title    = splitOption[0].trim();
			var splitBusinessLink = splitOption[1].split('/');
			var businessLink = splitBusinessLink[1].trim();
			Session.set("adsBusinessLink",businessLink);

			// Add Area of business from address
			var businessData 	= Business.findOne({"businessLink":businessLink, "status":"active"});
			var businessArea = [];
			if(businessData){
				Session.set("busAdsAreaCity",businessData.businessCity);
				var busArea = businessData.businessArea;
				businessArea = [busArea];
			}
			Session.set('areaAdsArray',businessArea);
		}else{
			Session.set('catgAdsArray',null);
			Session.set('areaAdsArray',null);
			Session.set("addadsStateSess",'--Select--');
		    Session.set("addadsCitySess",null);
			Session.set("adsBusinessLink",null);
			$('.addadsState').val('--Select--');
		}
	},
	'change #getAdsCategory': function(event){
		var val = event.currentTarget.value;
	    var opts = document.getElementById('adsSearchCat').childNodes;
	    for (var i = 0; i < opts.length; i++) {
	        if (opts[i].value === val) {
	        	var selectedCatg = event.currentTarget.value;
				Session.set("addAdsCategory",selectedCatg);

				if(Session.get('catgAdsArray')){
					var catgAdsArray = Session.get('catgAdsArray');
				}else{
					var catgAdsArray = [];
				}		
				catgAdsArray.push(selectedCatg);	
				Session.set('catgAdsArray',catgAdsArray);
				$('#getAdsCategory').val('');
	        	break;
	        }
	    }

		// var selectedCatg = event.currentTarget.value;
		// Session.set("addAdsCategory",selectedCatg);

		// if(Session.get('catgAdsArray')){
		// 	var catgAdsArray = Session.get('catgAdsArray');
		// }else{
		// 	var catgAdsArray = [];
		// }		
		// catgAdsArray.push(selectedCatg);	
		// Session.set('catgAdsArray',catgAdsArray);
		// $('#getAdsCategory').val('');
	},
	'focusout .getAdsmonth':function(event){
		var month = $('.getAdsmonth').val(); 
		var startDate = moment($('.getAdsdate').val());
        var futureMonth = moment(startDate).add(month, 'M').format('YYYY-MM-DD');
		$('.enddate').val(futureMonth);
	},
	'focusout .getAdsdate':function(event){
		var month = $('.getAdsmonth').val(); 
		var startDate = moment($('.getAdsdate').val());
        var futureMonth = moment(startDate).add(month, 'M').format('YYYY-MM-DD');
		$('.enddate').val(futureMonth);
	},
	'change .getAdsArea': function(event){
		var val = event.currentTarget.value;
	    var opts = document.getElementById('searchAdsArea').childNodes;
	    for (var i = 0; i < opts.length; i++) {
	        if (opts[i].value === val) {
	        	var selectedArea = event.currentTarget.value;
				if(Session.get('areaAdsArray')){
					var areaAdsArray = Session.get('areaAdsArray');
				}else{
					var areaAdsArray = [];
				}		
				areaAdsArray.push(selectedArea);	
				Session.set('areaAdsArray',areaAdsArray);
				$('.getAdsArea').val('');
	        	break;
	        }
	    }

		// var selectedArea = event.currentTarget.value;
		// if(Session.get('areaAdsArray')){
		// 	var areaAdsArray = Session.get('areaAdsArray');
		// }else{
		// 	var areaAdsArray = [];
		// }		
		// areaAdsArray.push(selectedArea);	
		// Session.set('areaAdsArray',areaAdsArray);
		// $('.getAdsArea').val('');
	},
	'click .bunchCatCross':function(event){
		var selectedCategories = Session.get('catgAdsArray');
		$(event.currentTarget).parent().remove();
		var catText = $(event.currentTarget).parent().clone().children().remove().end().text().trim();
		var posCat = jQuery.inArray( catText, selectedCategories );
		selectedCategories.splice(posCat,1);
		Session.set('catgAdsArray',selectedCategories);
	},
	'click .bunchAreaCross':function(event){
		var selectedAreas = Session.get('areaAdsArray');
		$(event.currentTarget).parent().remove();
		var areaText = $(event.currentTarget).parent().clone().children().remove().end().text().trim();
		var posArea = jQuery.inArray( areaText, selectedAreas );
		selectedAreas.splice(posArea,1);
		Session.set('areaAdsArray',selectedAreas);
	},
	'click .blankRow': function(event){
		// console.log("event.currentTarget :",$(event.currentTarget).siblings('.new-banner'));
		
		var busTitle 			= $("#business").val();
		var splitOption 		= busTitle.split('|');
		var title    			= splitOption[0].trim();
		var splitBusinessLink 	= splitOption[1].split('/');
		var businessLink 		= splitBusinessLink[1].trim();

		var dataCatg 	= $(event.currentTarget).attr('data-catg');
		var dataPos 	= $(event.currentTarget).attr('data-position');
		// var dataRank 	= $(event.currentTarget).attr('data-rank');

		//First verify whether this business is already added to this category.
		//If yes, then delete from banner table and then insert
		var checkAds = BusinessAds.findOne({
													"businessLink" : businessLink,
													"category"     : dataCatg,
												}); 

		var checkAdsActive = BusinessAds.findOne({
			"businessLink" : businessLink,
			"category"     : dataCatg,
			"status"	   : "active",
		}); 

		if(checkAds&&!checkAdsActive){
			Meteor.call('removeBusinessAdsAll', businessLink, dataCatg, 
						function(error,position){
								if(error){
									console.log('Error occured while removing Business Banner: ', error);
								}else{
									// console.log('Business Banner successfully removed');
								}
						});

		}


		var areaNames =[];
		if(Session.get('areaAdsArray')){
			areaNames = Session.get('areaAdsArray');
		}else{
			areaNames = [];
		}

		// console.log("$('.startAdsDate').val():" ,$('.startAdsDate').val());
		// console.log("$('.getAdsmonth').val():" ,$('.getAdsmonth').val());

		var formValues = {
			"businessLink" 	: businessLink,
			"category" 		: dataCatg,
			"position" 		: dataPos,
			// "rank" 			: dataRank,
			"startDate" 	: $('.startAdsDate').val(),
			"endDate" 		: $('.enddate').val(),
			"noOfMonths"	: $('.getAdsmonth').val(),
			"selectedAreas" : areaNames, 
		}
		
		// if(Session.get('paymentBannerTable')){
		// 	var payTableArray = Session.get('paymentBannerTable');
		// }else{
		// 	var payTableArray = [];
		// }	
		// payTableArray.push(formValues);	
		// Session.set('paymentBannerTable',payTableArray);
		if(!checkAdsActive){
			Meteor.call('insertBusinessAds',formValues,function(error,result){
				if (error) {
					console.log('Error in Business Banners Insert: ', error);
				}else{
					// console.log('Data for category: '+dataCatg+' inserted successfully');
				}
			});
		}
		

	},

	'click .contentRow': function(event){
		var dataCatg = $(event.currentTarget).attr('data-catg');
		var dataPos 	= $(event.currentTarget).attr('data-position');
		// var dataRank 	= $(event.currentTarget).attr('data-rank');

		var busTitle 	= $("#business").val();
		var splitOption = busTitle.split('|');
		var splitBusinessLink = splitOption[1].split('/');
		var businessLink = splitBusinessLink[1].trim();

		var checkAdsActive = BusinessAds.findOne({
			"businessLink" : businessLink,
			"category"     : dataCatg,
			"status"	   : "active",
		}); 

		if(!checkAdsActive){
			Meteor.call('removeBusinessAds', businessLink, dataCatg, dataPos, function(error,position){
				if(error){
					console.log('Error occured while removing Business Banner: ', error);
				}else{
					// console.log('Business Banner successfully removed');
				}
			});
		}
		
	},

});
businessAdsForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'businessAds'});
}

export { businessAdsForm }

adsInvoiceForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'adsInvoice'});
}

export { adsInvoiceForm }
