import { moment } from "meteor/momentjs:moment";
// import { Orders } from '../../../../api/orderMaster.js';
import { Template } from 'meteor/templating';
import { Payment } from '../../../api/paymentMaster.js';

import './monthlySalesReport.html';
import '../searchAdsReport.js';

var totalRec = 0;
Template.monthlySalesReport.helpers({

	'currentmonth' : function(){
		var monthSession = Session.get('selectedMonth');
		if(monthSession){
			var currentMonth = monthSession;
		}	else{
			var today = moment().startOf('month');
			var yyyy = moment(today).format("YYYY");
		    var monthNum = moment(today).format("MM");
		    var currentMonth = yyyy+"-"+monthNum;
			Session.set("selectedMonth",currentMonth);
			}
		return currentMonth;
	},

	'result' : function(){
		var listLimit = Session.get('reportMonthlyAdsListLimit');
		var monthDateFromSess = Session.get("selectedMonth");
	  	var monthDateStart = new Date(moment(monthDateFromSess).month("YYYY-MM"));//Find out first day of month with selectedMonth
	  	var monthDateToSess = new Date(moment(monthDateFromSess).add(1,"M"));
 		
 		if(listLimit){
			var ordersData = Payment.find({'orderType':'Ads','paymentDate':{$gte: monthDateStart,$lt: monthDateToSess}},{limit: listLimit}).fetch();
		}else{
			var ordersData = Payment.find({'orderType':'Ads','paymentDate':{$gte: monthDateStart,$lt: monthDateToSess}}).fetch();
		}
		// console.log("ordersData",ordersData);
		totalRec = ordersData.length;
		if (totalRec > 10) {
	    	$('.loadMoreRows50MonthlyAds').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 50){
			$('.loadMoreRows100MonthlyAds').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 100){
			$('.loadMoreRowsRestMonthlyAds').addClass('showMore50').removeClass('hideMore50'); 
		}else{
			$('.loadMoreRows50MonthlyAds').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRows100MonthlyAds').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRowsRestMonthlyAds').removeClass('showMore50').addClass('hideMore50');
		}

		if(listLimit){
			if(totalRec > listLimit){
				if (totalRec > 10) {
			    	$('.loadMoreRows50MonthlyAds').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 50){
					$('.loadMoreRows100MonthlyAds').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 100){
					$('.loadMoreRowsRestMonthlyAds').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50MonthlyAds').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100MonthlyAds').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestMonthlyAds').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				$('.loadMoreRows50MonthlyAds').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100MonthlyAds').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestMonthlyAds').removeClass('showMore50').addClass('hideMore50');
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
		              "invoiceNo"       : ordersData[i].invoiceNumber,
		              "discountPercent" : ordersData[i].discountPercent,
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

	 		//for last element
    		var rowSpan = dateCount;
			allOrders[i-rowSpan].rowSpanCount = rowSpan;

	 		return allOrders;
	 	} //if
	}

});

Template.monthlySalesReport.events({

	'click #nextMonth':function(event){
		event.preventDefault();
		var selectedMonth = $("input#monthlyValue").val();
		var newMonthDt = moment(selectedMonth).add(1, 'months').format("YYYY-MM-DD");
		var newMonthNumber = moment(newMonthDt).format("MM");
		//Construct the WeekNumber string as 'YYYY-MM'
		var yearNum=moment(newMonthDt).format("YYYY");
		var newMonth = yearNum+"-"+newMonthNumber;

		Session.set('selectedMonth', newMonth);
	},

	'click #previousMonth':function(event){
		event.preventDefault();
		var selectedMonth = $("input#monthlyValue").val();

		var newMonthDt = moment(selectedMonth).subtract(1, 'months').format("YYYY-MM-DD");
		var newMonthNumber = moment(newMonthDt).format("MM");
		//Construct the WeekNumber string as 'YYYY-MM'
		var yearNum=moment(newMonthDt).format("YYYY");
		var newMonth = yearNum+"-"+newMonthNumber;

		Session.set('selectedMonth', newMonth);
	},

	'click .fapdf': function(event) {
		// var docDefinition = { content: 'My Text' };

		// pdfMake.createPdf(docDefinition).open();

		var doc = new jsPDF();

	    doc.fromHTML($('.monthlySalesReportForpdf').html(), 15, 15, {
	        'width': 170,
	            // 'elementHandlers': specialElementHandlers
	    });
	    doc.save('monthlySalesReport.pdf');

	},

	'click .loadMoreRows50MonthlyAds': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50MonthlyAds .spinner').show();
		var nextLimitBus50 = totalRec+50;
		Session.set('reportMonthlyAdsListLimit',nextLimitBus50);
	},

	'click .loadMoreRows100MonthlyAds': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100MonthlyAds .spinner').show();
		var nextLimitBus100 = totalRec+100;
		Session.set('reportMonthlyAdsListLimit',nextLimitBus100);
	},

	'click .loadMoreRowsRestMonthlyAds': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRestMonthlyAds .spinner').show();
		var nextLimit = totalRec;
		Session.set('reportMonthlyAdsListLimit',nextLimit);
		$('.loadMoreRows50MonthlyAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100MonthlyAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestMonthlyAds').removeClass('showMore50').addClass('hideMore50');
		$('.spinner').hide();
	},


});

Template.monthlySalesReport.onRendered(function(){
	Session.set("selectedMonth",false);
});
