import { AdsDiscount } from '/imports/api/discountMaster.js';
import { AdsPosition } from '/imports/api/discountMaster.js';
import { Session } from 'meteor/session';

import './adsDiscountManagement.html';
import './adsPositionManagement.html';
import '/imports/admin/commonAdmin/commonAdmin.js';



Template.adsDiscountManagement.helpers({
	'discounts':function(){
		var discountData = AdsDiscount.find({}).fetch();
		var discountArray = [];
		if(discountData){
			for(var i=0 ; i<discountData.length ; i++){
				discountArray.push({
					// 'srno'     : i++,
					'id'       : discountData[i]._id,
					'price'    : discountData[i].price,
					'discount' : discountData[i].discount,
				});
			}//i
		}//discountData
		return discountArray;
	}
});

Template.adsPositionManagement.helpers({
	'positions':function(){
		return AdsPosition.find({},{sort: {position:1}});
	}
});


Template.adsDiscountManagement.events({
	'keypress #discount':function(e){
		if (e.keyCode == 13){
			e.preventDefault();
		    var id = Session.get("adsId");
			var rate     = $('#price').val();
			var discount = $('#discount').val();
			if(rate != '' ){
				if(id){
					if(rate != '' && discount != ''){
						Meteor.call('updateAdsDiscount',id,rate,discount,function(error,result){
							if(error){
								console.log(error);
							}else{
								$('#price').val('');
								$('#discount').val('');
								$('#price').focus();
								
								delete Session.keys['adsId'];
							}
						});
					}else if(discount == ''){
						Bert.alert("Please enter discount.","danger","growl-top-right");
					}
				}else if (rate != '' && discount != ''){
					Meteor.call('insertAdsDiscount',rate,discount,function(error,result){
						if(error){
							console.log(error);
						}else{
							$('#price').val('');
							$('#discount').val('');
							$('#price').focus();

						}
					});
				}else if(discount == ''){
					Bert.alert("Please enter discount.","danger","growl-top-right");

				}
			}else{
				Bert.alert("Please enter price.","danger","growl-top-right");
			}
	    }
	},

	
	'click .delete':function(event){
		event.preventDefault();
		var value = this;
		console.log(event.currentTarget);
		var id = value.id;
		// var id = $(event.currentTarget).attr('id');
		// console.log(id);
		// console.log($(this).attr('id'));
		Meteor.call('removeAdsDiscount',id,function(error,result){
			if(error){
				console.log(error);
			}else{
				Bert.alert("Deleted Successfully!","success","growl-top-right");
				$('.modal-backdrop').hide();
			}
		});
	},

	'click .edit':function(event){
		event.preventDefault();
		var value = this;
		var id = value.id;
		
     	$('#price').focus();
		$('input[name="price"]').val(this.price);
    	$('input[name="discount"]').val(this.discount);
    	// $('input[name="price"]').focus();
     	console.log();
	    Session.set("adsId",id);
				
	}
});



Template.adsPositionManagement.events({
	'keydown #rate': function(e){
         if ($.inArray(e.keyCode, [8, 9, 27, 13]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))||
                (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true))||
                (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // let it happen, don't do anything
                    return;
           }
           // Ensure that it is a number and stop the keypress
           if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode===190 || e.keyCode===46 || e.keyCode===110)) {
               e.preventDefault();
           }
      },
	'keypress #rate':function(e){
		if(e.keyCode == 13){
			e.preventDefault();
			var id = Session.get("adsPositionId");
			var position = $('.selectPosition').val();
				// console.log("position",position);
			if(position!='-- Select --' && position != null){
				
				if(position){
					position = parseInt(position);
				}

				var positionAdded = '';
				var positionTrue = false;
				var posId = id;

				if(id){
					positionAdded = AdsPosition.find({"position":id}).fetch();
					if(positionAdded.length>0){
						positionTrue = true;
					}
				}else{
					positionAdded = AdsPosition.find({"position":position}).fetch();
					if(positionAdded.length>0){
						posId = positionAdded[0]._id;
						positionTrue = true;
					}
				}


				var rate     = $('#rate').val();
				if((id || positionTrue) && position != '-- Select --' && position != null && rate!= null && rate!== ''){
					Meteor.call('updateAdsPosition',posId,position,rate,function(error,result){
						if(error){
							console.log(error);
						}else{
							$('.selectPosition').val('-- Select --');
							$('#rate').val('');
	        				Session.set("adsPositionId",'');

						}
					})
				}else if(position!='-- Select --' && position != null && rate!= null && rate!== ''){
					Meteor.call('insertAdsPosition',position,rate,function(error,result){
						if(error){
							console.log(error);
						}else{
							$('.selectPosition').val('-- Select --');
							$('#rate').val('');
						}
					})
				}else if(rate == '' || rate == null){
					Bert.alert("Please enter rate.","danger","growl-top-right");
				}
			}else{
				Bert.alert("Please select position number.","danger","growl-top-right");
			}
		}
	},

	'click .deletePosBtn':function(event){
		event.preventDefault();
		var value = this;
		var id = value._id;

		Meteor.call('removeAdsPosition',id,function(error,result){
			if(error){
				console.log(error);
			}else{
				Bert.alert("Deleted Successfully!","success","growl-top-right");
				$('.modal-backdrop').hide();

			}
		})
	},

	'click .edit':function(event){
		event.preventDefault();
		var value = this;
		var id = value._id;
		$('.focusUp').focus();
		$('.selectPosition').val(this.position);
        $('#rate').val(this.rate);	
        Session.set("adsPositionId",id);
	}
});
adsDiscountManagementForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'adsDiscountManagement'});
}
export { adsDiscountManagementForm }

adsPositionManagementForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'adsPositionManagement'});
}
export { adsPositionManagementForm }