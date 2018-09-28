import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './contactUsList.html';
import '../commonAdmin/commonAdmin.js';

import { ContactUs } from '/imports/api/webPages/contactUsMaster.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.contactUsList.onRendered( ()=>{
	var ContactQueryCount  = Counts.get('noOfContactUs');
	if (ContactQueryCount > 15) {
    	$('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
		Session.set('contactUsListLimit',15);
	}else if(ContactQueryCount > 50){
		$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
		Session.set('contactUsListLimit',50);
	}else if(ContactQueryCount > 100){
		$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
		Session.set('contactUsListLimit',100);
	}else{
		Session.set('contactUsListLimit',ContactQueryCount);
		$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	}
});

Template.contactUsList.helpers({
	Details: function(){
		var listLimit = Session.get('contactUsListLimit');
		var data = ContactUs.find({},{sort:{'createdAt': -1}, limit: listLimit}).fetch();

		if(data){
			for(i=0;i<data.length;i++){
				data[i].createdAt = moment(data[i].createdAt).fromNow();
			}
	    	return data;
		}
		
	},
	
});

Template.contactUsList.events({
	'click .loadMoreRows50': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows50 .spinner').show();
		var nextLimitBus50 = Session.get('contactUsListLimit');
		if(nextLimitBus50 != 0){
			var nextLimit = Session.get('contactUsListLimit') + 50;
			var ContactQueryCount  = Counts.get('noOfContactUs');
			if(ContactQueryCount > nextLimit){
				Session.set('contactUsListLimit',nextLimit);
				if (ContactQueryCount > 15) {
			    	$('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
				}else if(ContactQueryCount > 50){
					$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
				}else if(ContactQueryCount > 100){
					$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				Session.set('contactUsListLimit',ContactQueryCount);
				$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
			}
		}
		
	},

	'click .loadMoreRows100': function(event){
		 event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRows100 .spinner').show();
		var nextLimitBus100 = Session.get('contactUsListLimit');
		if(nextLimitBus100 != 0){
			var nextLimit = Session.get('contactUsListLimit') + 100;
			var ContactQueryCount  = Counts.get('noOfContactUs');
			if(ContactQueryCount > nextLimit){
				Session.set('contactUsListLimit',nextLimit);
				if (ContactQueryCount > 15) {
			    	$('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
				}else if(ContactQueryCount > 50){
					$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
				}else if(ContactQueryCount > 100){
					$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
				}else{
					$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
					$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
				}
			}else{
				Session.set('contactUsListLimit',ContactQueryCount);
				$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
				$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
			}
		}
	},

	'click .loadMoreRowsRest': function(event){
		event.preventDefault();
		$('.spinner').hide();
		$('.loadMoreRowsRest .spinner').show();
		var nextLimit = Counts.get('noOfContactUs');
		Session.set('contactUsListLimit',nextLimit);
		$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	},

	'click .deleteContactUsQuery' : function(event){
		event.preventDefault();
		var modelid = $(event.target).parent().parent().parent().parent().parent().attr('id');
		var id  = modelid.split("-");
		Meteor.call('removeContactUsQuery',id[1],function(error,result){
			if(error){
				Bert.alert(error.reason,"danger",'growl-top-right');
			}else{
				Bert.alert('ContactUs Query is deleted','success','growl-top-right');
			}
		});
		$('.modal-backdrop').hide();
	},
	'focus #searchQuery': function(event){
		Session.set('contactUsListLimit',0);
		$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
		$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	},
	'keyup #searchQuery': _.throttle(function(event) {
		event.preventDefault();
		var searchText = event.currentTarget.value;
		var filter = searchText.toUpperCase();
		var table = document.getElementById("contactUsListTable");
		var tr = table.getElementsByTagName("tr");

		  // Loop through all table rows, and hide those who don't match the search query
		if(tr){
			if(tr.length > 0){

			  for (var i=0; i<tr.length; i++) {
			    var td = tr[i].getElementsByTagName("td")[0];
			    // console.log('td',td);
			    if(td) {
			      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }else{
				// console.log('no found 1');

			    }

			    var td = tr[i].getElementsByTagName("td")[3];
			    // console.log('td 2',td);

			    if(td) {
			      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }else{
				// console.log('no found 2');

			    }
			  }
			}
		}
		else{
			// console.log('no found');
		}

	}, 200),
});

contactUsListForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'contactUsList'});
}

export { contactUsListForm };