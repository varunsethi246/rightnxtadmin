import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


import './taxSettings.html';
import './allTaxes.html';




Template.taxSettings.helpers({
	'edittaxSettings': function (){
		return Session.get('edittaxSettings');
	},
	

});


Template.taxSettings.events({


  'click .btnUpdatetaxsettings': function(event){
    event.preventDefault();
     var targetedID = Session.get('targetedid');
     // console.log("targetedID"+targetedID)
     var effectiveFrom = $("input#effectiveFrom").val();
     console.log('effectiveFrom :',effectiveFrom);
    taxSettingsFormValue = {
        taxType       : $("select#taxType").val(),
        applicableTax : $("input#applicableTax").val(),
        effectiveFrom : $("input#effectiveFrom").val(),
    }
    if (effectiveFrom != "" && effectiveFrom != null && effectiveFrom != undefined) {

      Meteor.call('updatetaxSettings', taxSettingsFormValue,targetedID);
    }
    // event.target.taxType.value ='';
    // event.target.applicableTax.value ='';
    // event.target.effectiveFrom.value ='';
    
   },
   
   // 'click .addtaxsettings': function(event){
   //      $('.moretax ').toggleClass('fa fa-caret-right');
   //      $('.moretax ').toggleClass('fa fa-caret-down');
   //      $('.taxDetailsFormWrapper').slideToggle();
   
   // }
});
