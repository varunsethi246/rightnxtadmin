import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './companyLocations.html';


Template.companyLocations.helpers({
	'editLocation': function (){
		return Session.get('editLocation');
	}

});

Template.companyLocations.events({
  'keypress #companyNewLocation': function(e) {
    var key = e.keyCode;
    if (key >= 48 && key <= 57) {
        e.preventDefault();
    }
  },

  'keydown #companyPincodeLoc': function(e) {
    // console.log(e);
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    },

  'click .btnUpdate': function(event){
    event.preventDefault();
   
    companyLocationsFormValue = {
        companyLocation  : $("input#companyNewLocation").val(),
        companyAddress   : $("input#companyNewAddress").val(),
        companyPincode   : $("input#companyPincodeLoc").val(),
        companyCity      : $("select#companyCityLoc").val(),
        companyState     : $("select#companyStateLoc").val(),
        companyCountry   : $("select#companyCountryLoc").val(),
        companyLocationId: Session.get('companyLocationId'),
    }
    
    if($('#companyLocations').valid()){
        Meteor.call('updateCompanyLocations', companyLocationsFormValue);
        $('input#companyNewLocation').val('');
        $('input#companyNewAddress').val('');
        $('input#companyPincodeLoc').val('');
        $('select#companyCityLoc').val('Pune');
        $('select#companyStateLoc').val('Maharashtra');
        $('select#companyCountryLoc').val('India');
        Session.set('editLocation',false);
        Session.set('companyLocationId','');
    }
   },

   'click .faqStyle': function(event){
        $('.moreLocations').toggleClass('fa fa-caret-right');
        $('.moreLocations').toggleClass('fa fa-caret-down');
        $('.locationFormWrapper').slideToggle();

   }
    
});

Template.companyLocations.onRendered(function(){
  
  $("#companyLocations").validate({
    rules: {
    },
    errorPlacement: function(error, element) {
        if (element.attr("name") == "companyNewLocation"){
          error.insertAfter("#companyLocVal");
        }
        if (element.attr("name") == "companyNewAddress"){
          error.insertAfter("#companyAddrVal");
        }
        if (element.attr("name") == "companyPincodeLoc"){
          error.insertAfter("#companyPinVal");
        }
    }
  });
});