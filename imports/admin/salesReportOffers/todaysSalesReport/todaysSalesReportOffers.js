import { Session } from 'meteor/session';
// import { Orders } from '../../../../api/orderMaster.js';
import { moment } from "meteor/momentjs:moment";
import { Payment } from '../../../api/paymentMaster.js';

import './todaysSalesReportOffers.html';
import '../searchReports/searchOffersReport.js';

var totalRec = 0;

Template.todaysSalesReportOffers.helpers({
	'currentDate':function(){
		var setDate = Session.get('newDate');

		if(setDate){
			var today = new Date(setDate);
		}else{
			var today = new Date();
		}
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		}
		if(mm<10){
		    mm='0'+mm;
		}
		var today = yyyy+'-'+mm+'-'+dd;

		return today;
	},


	'result': function(){
		var listLimit = Session.get('reportTodayOffersListLimit');
		var selectedDate = Session.get('newDate');
		if(selectedDate){
			var newDate  = selectedDate;
		}else{
			var newDate  = new Date();
		}
		var newDate1 = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0); //current day at 0:0:0
		var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) ); // next day at 0:0:0

		// var ordersData =  Orders.find({'createdAt':{$gte : newDate1, $lt : newDate2 }}, {sort: {'createdAt': -1}}).fetch();
		// var ordersData =  Payment.find({'orderType':'Banner','invoiceDate':{$gte : newDate1, $lt : newDate2 }}).fetch();
		if(listLimit){
			var ordersData =  Payment.find({'orderType':'Offer','invoiceDate':{$gte : newDate1, $lt : newDate2 }},{limit: listLimit}).fetch();
		}else{
			var ordersData =  Payment.find({'orderType':'Offer','invoiceDate':{$gte : newDate1, $lt : newDate2 }}).fetch();
		}
	 	
	 	totalRec = ordersData.length;
	 	if (totalRec > 10) {
	    	$('.loadMoreRows50TodayOffers').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 50){
			$('.loadMoreRows100TodayOffers').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 100){
			$('.loadMoreRowsRestTodayOffers').addClass('showMore50').removeClass('hideMore50'); 
		}else{
			$('.loadMoreRows50TodayOffers').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRows100TodayOffers').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRowsRestTodayOffers').removeClass('showMore50').addClass('hideMore50');
		}

		if(listLimit){
			if(totalRec > listLimit){
				if (totalRec > 10) {
			    	$('.loadMoreRows50TodayOffers').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 50){
					$('.loadMoreRows100TodayOffers').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 100){
					$('.loadMoreRowsRestTodayOffers').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50TodayOffers').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100TodayOffers').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestTodayOffers').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				$('.loadMoreRows50TodayOffers').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100TodayOffers').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestTodayOffers').removeClass('showMore50').addClass('hideMore50');
				$('.spinner').hide();
			}
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
	        var rowSpan = dateCount;
	        allOrders[i-rowSpan].rowSpanCount = rowSpan;
	        return allOrders;
	    } //if
	}


});


Template.todaysSalesReportOffers.events({
	'click #nextDate':function(event){
		event.preventDefault();
		var selectedDate1 = $("input#reportDate").val();
		var selectedDate = selectedDate1.replace(/-/g, '\/');

		var newDate1 = new Date(selectedDate);
		var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
		Session.set('newDate', newDate2);
	},

	'click #previousDate':function(event){
		event.preventDefault();
		var selectedDate1 = $("input#reportDate").val();
		var selectedDate = selectedDate1.replace(/-/g, '\/');

		var newDate1 = new Date(selectedDate);
		var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
		Session.set('newDate', newDate2);
	},

	'click .fapdf': function(event) {
		// var docDefinition = { content: 'My Text' };

		// pdfMake.createPdf(docDefinition).open();

		var doc = new jsPDF();

	    doc.fromHTML($('.todaysSalesReportForpdf').html(), 15, 15, {
	        'width': 170,
	            // 'elementHandlers': specialElementHandlers
	    });
	    doc.save('todaysSalesReport.pdf');

	},

	'click .loadMoreRows50TodayOffers': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50TodayOffers .spinner').show();
		var nextLimitBus50 = totalRec+50;
		Session.set('reportTodayOffersListLimit',nextLimitBus50);
	},

	'click .loadMoreRows100TodayOffers': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100TodayOffers .spinner').show();
		var nextLimitBus100 = totalRec+100;
		Session.set('reportTodayOffersListLimit',nextLimitBus100);
	},

	'click .loadMoreRowsRestTodayOffers': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRestTodayOffers .spinner').show();
		var nextLimit = totalRec;
		Session.set('reportTodayOffersListLimit',nextLimit);
		$('.loadMoreRows50TodayOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100TodayOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestTodayOffers').removeClass('showMore50').addClass('hideMore50');
		$('.spinner').hide();
	},


});

Template.todaysSalesReportOffers.onRendered(function(){
	Session.set("newDate",false);
});