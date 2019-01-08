import { moment } from "meteor/momentjs:moment";
// import { Orders } from '../../../../api/orderMaster.js';
import { Payment } from '../../../api/paymentMaster.js';

import './yearlySalesReportBanner.html';
import '../searchBannerReport.js';

var totalRec = 0;
Template.yearlySalesReportBanner.helpers({

	'currentyear' : function(){
		var yearSession = Session.get('selectedYear');
		if(yearSession){
			var currentYear = yearSession;
		}else{
			var today = new Date();
	    var currentYear = today.getFullYear();
			Session.set("selectedYear",currentYear);
		}

		return currentYear;

	},

  'result' : function(){
    var listLimit = Session.get('reportYearlyBannerListLimit');
    var yearFromSess = Session.get("selectedYear");

    var thisYear = yearFromSess;
    var yearDateStart = new Date("1/1/" + thisYear);
    var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);

    if(listLimit){
      var ordersData = Payment.find({'orderType':'Banner','invoiceDate':{$gte: yearDateStart,$lt: yearDateEnd}},{limit: listLimit}).fetch();
    }else{
      var ordersData = Payment.find({'orderType':'Banner','invoiceDate':{$gte: yearDateStart,$lt: yearDateEnd}}).fetch();
    }
    
    totalRec = ordersData.length;
    // console.log(totalRec,listLimit);
    if (totalRec > 0) {
        $('.loadMoreRows50YearlyBanner').addClass('showMore50').removeClass('hideMore50');
    }else if(totalRec > 50){
      $('.loadMoreRows100YearlyBanner').addClass('showMore50').removeClass('hideMore50');
    }else if(totalRec > 100){
      $('.loadMoreRowsRestYearlyBanner').addClass('showMore50').removeClass('hideMore50'); 
    }else{
      $('.loadMoreRows50YearlyBanner').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRows100YearlyBanner').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRowsRestYearlyBanner').removeClass('showMore50').addClass('hideMore50');
    }

    if(listLimit){
      if(totalRec > listLimit){
        if (totalRec > 0) {
            $('.loadMoreRows50YearlyBanner').addClass('showMore50').removeClass('hideMore50');
        }else if(totalRec > 50){
          $('.loadMoreRows100YearlyBanner').addClass('showMore50').removeClass('hideMore50');
        }else if(totalRec > 100){
          $('.loadMoreRowsRestYearlyBanner').addClass('showMore50').removeClass('hideMore50'); 
        }else{
          $('.loadMoreRows50YearlyBanner').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRows100YearlyBanner').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRowsRestYearlyBanner').removeClass('showMore50').addClass('hideMore50');
        }
      }else{
        $('.loadMoreRows50YearlyBanner').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRows100YearlyBanner').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRowsRestYearlyBanner').removeClass('showMore50').addClass('hideMore50');
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
              "orderId"         : ordersData[i]._id ,
              "businessLink"    : ordersData[i].businessLink ,
              "orderNo"         : ordersData[i].orderNumber,
              "discountPercent" : ordersData[i].discountPercent,
              "date"            : t ,
              "discountedPrice" : ordersData[i].discountedPrice,
              "totalAmount"     : ordersData[i].totalAmount,
              "totalDiscount"   : ordersData[i].totalDiscount,
              "orderType"       : ordersData[i].orderType,
              "totalQuantity"   : 0,
              "rowSpanCount"    : 0,
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


Template.yearlySalesReportBanner.events({

	'click #nextYear':function(event){
		event.preventDefault();
		var selectedYear = $("input#yearlyValue").val();
		var newYear = moment(selectedYear).add(1,'years').format('YYYY');
		Session.set('selectedYear', newYear);

	},

	'click #previousYear':function(event){
		event.preventDefault();
		var selectedYear = $("input#yearlyValue").val();
		var newYear = moment(selectedYear).subtract(1,'years').format('YYYY');
		Session.set('selectedYear', newYear);

	},

  'click .loadMoreRows50YearlyBanner': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRows50YearlyBanner .spinner').show();
    var nextLimitBus50 = totalRec+50;
    Session.set('reportYearlyBannerListLimit',nextLimitBus50);
  },

  'click .loadMoreRows100YearlyBanner': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRows100YearlyBanner .spinner').show();
    var nextLimitBus100 = totalRec+100;
    Session.set('reportYearlyBannerListLimit',nextLimitBus100);
  },

  'click .loadMoreRowsRestYearlyBanner': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRowsRestYearlyBanner .spinner').show();
    var nextLimit = totalRec;
    Session.set('reportYearlyBannerListLimit',nextLimit);
    $('.loadMoreRows50YearlyBanner').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRows100YearlyBanner').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRowsRestYearlyBanner').removeClass('showMore50').addClass('hideMore50');
    $('.spinner').hide();
  },


});

Template.yearlySalesReportBanner.onRendered(function(){
  Session.set("selectedYear",false);  
});