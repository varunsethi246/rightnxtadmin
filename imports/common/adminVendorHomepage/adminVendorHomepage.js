import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

import '/imports/common/common.js';
import './adminVendorHomepage.html';

Template.adminVendorHomepage.onRendered(function(){
  $(window).on('popstate', function() {
    $('.modal').modal('hide');
    $('.modal-backdrop').hide();
  });
});

AdminVendorHomepage = function () {  
	// console.log('in js file');
  BlazeLayout.render("anonymousUserLayout",{main: 'adminVendorHomepage'});
}

export { AdminVendorHomepage };