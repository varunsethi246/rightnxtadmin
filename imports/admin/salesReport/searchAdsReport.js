import { moment } from "meteor/momentjs:moment";
import { Template } from 'meteor/templating';
import { Payment } from '../../api/paymentMaster.js';

import './searchAdsReport.html';

Template.searchAdsReport.events({
	'focus #searchReports': function(event){
		Session.set('reportMonthlyAdsListLimit',0);
		$('.loadMoreRows50MonthlyAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100MonthlyAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestMonthlyAds').removeClass('showMore50').addClass('hideMore50');

		Session.set('reportTodayAdsListLimit',0);
		$('.loadMoreRows50TodayAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100TodayAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestTodayAds').removeClass('showMore50').addClass('hideMore50');
		
		Session.set('reportWeeklyAdsListLimit',0);
		$('.loadMoreRows50WeeklyAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100WeeklyAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestWeeklyAds').removeClass('showMore50').addClass('hideMore50');

		Session.set('reportYearlyAdsListLimit',0);
		$('.loadMoreRows50YearlyAds').removeClass('showMore50').addClass('hideMore50');
	    $('.loadMoreRows100YearlyAds').removeClass('showMore50').addClass('hideMore50');
    	$('.loadMoreRowsRestYearlyAds').removeClass('showMore50').addClass('hideMore50');

		Session.set('reportFromToAdsListLimit',0);
		$('.loadMoreRows50FromToAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100FromToAds').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRestFromToAds').removeClass('showMore50').addClass('hideMore50');
	},
	'keyup #searchReports': _.throttle(function(event) {
		event.preventDefault();
		var searchText = event.currentTarget.value;
		var filter = searchText.toUpperCase();
		var monthTable = document.getElementById("monthlyAdsSalesReportTable");
		var monthtr = monthTable.getElementsByTagName("tr");
		var todayTable = document.getElementById("todayAdsSalesReportTable");
		var todaytr = todayTable.getElementsByTagName("tr");
		var weekTable = document.getElementById("weeklyAdsSalesReportTable");
		var weektr = weekTable.getElementsByTagName("tr");
		var yearTable = document.getElementById("yearlyAdsSalesReportTable");
		var yeartr = yearTable.getElementsByTagName("tr");
		var fromtoTable = document.getElementById("fromtoAdsSalesReportTable");
		var fromtotr = fromtoTable.getElementsByTagName("tr");

		// Loop through all table rows, and hide those who don't match the search query
		if(monthtr){
			if(monthtr.length > 0){
			  for (var i=0; i<monthtr.length; i++) {
			    var tdOrder = monthtr[i].getElementsByTagName("td")[1];
			    var td = monthtr[i].getElementsByTagName("td")[2];
			    // console.log('td',tdOrder,td);
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
});