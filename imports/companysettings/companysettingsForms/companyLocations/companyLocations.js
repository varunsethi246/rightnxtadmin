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

  'click .btnUpdate': function(event){
    event.preventDefault();
   
    companyLocationsFormValue = {
        companyLocation  : $("input#companyNewLocation").val(),
        companyAddress   : $("input#companyNewAddress").val(),
        companyPincode   : $("input#companyPincode").val(),
        companyCity      : $("select#companyCity").val(),
        companyState     : $("select#companyState").val(),
        companyCountry   : $("select#companyCountry").val(),
        companyLocationId: Session.get('companyLocationId'),
    }
    

    Meteor.call('updateCompanyLocations', companyLocationsFormValue);
    $('input#companyNewLocation').val('');
    $('input#companyNewAddress').val('');
    $('input#companyPincode').val('');
    $('select#companyCity').val('Pune');
    $('select#companyState').val('Maharashtra');
    $('select#companyCountry').val('India');
    Session.set('editLocation',false);
    Session.set('companyLocationId','');
   },

   'click .faqStyle': function(event){
        $('.moreLocations').toggleClass('fa fa-caret-right');
        $('.moreLocations').toggleClass('fa fa-caret-down');
        $('.locationFormWrapper').slideToggle();

   }
    
});