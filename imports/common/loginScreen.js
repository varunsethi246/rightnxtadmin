import { Bert } from 'meteor/themeteorchef:bert';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '/imports/common/common.js';


// if (Meteor.isClient) {

  Template.loginScreen.events({
    'click .UMloginbutton': function(event, template) {
      event.preventDefault();

      // var forgotPasswordForm = $(e.currentTarget);
      // console.log(forgotPasswordForm);
      var email , trimInput ;

      // var emailVar = e.target.email.value;
      var emailVar = $("#forgotPasswordEmail").val();
      $('.enteredEmail').text(emailVar);
      $('.forgotEmailMessage').show();
      
      trimInput = function(val) {
        return val.replace(/^\s*|\s*$/g, "");
      }

          emailtrim = trimInput(emailVar);
          email     = emailtrim.toLowerCase();


        Accounts.forgotPassword({email: email}, function(err) {
          if (err) {
            if (err.message === 'User not found [403]') {
              // console.log('This email does not exist.');
              Bert.alert('This email does not exist:'+err.reason);
            } else {
              // console.log('We are sorry but something went wrong.');
              Bert.alert('We are sorry but something went wrong:'+err.reason);
            }
          } else {
            // console.log('Email Sent. Check your mailbox.');
            Bert.alert('Email Sent. Check your mailbox.',"success","growl-top-right");
          }
        });

          
        // Bert.alert( "Instructions sent! We've sent an email with instructions on how to reset your password.If you don't receive an email within a few minutes, check your spam and junk folders.", 'success', 'growl-top-right' );
      return false;
    },

    'click .forgotEmail':function(e){
      e.preventDefault();
      $('.disableBtn').removeAttr('disabled');
      // console.log('value change');
    },
    'click .frgtClose':function(e){
      $('.forgotEmailMessage').hide();
      $('.resetPwd').removeClass('diplayNoneresetPwd');

    },


     'click .UMloginbutton': function(event, template) {
    event.preventDefault();

    // var forgotPasswordForm = $(e.currentTarget);
    // console.log(forgotPasswordForm);
    var email , trimInput ;
    var nameRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // var emailVar = e.target.email.value;
    var emailVar = $("#forgotPasswordEmail").val();
    if(emailVar){
      if(emailVar.match(nameRegex)){
        
        trimInput = function(val) {
          return val.replace(/^\s*|\s*$/g, "");
        }

            emailtrim = trimInput(emailVar);
            email     = emailtrim.toLowerCase();


          Accounts.forgotPassword({email: email}, function(err) {
            if (err) {
              if (err.message === 'User not found [403]') {
                // console.log('This email does not exist.');
                Bert.alert('This email does not exist: '+err.reason,'danger','growl-top-right');
              } else {
                // console.log('We are sorry but something went wrong.');
                Bert.alert('We are sorry but something went wrong: '+err.reason,'danger','growl-top-right');
              }
            } else {
              // console.log('Email Sent. Check your mailbox.');
              Bert.alert('Email Sent. Check your mailbox.',"success","growl-top-right");
              $('.disableBtn').attr('disabled','disabled');
              $('.enteredEmail').text(emailVar);
              $('.forgotEmailMessage').show();
            }
          });
      }else{
        Bert.alert('Please enter the valid email address.','danger','growl-top-right');
      }

    }else{
      Bert.alert('Please enter the valid email address.','danger','growl-top-right');
    }

        
      // Bert.alert( "Instructions sent! We've sent an email with instructions on how to reset your password.If you don't receive an email within a few minutes, check your spam and junk folders.", 'success', 'growl-top-right' );
    return false;
  },

  'click .forgotEmail':function(e){
    e.preventDefault();
    $('.disableBtn').removeAttr('disabled');
    // console.log('value change');
  },

    
  'click .loginLabel' : function(event){
      $(event.target).siblings().focus();
    },
    
  'submit .loginForm': function(event) {
    event.preventDefault();

    // $('#loginModal').hide();
    var email = event.target.email.value.toLowerCase();
    var pwd   = event.target.pwd.value;

    var adminObj = Meteor.users.findOne({"emails.address":email});
    // console.log(adminObj);
    if(adminObj){
      if(adminObj.roles[0] == 'admin' || adminObj.roles[0] == 'Staff'){
        Meteor.call('checkEmailVerification', email, (error,data)=>{
          if (data == "verified"){
            Meteor.loginWithPassword(email, pwd, (error)=> {
               if (error) {
                  // $('#loginModal').show();
                  $('.passwordWrongSpan').text("The email address or password you entered is not valid. Please try again");
                  $('.passwordWrongSpan').addClass('passwordWrongWar');
                  
                  // Bert.alert( error.reason, 'danger', 'fixed-top', 'fa-frown-o' );
                } else {
                  // Bert.alert('Welcome To Rightnxt.com!');
                 
                  $('.passwordWrongSpan').removeClass('passwordWrongWar');
                   
                  event.target.email.value   ='';
                  event.target.pwd.value     =''; 
                  // FlowRouter.go('/');
                                        
                  $('#loginModal').modal('hide');
                  $('.modal-backdrop').hide();
                  // $('.modal-backdrop').remove();

                  var loggedInUser = Meteor.userId();
                  // var user = Meteor.users.findOne({'_id' : loggedInUser });
                  var user = Meteor.user();
                  if(user){
                    if (Roles.userIsInRole(loggedInUser, ['user'])) {
                      FlowRouter.go('/userProfile',{'userId':loggedInUser});
                    }else if (Roles.userIsInRole(loggedInUser, ['Vendor'])) {
                      FlowRouter.go('/vendorDashboard');
                    }
                    else{
                      FlowRouter.go('/adminDashboard');
                    }                      
                  }    
                }
              }
            );
          }else if(data == "unverified"){
           $('#loginModal').show();
           $('.passwordWrongSpan').text("Please use the option Verify Account for OTP verification.");
           $('.passwordWrongSpan').addClass('passwordWrongWar');
          }else if(data == "Blocked"){
           $('#loginModal').show();
           $('.passwordWrongSpan').text("You're profile is blocked. Please contact Admin.");
           $('.passwordWrongSpan').addClass('passwordWrongWar');
          }else{    
            $('#loginModal').show();
            $('.passwordWrongSpan').text("Please Enter Valid Email or Password");
            $('.passwordWrongSpan').addClass('passwordWrongWar');         
          }
        });
      }else{
        $('.passwordWrongSpan').text("The email address or password you entered is not valid. Please try again");
        $('.passwordWrongSpan').addClass('passwordWrongWar');
      }
    }else{
      $('.passwordWrongSpan').text("Please enter your registered email address.");
      $('.passwordWrongSpan').addClass('passwordWrongWar');
    }

    
    // console.log('data');
    return false;
  },

  // 'click .frgtClose': function(event) {
  //   $('.modalBox').hide();
  // },

   'click .frgtClose': function(event) {
    $('#forgotPwdModal').modal('hide');
  },
  'click .forgotPwd':function(event){
    $('.passwordWrongSpan').removeClass('passwordWrongWar');
    $('label.error').hide();
    $('input[type="text"]').val('');
    $('input[type="password"]').val('');
    $('input[type="tel"]').val('');
    $('input[type="email"]').val('');
    $('.loginLabel').removeClass('active');
    $('.forgotEmailMessage').css('display','none');
    $('.disableBtn').removeAttr('disabled');
  },

  'click .verifyotp':function(event){
    $('#loginModal').modal('hide');
    $('.modal-backdrop').hide();
    $('.passwordWrongSpan').removeClass('passwordWrongWar');
    $('label.error').hide();
    $('input[type="text"]').val('');
    $('input[type="password"]').val('');
    $('input[type="tel"]').val('');
    $('input[type="email"]').val('');
    $('.loginLabel').removeClass('active');
  },

});
 
// }

Template.header.events({
  
  'click .loginClosenew': function(event) {
    $('.modal-backdrop').hide();
  },
});


Template.loginScreen.onRendered(function(){
  $('.disableBtn').attr('disabled','disabled');

  $.validator.addMethod("regex_1", function(value, element, regexpr) {          

      return regexpr.test(value);
  }, "Please Enter valid Email Address");

   $(".loginForm").validate({
    rules:{
            email:{
            regex_1: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
        
         
      }
   });


    if($('.loginForm').find('input').val() !== ''){
      $('.loginForm').find('input').prev('.loginLabel').addClass('active highlight');
    }

     $('.loginForm').find('input').on('keyup blur focus', function(e){
       var $this = $(this),
          label = $this.prev('.loginLabel');
          if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
              } else {
                label.addClass('active highlight');
              }
          } else if (e.type === 'blur') {
            if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
            } else {
              label.removeClass('highlight');   
            }   
          } else if (e.type === 'focus') {
            if( $this.val() === '' ) {
              label.removeClass('highlight'); 
            } 
            else if( $this.val() !== '' ) {
              label.addClass('highlight');
            }
          }

     });
      
});


