import { Session } from 'meteor/session';
// import { Products } from '../../../api/products.js';
// import { Orders } from '../../../api/orderMaster.js';
import { moment } from "meteor/momentjs:moment";
import { Payment } from '../../api/paymentMaster.js';

import './fromToFieldsBanner.html';
import './searchBannerReport.js';

var totalRec = 0;
Template.fromToFieldsBanner.helpers({
	'fromDate':function(){
		var fromDate = new Date();
		var dd = fromDate.getDate();
		var mm = fromDate.getMonth()+1; //January is 0!
		var yyyy = fromDate.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		}
		if(mm<10){
		    mm='0'+mm;
		}
		var today = yyyy+'-'+mm+'-'+dd;

		return today;
	},

  'toDate':function(){
    var toDate = new Date();

    var dd = toDate.getDate();
    var mm = toDate.getMonth()+1; //January is 0!
    var yyyy = toDate.getFullYear();
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
		var listLimit = Session.get('reportTodayBannerListLimit');
		var fromDate = Session.get('fromDate');
    	var toDate = Session.get('toDate');

		if(fromDate != toDate){
			var fromDt = new Date(fromDate);
      		var toDt = new Date(toDate);
		}else{
			var fromDt = new Date();
      		var toDt = new Date(moment(fromDt).add(1,'d'));
		}

		if(listLimit){
			var ordersData =  Payment.find({"orderType" : "Banner",'paymentDate':{$gte : fromDt, $lt : toDt }},{limit: listLimit}).fetch();
		}else{
			var ordersData =  Payment.find({"orderType" : "Banner",'paymentDate':{$gte : fromDt, $lt : toDt }}).fetch();
		}
	 	
	 	totalRec = ordersData.length;
	 	// console.log(totalRec,listLimit);
	 	if (totalRec > 10) {
	    	$('.loadMoreRows50FromToBanner').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 50){
			$('.loadMoreRows100FromToBanner').addClass('showMore50').removeClass('hideMore50');
		}else if(totalRec > 100){
			$('.loadMoreRowsRestFromToBanner').addClass('showMore50').removeClass('hideMore50'); 
		}else{
			$('.loadMoreRows50FromToBanner').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRows100FromToBanner').removeClass('showMore50').addClass('hideMore50');
			$('.loadMoreRowsRestFromToBanner').removeClass('showMore50').addClass('hideMore50');
		}

		if(listLimit){
			if(totalRec > listLimit){
				if (totalRec > 10) {
			    	$('.loadMoreRows50FromToBanner').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 50){
					$('.loadMoreRows100FromToBanner').addClass('showMore50').removeClass('hideMore50');
				}else if(totalRec > 100){
					$('.loadMoreRowsRestFromToBanner').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50FromToBanner').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100FromToBanner').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRestFromToBanner').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				$('.loadMoreRows50FromToBanner').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100FromToBanner').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRestFromToBanner').removeClass('showMore50').addClass('hideMore50');
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
						"discountPercent" 	: ordersData[i].discountPercent,
						"date"          	: t ,
		              	"invoiceNo"       : ordersData[i].invoiceNumber,
						"discountedPrice" 	: ordersData[i].discountedPrice,
						"totalAmount" 		: ordersData[i].totalAmount,
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


Template.fromToFieldsBanner.events({
	"click .search" : function(event){
		event.preventDefault();
		var fromDate = $("input#fromdate").val();
		var toDate = $("input#todate").val();
		if(fromDate > toDate){
			alert("To Date cannot be less than From Date");
			Bert.alert( 'To Date cannot be less than From Date', 'danger', 'growl-top-right' );
			//Throw Error Alert to to User
			// throw new Meteor.Error("From Date cannot be less than To Date");
		}else{
			Session.set("fromDate",fromDate);
			Session.set("toDate",toDate);
		}
	},

	'click .loadMoreRows50FromToBanner': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50FromToBanner .spinner').show();
		var nextLimitBus50 = totalRec+50;
		Session.set('reportTodayBannerListLimit',nextLimitBus50);
	},

	'click .loadMoreRows100FromToBanner': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100FromToBanner .spinner').show();
		var nextLimitBus100 = totalRec+100;
		Session.set('reportTodayBannerListLimit',nextLimitBus100);
	},

	'click .loadMoreRowsRestFromToBanner': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRestFromToBanner .spinner').show();
		var nextLimit = totalRec;
		Session.set('reportTodayBannerListLimit',nextLimit);
		$('.loadMoreRows50FromToBanner').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100FromToBanner').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestFromToBanner').removeClass('showMore50').addClass('hideMore50');
		$('.spinner').hide();
	},

});

Template.fromToFieldsBanner.onRendered(function(){
	Session.set("fromDate","");
	Session.set("toDate","");
});