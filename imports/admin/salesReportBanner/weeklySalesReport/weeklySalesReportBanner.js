import { moment } from "meteor/momentjs:moment";
// import { Orders } from '../../../../api/orderMaster.js';
import { Payment } from '../../../api/paymentMaster.js';

import './weeklySalesReportBanner.html';
import '../searchBannerReport.js';

// Template.weeklySalesReportBanner.onRendered(function(){
// 	var today = moment().format("MM-DD-YYYY");
//     var weeknumber = moment(today).week();
// 	if(weeknumber<=9){
// 		weeknumber="0"+weeknumber;
// 	}
// 	var yyyy = moment(new Date()).format("YYYY");
// 	var weekVal = yyyy+"-W"+weeknumber;
// 	// 2018-W35
// 	console.log('weekVal===',weekVal);
// 	console.log('week===',yyyy);
// 	// console.log(Session.set("selectedWeek",weekVal));
// 	Session.set("selectedWeek",weekVal);
// });

var totalRec = 0;
Template.weeklySalesReportBanner.helpers({

	'currentweek' : function(){
		var sessionWeek = Session.get('selectedWeek');//Expecting "2017-W01" type of format

		if(sessionWeek){

			var weekVal = sessionWeek;

		}else{
			var today = moment().format("MM-DD-YYYY");
		    var weeknumber = moment(today).week();
			if(weeknumber<=9){
				weeknumber="0"+weeknumber;
			}
			var yyyy = moment(today).format("YYYY");
			var weekVal = yyyy+"-W"+weeknumber;
			Session.set("selectedWeek",weekVal);
		}
		// console.log(weekVal);
		return weekVal;

	},

	'result' : function(){
		var listLimit = Session.get('reportWeeklyBannerListLimit');
		var weekNumFromSess = Session.get("selectedWeek");
		// console.log(weekNumFromSess);
		// Like 2017-W01 for Week #1 of 2017
		// First / Get monday of date using the Week#
		var mondayInWeek = moment(weekNumFromSess).day("Monday").week(weekNumFromSess).format();
		// console.log(mondayInWeek);
		var mondayInWeekDt = new Date(mondayInWeek);
		var sundayOfWeek = moment(mondayInWeek).add(7,"days").format();
		var sundayOfWeekDt = new Date(sundayOfWeek);

		if(listLimit){
			var ordersData = Payment.find({'orderType':'Banner','paymentDate':{$gte: mondayInWeekDt, $lt: sundayOfWeekDt}},{limit: listLimit}).fetch();
		}else{
			var ordersData = Payment.find({'orderType':'Banner','paymentDate':{$gte: mondayInWeekDt, $lt: sundayOfWeekDt}}).fetch();
		}
	 	
	 	totalRec = ordersData.length;
	 	if (totalRec > 10) {
	    	$('.loadMoreRows50WeeklyBanner').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 50){
			$('.loadMoreRows100WeeklyBanner').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 100){
			$('.loadMoreRowsRestWeeklyBanner').addClass('showMore50').removeClass('hideMore50'); 
		}else{
			$('.loadMoreRows50WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRows100WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRowsRestWeeklyBanner').removeClass('showMore50').addClass('hideMore50');
		}

		if(listLimit){
			if(totalRec > listLimit){
				if (totalRec > 10) {
			    	$('.loadMoreRows50WeeklyBanner').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 50){
					$('.loadMoreRows100WeeklyBanner').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 100){
					$('.loadMoreRowsRestWeeklyBanner').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestWeeklyBanner').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				$('.loadMoreRows50WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestWeeklyBanner').removeClass('showMore50').addClass('hideMore50');
				$('.spinner').hide();
			}
		}
	 	if(ordersData){
	        var allOrders = [];
	        var dateCount = 0;
	        var tempdate = '1/1/1';

	        for(i=0; i < totalRec; i++){
	          var quantityTotal = 0;
	          var d = ordersData[i].paymentDate;
	          var t = d.toLocaleDateString('en-IN');
	          if (t == tempdate) {
	                    dateCount++;
	          }

	            allOrders[i] = {
					"orderId"       	: ordersData[i]._id ,
					"businessLink"   	: ordersData[i].businessLink ,
					"orderNo"       	: ordersData[i].orderNumber,
					"discountPercent" : ordersData[i].discountPercent,
		            "invoiceNo"       : ordersData[i].invoiceNumber,
					"date"          	: t ,
					"discountedPrice" : ordersData[i].discountedPrice,
					"totalAmount" 	: ordersData[i].totalAmount,
					"totalDiscount" 	: ordersData[i].totalDiscount,
					"orderType" 		: ordersData[i].orderType,
					"totalQuantity" 	: 0,
					"rowSpanCount"  	: 0,
	            }

	          var totalProdQty = totalRec;
	          for(j=0 ; j<totalProdQty; j++){
	            quantityTotal += parseInt(ordersData[i]);

	          }

	          allOrders[i].totalQuantity = parseInt(quantityTotal);
	            if(t != tempdate){
	              var rowSpan = dateCount;
	              allOrders[i-rowSpan].rowSpanCount = rowSpan;
	              tempdate = t;
	              dateCount = 1;
	            }

	        }//for Loop
	        var rowSpan = dateCount;
	        allOrders[i-rowSpan].rowSpanCount = rowSpan;
	        return allOrders;
	    } //if
	}


});

Template.weeklySalesReportBanner.events({
	'change #weekpicker':function(event){
		event.preventDefault();
		var selectedWeek = $("input#weekpicker").val();
		Session.set('selectedWeek',selectedWeek);
	},

	'click #nextWeek':function(event){
		event.preventDefault();
		var selectedWeek = $("input#weekpicker").val();
		var newWeekDt = moment(selectedWeek).add(1, 'weeks').format("YYYY-MM-DD");
		var newWeekNumber = moment(newWeekDt).week();
		//Construct the WeekNumber string as '2017-W01'
		if(newWeekNumber <= 9){
			newWeekNumber = '0'+newWeekNumber;
		}
		var yearNum=moment(newWeekDt).format("YYYY");
		var newWeek = yearNum+"-W"+newWeekNumber;

		Session.set('selectedWeek', newWeek);
	},

	'click #previousWeek':function(event){
		event.preventDefault();
		var selectedWeek = $("input#weekpicker").val();
		var newWeekDt = moment(selectedWeek).subtract(1, 'weeks').format("YYYY-MM-DD");
		var newWeekNumber = moment(newWeekDt).week();
		//Construct the WeekNumber string as '2017-W01'
		if(newWeekNumber <= 9){
			newWeekNumber = '0'+newWeekNumber;
		}else if(newWeekNumber == 53){
			newWeekNumber = 52;
		}
		var yearNum=moment(newWeekDt).format("YYYY");
		var newWeek = yearNum+"-W"+newWeekNumber;

		Session.set('selectedWeek', newWeek);
	},

	'click .loadMoreRows50WeeklyBanner': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50WeeklyBanner .spinner').show();
		var nextLimitBus50 = totalRec+50;
		Session.set('reportWeeklyBannerListLimit',nextLimitBus50);
	},

	'click .loadMoreRows100WeeklyBanner': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100WeeklyBanner .spinner').show();
		var nextLimitBus100 = totalRec+100;
		Session.set('reportWeeklyBannerListLimit',nextLimitBus100);
	},

	'click .loadMoreRowsRestWeeklyBanner': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRestWeeklyBanner .spinner').show();
		var nextLimit = totalRec;
		Session.set('reportWeeklyBannerListLimit',nextLimit);
		$('.loadMoreRows50WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100WeeklyBanner').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestWeeklyBanner').removeClass('showMore50').addClass('hideMore50');
		$('.spinner').hide();
	},
});

Template.weeklySalesReportBanner.onRendered(function(){
	Session.set("selectedWeek",false);
});