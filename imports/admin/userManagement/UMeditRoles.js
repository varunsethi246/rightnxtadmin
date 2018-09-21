import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './UMeditRoles.html';

Template.UMeditRoles.onCreated(function(){
	Meteor.subscribe('rolefunction');

});

Template.UMeditRoles.helpers({
	editroles: ()=> {
		var userId = FlowRouter.getParam('userId');
		return Meteor.roles.findOne({'_id': userId}) ;
	},

});

Template.UMeditRoles.events({
 'submit .editroles': function (event) {
      event.preventDefault();

      // var roleId    = $("input[name=Namerole]").attr("id");
      var roleId    = event.target.id;
      
      // console.log("roleId : " + roleId);
      var roleName  = $("input[name="+roleId+"-Namerole]").val();
      // console.log("roleName : " + roleName);

      Meteor.call('updaterole', roleId, roleName,
                function(error, result) { 
                    if (error) {
                        console.log ( error ); 
                    } //info about what went wrong 
                    else {
                      $('.dismissModalEdit').modal('hide');
                      $('.modal-backdrop').hide();
                         // FlowRouter.go("/UMroles");
                    }//the _id of new object if successful
                }

// 
      	);
 },

});