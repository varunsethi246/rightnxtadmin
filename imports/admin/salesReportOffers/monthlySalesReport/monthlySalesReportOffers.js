import { moment } from "meteor/momentjs:moment";
// import { Orders } from '../../../../api/orderMaster.js';
import { Template } from 'meteor/templating';
import { Payment } from '../../../api/paymentMaster.js';

import './monthlySalesReportOffers.html';
import '../searchReports/searchOffersReport.js';

var totalRec = 0;
Template.monthlySalesReportOffers.helpers({

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
		var listLimit = Session.get('reportMonthlyOffersListLimit');
		var monthDateFromSess = Session.get("selectedMonth");
	 
	  	var monthDateStart = new Date(moment(monthDateFromSess).month("YYYY-MM"));//Find out first day of month with selectedMonth
	  	var monthDateToSess = new Date(moment(monthDateFromSess).add(1,"M"));
	  	// console.log(monthDateToSess);
		// var ordersData = Payment.find({'orderType':'Ads','invoiceDate':{$gte: monthDateStart,$lt: monthDateToSess}}).fetch();
		if(listLimit){
			var ordersData = Payment.find({'orderType':'Offer','invoiceDate':{$gte: monthDateStart,$lt: monthDateToSess}},{limit: listLimit}).fetch();
		}else{
			var ordersData = Payment.find({'orderType':'Offer','invoiceDate':{$gte: monthDateStart,$lt: monthDateToSess}}).fetch();
		}
		// console.log("ordersData",ordersData);
		totalRec = ordersData.length;
		if (totalRec > 10) {
			Session.set('reportMonthlyOffersListLimit',10);
	    	$('.loadMoreRows50MonthlyOffers').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 50){
			Session.set('reportMonthlyOffersListLimit',50);
			$('.loadMoreRows100MonthlyOffers').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 100){
			Session.set('reportMonthlyOffersListLimit',100);
			$('.loadMoreRowsRestMonthlyOffers').addClass('showMore50').removeClass('hideMore50'); 
		}else{
			Session.set('reportMonthlyOffersListLimit',totalRec);
			$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');
		}

 		if(ordersData){
	 		var allOrders = [];
	 		var dateCount = 0;
	 		var tempdate = '1/1/1';

	 		for(i=0; i < totalRec; i++){
	 			var quantityTotal = 0;
	 			var d = ordersData[i].invoiceDate;
                var t = d.toLocaleDateString('en-IN');
                if (t == tempdate) {
                	dateCount++;
                }
 		 			allOrders[i] = {
		              "orderId"       	: ordersData[i]._id ,
		              "businessLink"   	: ordersData[i].businessLink ,
		              "orderNo"       	: ordersData[i].orderNumber,
		              // "discountPercent" : ordersData[i].discountPercent,
		              "date"          	: t ,
		              // "discountedPrice" : ordersData[i].discountedPrice,
		              "totalAmount" 	: ordersData[i].totalAmount,
		              // "totalDiscount" 	: ordersData[i].totalDiscount,
		              "orderType" 		: ordersData[i].orderType,
					  "invoiceNo" 		: ordersData[i].invoiceNumber,
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

Template.monthlySalesReportOffers.events({

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

	'click .loadMoreRows50MonthlyOffers': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50MonthlyOffers .spinner').show();
		var nextLimitBus50 = Session.get('reportMonthlyOffersListLimit');
		if(nextLimitBus50 != 0){
			var nextLimit = Session.get('reportMonthlyOffersListLimit') + 50;
			var payQueryCount  = totalRec;
			if(payQueryCount > nextLimit){
				Session.set('reportMonthlyOffersListLimit',nextLimit);
				if (payQueryCount > 10) {
			    	$('.loadMoreRows50MonthlyOffers').addClass('showMore50').removeClass('hideMore50');
				}else if(payQueryCount > 50){
					$('.loadMoreRows100MonthlyOffers').addClass('showMore50').removeClass('hideMore50');
				}else if(payQueryCount > 100){
					$('.loadMoreRowsRestMonthlyOffers').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				Session.set('reportMonthlyOffersListLimit',payQueryCount);
				$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');
			}
		}
		
	},

	'click .loadMoreRows100MonthlyOffers': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100MonthlyOffers .spinner').show();
		var nextLimitBus100 = Session.get('reportMonthlyOffersListLimit');
		if(nextLimitBus100 != 0){
			var nextLimit = Session.get('reportMonthlyOffersListLimit') + 100;
			var payQueryCount  = totalRec;
			if(payQueryCount > nextLimit){
				Session.set('reportMonthlyOffersListLimit',nextLimit);
				if (payQueryCount > 10) {
			    	$('.loadMoreRows50MonthlyOffers').addClass('showMore50').removeClass('hideMore50');
				}else if(payQueryCount > 50){
					$('.loadMoreRows100MonthlyOffers').addClass('showMore50').removeClass('hideMore50');
				}else if(payQueryCount > 100){
					$('.loadMoreRowsRestMonthlyOffers').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				Session.set('reportMonthlyOffersListLimit',payQueryCount);
				$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');
			}
		}
	},

	'click .loadMoreRowsRestMonthlyOffers': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRestMonthlyOffers .spinner').show();
		var nextLimit = totalRec;
		Session.set('reportMonthlyOffersListLimit',nextLimit);
		$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');
	},

});

Template.monthlySalesReportOffers.onRendered(function(){
	Session.set("selectedMonth",false);
});
