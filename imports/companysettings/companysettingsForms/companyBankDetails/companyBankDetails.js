import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './companyBankDetails.html';
import './companyAllBankDetails.js';



Template.companyBankDetails.helpers({
	'editBankDetails': function (){
		return Session.get('editBankDetails');
	}

});

Template.companyAllBankDetails.events({
	'click .editBankDetails': function(e) {
        e.preventDefault();
        $('.bankDetailsFormWrapper').css('display','block');

        $('.HRMSTextbox').css({
            'background-color': 'transparent',
            'color': '#000',
            'font-weight':'bold',
            'font-size': '15px'
        });
        // var locationObj = CompanySettings.find({'responsiblePerson':'Admin'});
        var rule = this;
        
        var address = rule.companyAddress;
        var id = {id : e.currentTarget.name};

        FlowRouter.setQueryParams(id);
        $('input[name="accHolderName"]').val(this.accHolderName);
        $('input[name="bankName"]').val(this.bankName);
        $('input[name="branchName"]').val(this.branchName);
        $('input[name="accNumber"]').val(this.accNumber);
        $('input[name="accNumber"]').attr('disabled','disabled');
        $('input[name="ifscCode"]').val(this.ifscCode);
       
        
        Session.set('editBankDetails',true);        
      
    },
});

Template.companyBankDetails.events({
    'keydown #accNumber': function(e) {
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

    'keypress #accHolderName': function(e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    },

    'keypress #bankName': function(e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    },

    'keypress #branchName': function(e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    },

  'click .btnUpdateBankDetails': function(event){
    event.preventDefault();
    companyBankDetailsFormValue = {
        accHolderName  : $("input#accHolderName").val(),
        bankName       : $("input#bankName").val(),
        branchName     : $("input#branchName").val(),
        accNumber      : $("input#accNumber").val(),
        ifscCode       : $("input#ifscCode").val(),
    }
    
    // console.log(companyBankDetailsFormValue);

    Meteor.call('updateBankDetails', companyBankDetailsFormValue);
     $('#accHolderName').val('');
     $('#bankName').val('');
     $('#branchName').val('');
     $('#accNumber').val('');
     $('#ifscCode').val('');
     $('input[name="accNumber"]').removeAttr('disabled','disabled');
     Session.set('editBankDetails',false);
    },

    'click .addBankDetails': function(event){
        $('.morebankdetails ').toggleClass('fa fa-caret-right');
        $('.morebankdetails ').toggleClass('fa fa-caret-down');
        $('.bankDetailsFormWrapper').slideToggle();
   }


   
});
