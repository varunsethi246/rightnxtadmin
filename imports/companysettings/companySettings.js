// import './companysettingsCarousel/companysettingsHeader.html';
import '/imports/admin/commonAdmin/commonAdmin.js';
import '/imports/admin/commonAdmin/adminLayout.html';
import './companySettings.html';


import './companysettingsCarousel/companysettingsDisplayCarousel.js';
import './companysettingsCarousel/companysettingsFormsCarousel.js';
import './companysettingsCarousel/companysettingsModal.js';


import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { CompanySettings } from '/imports/api/companysettingsAPI.js';

// Meteor.subscribe('companySettings');

Template.companysettingsHeader.helpers({

	'companyCount' : function() {
    	return CompanySettings.find({}).count();
	},
	
});


companySettingsForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'companySettings'});
}

export { companySettingsForm };