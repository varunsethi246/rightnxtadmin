import { Session } from 'meteor/session';
// import { Orders } from '../../../../api/orderMaster.js';
import { moment } from "meteor/momentjs:moment";
import { Payment } from '../../../api/paymentMaster.js';

import './todaysSalesReport.html';
import '../searchAdsReport.js';

var totalRec = 0;
Template.todaysSalesReport.helpers({
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
		var listLimit = Session.get('reportTodayAdsListLimit');
		var selectedDate = Session.get('newDate');
		if(selectedDate){
			var newDate  = selectedDate;
		}else{
			var newDate  = new Date();
		}
		// console.log('newDate: ',newDate);
		var newDate1 = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0); //current day at 0:0:0
		var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) ); // next day at 0:0:0
		
	 	if(listLimit){
			var paymentAds =  Payment.find({'orderType':'Ads','paymentDate':{$gte : newDate1, $lt : newDate2 }},{limit: listLimit}).fetch();
		}else{
			var paymentAds =  Payment.find({'orderType':'Ads','paymentDate':{$gte : newDate1, $lt : newDate2 }}).fetch();
		}
	 	
	 	totalRec = paymentAds.length;
	 	// console.log(totalRec,listLimit);
	 	if (totalRec > 10) {
	    	$('.loadMoreRows50TodayAds').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 50){
			$('.loadMoreRows100TodayAds').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 100){
			$('.loadMoreRowsRestTodayAds').addClass('showMore50').removeClass('hideMore50'); 
		}else{
			$('.loadMoreRows50TodayAds').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRows100TodayAds').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRowsRestTodayAds').removeClass('showMore50').addClass('hideMore50');
		}

		if(listLimit){
			if(totalRec > listLimit){
				if (totalRec > 10) {
			    	$('.loadMoreRows50TodayAds').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 50){
					$('.loadMoreRows100TodayAds').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 100){
					$('.loadMoreRowsRestTodayAds').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50TodayAds').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100TodayAds').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestTodayAds').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				$('.loadMoreRows50TodayAds').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100TodayAds').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestTodayAds').removeClass('showMore50').addClass('hideMore50');
				$('.spinner').hide();
			}
		}

	 	if(paymentAds){
        var allOrders = [];
        var dateCount = 0;
        var tempdate = '1/1/1';

        for(i=0; i < totalRec; i++){
          var quantityTotal = 0;
          var d = paymentAds[i].paymentDate;
          var t = d.toLocaleDateString('en-IN');
          // console.log('d :',d);
          // console.log('t :',t);
          if (t == tempdate) {
                dateCount++;
          }

            allOrders[i] = {
              "orderId"       	: paymentAds[i]._id ,
              "businessLink"   	: paymentAds[i].businessLink ,
              "orderNo"       	: paymentAds[i].orderNumber,
              "discountPercent" : paymentAds[i].discountPercent,
		       "invoiceNo"       : paymentAds[i].invoiceNumber,
              "date"          	: t ,
              "discountedPrice" : paymentAds[i].discountedPrice,
              "totalAmount" 	: paymentAds[i].totalAmount,
              "totalDiscount" 	: paymentAds[i].totalDiscount,
              "orderType" 		: paymentAds[i].orderType,
              "totalQuantity" 	: 0,
              "rowSpanCount"  	: 0,
            }

          var totalProdQty = totalRec;
          for(j=0 ; j<totalProdQty; j++){
            quantityTotal += parseInt(paymentAds[i]);

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
        // console.log('allOrders:',allOrders);
        return allOrders;
      } //if
	}


});


Template.todaysSalesReport.events({
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

	'click .loadMoreRows50TodayAds': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50TodayAds .spinner').show();
		var nextLimitBus50 = totalRec+50;
		Session.set('reportTodayAdsListLimit',nextLimitBus50);
	},

	'click .loadMoreRows100TodayAds': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100TodayAds .spinner').show();
		var nextLimitBus100 = totalRec+100;
		Session.set('reportTodayAdsListLimit',nextLimitBus100);
	},

	'click .loadMoreRowsRestTodayAds': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRestTodayAds .spinner').show();
		var nextLimit = totalRec;
		Session.set('reportTodayAdsListLimit',nextLimit);
		$('.loadMoreRows50TodayAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100TodayAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestTodayAds').removeClass('showMore50').addClass('hideMore50');
		$('.spinner').hide();
	},


});

Template.todaysSalesReport.onRendered(function(){
	Session.set("newDate",false);
});