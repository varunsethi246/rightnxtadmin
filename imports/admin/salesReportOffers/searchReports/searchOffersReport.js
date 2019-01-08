import { moment } from "meteor/momentjs:moment";
import { Template } from 'meteor/templating';
import { Payment } from '../../../api/paymentMaster.js';

import './searchOffersReport.html';

Template.searchOffersReport.onRendered( ()=>{
 //    var payCount  = Counts.get('noOfInvoiceCount');
	// if (payCount > 10) {
	// 	Session.set('reportListLimit',10);
 //        $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
	// }else if(payCount > 50){
	// 	Session.set('reportListLimit',50);
	// 	$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
	// }else if(payCount > 100){
	// 	Session.set('reportListLimit',100);
	// 	$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
	// }else{
	// 	Session.set('reportListLimit',payCount);
	// 	$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// }
});

Template.searchOffersReport.events({
	'focus #searchReports': function(event){
		Session.set('reportMonthlyOffersListLimit',0);
		$('.loadMoreRows50MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100MonthlyOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestMonthlyOffers').removeClass('showMore50').addClass('hideMore50');

		Session.set('reportTodayOffersListLimit',0);
		$('.loadMoreRows50TodayOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100TodayOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestTodayOffers').removeClass('showMore50').addClass('hideMore50');
		
		Session.set('reportWeeklyOffersListLimit',0);
		$('.loadMoreRows50WeeklyOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100WeeklyOffers').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestWeeklyOffers').removeClass('showMore50').addClass('hideMore50');
		
		Session.set('reportYearlyOffersListLimit',0);
		$('.loadMoreRows50YearlyOffers').removeClass('showMore50').addClass('hideMore50');
	    $('.loadMoreRows100YearlyOffers').removeClass('showMore50').addClass('hideMore50');
	    $('.loadMoreRowsRestYearlyOffers').removeClass('showMore50').addClass('hideMore50');
		
		Session.set('reportFromToOffersListLimit',0);
		$('.loadMoreRows50FromToOffers').removeClass('showMore50').addClass('hideMore50');
	    $('.loadMoreRows100FromToOffers').removeClass('showMore50').addClass('hideMore50');
	    $('.loadMoreRowsRestFromToOffers').removeClass('showMore50').addClass('hideMore50');
	},
	'keyup #searchReports': _.throttle(function(event) {
		event.preventDefault();
		var searchText = event.currentTarget.value;
		var filter = searchText.toUpperCase();
		var monthTable = document.getElementById("monthlyOfferSalesReportTable");
		var monthtr = monthTable.getElementsByTagName("tr");
		var todayTable = document.getElementById("todayOfferSalesReportTable");
		var todaytr = todayTable.getElementsByTagName("tr");
		var weekTable = document.getElementById("weeklyOfferSalesReportTable");
		var weektr = weekTable.getElementsByTagName("tr");
		var yearTable = document.getElementById("yearlyOfferSalesReportTable");
		var yeartr = yearTable.getElementsByTagName("tr");
		var fromtoTable = document.getElementById("fromtoOfferSalesReportTable");
		var fromtotr = fromtoTable.getElementsByTagName("tr");

		// Loop through all table rows, and hide those who don't match the search query
		if(monthtr){
			if(monthtr.length > 0){
			  for (var i=0; i<monthtr.length; i++) {
			    var tdOrder = monthtr[i].getElementsByTagName("td")[1];
			    var td = monthtr[i].getElementsByTagName("td")[2];
			    // console.log('td',tdOrder);
			    if(tdOrder || td) {
			      if (tdOrder.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        monthtr[i].style.display = "";
			      }else if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
			        monthtr[i].style.display = "";
			      }else{
			        monthtr[i].style.display = "none";
			      }
			    }
			  }
			}
		}

		if(todaytr){
			if(todaytr.length > 0){
			  for (var i=0; i<todaytr.length; i++) {
			    var tdOrder = todaytr[i].getElementsByTagName("td")[1];
			    var td = todaytr[i].getElementsByTagName("td")[2];
			    // console.log('td',tdOrder);
			    if(tdOrder || td) {
			      if (tdOrder.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        todaytr[i].style.display = "";
			      }else if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
			        todaytr[i].style.display = "";
			      }else{
			        todaytr[i].style.display = "none";
			      }
			    }
			  }
			}
		}

		if(weektr){
			if(weektr.length > 0){
			  for (var i=0; i<weektr.length; i++) {
			    var tdOrder = weektr[i].getElementsByTagName("td")[1];
			    var td = weektr[i].getElementsByTagName("td")[2];
			    // console.log('td',tdOrder);
			    if(tdOrder || td) {
			      if (tdOrder.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        weektr[i].style.display = "";
			      }else if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
			        weektr[i].style.display = "";
			      }else{
			        weektr[i].style.display = "none";
			      }
			    }
			  }
			}
		}

		if(yeartr){
			if(yeartr.length > 0){
			  for (var i=0; i<yeartr.length; i++) {
			    var tdOrder = yeartr[i].getElementsByTagName("td")[1];
			    var td = yeartr[i].getElementsByTagName("td")[2];
			    // console.log('td',tdOrder);
			    if(tdOrder || td) {
			      if (tdOrder.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        yeartr[i].style.display = "";
			      }else if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
			        yeartr[i].style.display = "";
			      }else{
			        yeartr[i].style.display = "none";
			      }
			    }
			  }
			}
		}

		if(fromtotr){
			if(fromtotr.length > 0){
			  for (var i=0; i<fromtotr.length; i++) {
			    var tdOrder = fromtotr[i].getElementsByTagName("td")[1];
			    var td = fromtotr[i].getElementsByTagName("td")[2];
			    // console.log('td',tdOrder);
			    if(tdOrder || td) {
			      if (tdOrder.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        fromtotr[i].style.display = "";
			      }else if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
			        fromtotr[i].style.display = "";
			      }else{
			        fromtotr[i].style.display = "none";
			      }
			    }
			  }
			}
		}

	}, 200),

	// 'click .loadMoreRows50': function(event){
	// 	event.preventDefault();
	// 	$('.spinner').hide();
	// 	$('.loadMoreRows50 .spinner').show();
	// 	var nextLimitBus50 = Session.get('reportListLimit');
	// 	if(nextLimitBus50 != 0){
	// 		var nextLimit = Session.get('reportListLimit') + 50;
	// 		var payQueryCount  = Counts.get('noOfInvoiceCount');
	// 		if(payQueryCount > nextLimit){
	// 			Session.set('reportListLimit',nextLimit);
	// 			if (payQueryCount > 10) {
	// 		    	$('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
	// 			}else if(payQueryCount > 50){
	// 				$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
	// 			}else if(payQueryCount > 100){
	// 				$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
	// 			}else{
	// 				$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 				$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 				$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// 			}
	// 		}else{
	// 			Session.set('reportListLimit',payQueryCount);
	// 			$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 			$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 			$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// 		}
	// 	}
		
	// },

	// 'click .loadMoreRows100': function(event){
	// 	 event.preventDefault();
	// 	$('.spinner').hide();
	// 	$('.loadMoreRows100 .spinner').show();
	// 	var nextLimitBus100 = Session.get('reportListLimit');
	// 	if(nextLimitBus100 != 0){
	// 		var nextLimit = Session.get('reportListLimit') + 100;
	// 		var payQueryCount  = Counts.get('noOfInvoiceCount');
	// 		if(payQueryCount > nextLimit){
	// 			Session.set('reportListLimit',nextLimit);
	// 			if (payQueryCount > 10) {
	// 		    	$('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
	// 			}else if(payQueryCount > 50){
	// 				$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
	// 			}else if(payQueryCount > 100){
	// 				$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
	// 			}else{
	// 				$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 				$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 				$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// 			}
	// 		}else{
	// 			Session.set('reportListLimit',payQueryCount);
	// 			$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 			$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 			$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// 		}
	// 	}
	// },

	// 'click .loadMoreRowsRest': function(event){
	// 	event.preventDefault();
	// 	$('.spinner').hide();
	// 	$('.loadMoreRowsRest .spinner').show();
	// 	var nextLimit = Counts.get('noOfInvoiceCount');
	// 	Session.set('reportListLimit',nextLimit);
	// 	$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// },
});