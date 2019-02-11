import { moment } from "meteor/momentjs:moment";
// import { Orders } from '../../../../api/orderMaster.js';
import { Payment } from '../../../api/paymentMaster.js';
import { Offers } from '../../../api/offersMaster.js';

import './yearlySalesReportOffers.html';
import '../searchReports/searchOffersReport.js';

var totalRec = 0;
Template.yearlySalesReportOffers.helpers({

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
    var listLimit = Session.get('reportYearlyOffersListLimit');
    var yearFromSess = Session.get("selectedYear");

    var thisYear = yearFromSess;
    var yearDateStart = new Date("1/1/" + thisYear);
    var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
    if(listLimit){
      var ordersData = Payment.find({'orderType':'Offer','paymentDate':{$gte: yearDateStart,$lt: yearDateEnd}},{limit: listLimit}).fetch();
    }else{
      var ordersData = Payment.find({'orderType':'Offer','paymentDate':{$gte: yearDateStart,$lt: yearDateEnd}}).fetch();
    }
    totalRec = ordersData.length;
    if (totalRec > 10) {
      $('.loadMoreRows50YearlyOffers').addClass('showMore50').removeClass('hideMore50');
    }else if(totalRec > 50){
      $('.loadMoreRows100YearlyOffers').addClass('showMore50').removeClass('hideMore50');
    }else if(totalRec > 100){
      $('.loadMoreRowsRestYearlyOffers').addClass('showMore50').removeClass('hideMore50'); 
    }else{
      $('.loadMoreRows50YearlyOffers').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRows100YearlyOffers').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRowsRestYearlyOffers').removeClass('showMore50').addClass('hideMore50');
    }

    if(listLimit){
      if(totalRec > listLimit){
        if (totalRec > 10) {
          $('.loadMoreRows50YearlyOffers').addClass('showMore50').removeClass('hideMore50');
        }else if(totalRec > 50){
          $('.loadMoreRows100YearlyOffers').addClass('showMore50').removeClass('hideMore50');
        }else if(totalRec > 100){
          $('.loadMoreRowsRestYearlyOffers').addClass('showMore50').removeClass('hideMore50'); 
        }else{
          $('.loadMoreRows50YearlyOffers').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRows100YearlyOffers').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRowsRestYearlyOffers').removeClass('showMore50').addClass('hideMore50');
        }
      }else{
        $('.loadMoreRows50YearlyOffers').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRows100YearlyOffers').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRowsRestYearlyOffers').removeClass('showMore50').addClass('hideMore50');
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

          var totalAmount = 0;
          if(ordersData[i].offers&&ordersData[i].offers.length){
            for (var j = 0; j < ordersData[i].offers.length; j++) {
              var offerDeatils = Offers.findOne({'_id':ordersData[i].offers[j].offerId});
              if(offerDeatils){
                totalAmount = totalAmount+(parseInt(offerDeatils.numOfMonths)*parseInt(ordersData[i].offerPricePerMonth)*parseInt(ordersData[i].numberOfOffers));
              }
            }
          }

          allOrders[i] = {
            "orderId"         : ordersData[i]._id ,
            "businessLink"    : ordersData[i].businessLink ,
            "orderNo"         : ordersData[i].orderNumber,
            // "discountPercent" : ordersData[i].discountPercent,
            "date"            : t ,
            // "discountedPrice" : ordersData[i].discountedPrice,
            "totalAmount"     : totalAmount,
            // "totalDiscount"   : ordersData[i].totalDiscount,
            "orderType"       : ordersData[i].orderType,
            "invoiceNo"     : ordersData[i].invoiceNumber,
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


Template.yearlySalesReportOffers.events({

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

  'click .loadMoreRows50YearlyOffers': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRows50YearlyOffers .spinner').show();
    var nextLimitBus50 = totalRec+50;
    Session.set('reportYearlyOffersListLimit',nextLimitBus50);
  },

  'click .loadMoreRows100YearlyOffers': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRows100YearlyOffers .spinner').show();
    var nextLimitBus100 = totalRec+100;
    Session.set('reportYearlyOffersListLimit',nextLimitBus100);
  },

  'click .loadMoreRowsRestYearlyOffers': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRowsRestYearlyOffers .spinner').show();
    var nextLimit = totalRec;
    Session.set('reportYearlyOffersListLimit',nextLimit);
    $('.loadMoreRows50YearlyOffers').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRows100YearlyOffers').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRowsRestYearlyOffers').removeClass('showMore50').addClass('hideMore50');
    $('.spinner').hide();
  },


});

Template.yearlySalesReportOffers.onRendered(function(){
  Session.set("selectedYear",false);  
});