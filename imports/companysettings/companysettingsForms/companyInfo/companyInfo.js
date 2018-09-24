import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


import './companyInfo.html';
import { TempLogoImage } from '/imports/api/companysettingsAPI.js';

Meteor.subscribe('tempLogoImage');

Template.companyInfo.onRendered(function(){
  
  $.validator.addMethod("regpx1", function(value, element, regexpr) {          
      return regexpr.test(value);
  }, "Name should only contains uppercase, lowercase letters and space.");
  
  $.validator.addMethod("regpx2", function(value, element, regexpr) {          
      return regexpr.test(value);
  }, "Please enter a valid email address.");
  
  $.validator.addMethod("regpx3", function(value, element, regexpr) {          
      return regexpr.test(value);
  }, "Please enter a valid mobile number.");

  $.validator.addMethod("regpx4", function(value, element, regexpr) {          
       return regexpr.test(value);
  }, "Please enter a valid pincode.");
   
  $("#companyInfo").validate({
    rules: {
          companyName: {
              required: true,
              regpx1: /^[A-za-z']+( [A-Za-z']+)*$/,
          },
          companyEmail: {
            required: true,
            regpx2: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
          },
          companyContactNumber: {
            required: true,
            regpx3: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
          },
          companyPincode: {
            required: true,
            regpx4: /^[1-9][0-9]{5}$|^$/,
          },
      }
  });
});

Template.companyInfo.events({
	 'change .imgBrowse': function(event){
      event.preventDefault();
      
      /*--------------Code form Logo Image-----------*/ 
      var file = event.target.files[0];  //assuming you have only one file
      var render = new FileReader(); //this works only in html5
      // console.log('render :',render);
        render.onload =function(event){
           var fileData = render.result;  
           var fileName = file.name;
           Meteor.call('tempLogoImageUpload', fileName, fileData);  
        };
        render.readAsDataURL(file);
      },
});


Template.companyInfo.helpers({
	"tempLogoimage" : function(){
  
    var logoImage = TempLogoImage.find({}).fetch();
      return logoImage.map(function (d, i) {
          d._index = i + 1;
          return d;
      });

  },
});