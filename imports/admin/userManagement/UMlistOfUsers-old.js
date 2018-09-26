import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'
import { Bert } from 'meteor/themeteorchef:bert';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Review } from '/imports/api/reviewMaster.js';
import { FollowUser } from '/imports/api/userFollowMaster.js';

import '../../admin/commonAdmin/commonAdmin.js';
import './UMlistOfUsers.html';
import './UMdeleteUserConfirm.html';
import './listofUser.html';

Template.UMlistOfUsers.onCreated(function(){
	Meteor.subscribe('userfunction');
  Meteor.subscribe('rolefunction');
  Meteor.subscribe('allOrders');
  Session.set('roleSet','');
  var userCounts  = Counts.get('noOfUser');
  if (userCounts > 10) {
    Session.set('userListLimit',10);
    $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
  }else if(userCounts > 100){
    Session.set('userListLimit',100);
    $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
  }else if(userCounts > 200){
    Session.set('userListLimit',200);
    $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
  }else{
    Session.set('userListLimit',userCounts);
    $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
  }
});

Template.UMlistOfUsers.onRendered(function(){
  Session.set('roleSet','');
  var userCounts  = Counts.get('noOfUser');
  if (userCounts > 10) {
    Session.set('userListLimit',10);
    $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
  }else if(userCounts > 100){
    Session.set('userListLimit',100);
    $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
  }else if(userCounts > 200){
    Session.set('userListLimit',200);
    $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
  }else{
    Session.set('userListLimit',userCounts);
    $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
  }
});


Template.UMlistOfUsers.helpers({

  users:function() {
    var userCounts  = Counts.get('noOfUser');
    if (userCounts > 10) {
      Session.set('userListLimit',10);
      $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
    }else if(userCounts > 100){
      Session.set('userListLimit',100);
      $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
    }else if(userCounts > 200){
      Session.set('userListLimit',200);
      $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
    }else{
      Session.set('userListLimit',userCounts);
      $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
    }
    
    var roleSetArray = [];
    var roleSetVar = Session.get('roleSet');
    var listLimit = Session.get('userListLimit');

    var user       =  Meteor.users.find({},{ limit: listLimit}).fetch();
    if(user){
      var userCount =  user.length;
      console.log("roleSetVar = ", roleSetVar);

      if(roleSetVar){ 
        if(roleSetVar == 'all' || roleSetVar == ''){
          for(i=0;i<userCount;i++){

              console.log(i, ".) ", user[i].profile.name);

              if(user[i].roles){
                if(user[i].roles.indexOf('admin') >= 0){
                  var adminrole = true;                
                }else{
                  var adminrole = false;
                }
              }
              if(user[i].status){
                if(user[i].status.lastLogin){
                  if(user[i].emails){
                      if(user[i].emails[0].address){
                        roleSetArray.push({
                          'SrNo'                  : i,
                          '_id'                   : user[i]._id,
                          'emails'                : user[i].emails[0].address,
                          'status'                : user[i].profile.status,
                          'roles'                 : user[i].roles,
                          'createdAt'             : user[i].createdAt,
                          'lastLogin'             : user[i].status.lastLogin.date,
                          'adminrole'             : adminrole,
                        });    
                      }
                   }else{
                      roleSetArray.push({
                        'SrNo'                  : i,
                        '_id'                   : user[i]._id,
                        'emails'                : user[i].services.facebook.email,
                        'status'                : user[i].profile.status,
                        'roles'                 : user[i].roles,
                        'createdAt'             : user[i].createdAt,
                        'lastLogin'             : user[i].status.lastLogin.date,
                        'adminrole'             : adminrole,
                      });
                  }
                }else{
                  if(user[i].emails){
                      if(user[i].emails[0].address){
                        roleSetArray.push({
                          'SrNo'                  : i,
                          '_id'                   : user[i]._id,
                          'emails'                : user[i].emails[0].address,
                          'status'                : user[i].profile.status,
                          'roles'                 : user[i].roles,
                          'createdAt'             : user[i].createdAt,
                          'lastLogin'             : '',
                          'adminrole'             : adminrole,
                        });    
                      }
                  }else{
                      roleSetArray.push({
                        'SrNo'                  : i,
                        '_id'                   : user[i]._id,
                        'emails'                : user[i].services.facebook.email,
                        'status'                : user[i].profile.status,
                        'roles'                 : user[i].roles,
                        'createdAt'             : user[i].createdAt,
                        'lastLogin'             : '',
                        'adminrole'             : adminrole,
                      });
                  }
                }
              }else{
                if(user[i].emails){
                      if(user[i].emails[0].address){
                        roleSetArray.push({
                          'SrNo'                  : i,
                          '_id'                   : user[i]._id,
                          'emails'                : user[i].emails[0].address,
                          'status'                : user[i].profile.status,
                          'roles'                 : user[i].roles,
                          'createdAt'             : user[i].createdAt,
                          'lastLogin'             : '',
                          'adminrole'             : adminrole,
                        });    
                      }
                  }else{
                      roleSetArray.push({
                        'SrNo'                  : i,
                        '_id'                   : user[i]._id,
                        'emails'                : user[i].services.facebook.email,
                        'status'                : user[i].profile.status,
                        'roles'                 : user[i].roles,
                        'createdAt'             : user[i].createdAt,
                        'lastLogin'             : '',
                        'adminrole'             : adminrole,
                      });
                  }
              }
          }//roleSetVar all loop
        }else{
            for(i=0;i<userCount;i++){
              if(user[i].roles){
                if(user[i].roles.indexOf('admin') >= 0){
                  var adminrole = true;                
                }else{
                  var adminrole = false;
                }
              }

              if ( Roles.userIsInRole( user[i]._id, roleSetVar ) ) {
                if(user[i].status){
                  if(user[i].status.lastLogin){
                    if(user[i].emails){
                        if(user[i].emails[0].address){
                          roleSetArray.push({
                            'SrNo'                  : i,
                            '_id'                   : user[i]._id,
                            'emails'                : user[i].emails[0].address,
                            'status'                : user[i].profile.status,
                            'roles'                 : user[i].roles,
                            'createdAt'             : user[i].createdAt,
                            'lastLogin'             : user[i].status.lastLogin.date,
                            'adminrole'             : adminrole,
                          });    
                        }
                    }else{
                        roleSetArray.push({
                          'SrNo'                  : i,
                          '_id'                   : user[i]._id,
                          'emails'                : user[i].services.facebook.email,
                          'status'                : user[i].profile.status,
                          'roles'                 : user[i].roles,
                          'createdAt'             : user[i].createdAt,
                          'lastLogin'             : user[i].status.lastLogin.date,
                          'adminrole'             : adminrole,
                        });
                    }
                  }else{
                    if(user[i].emails){
                        if(user[i].emails[0].address){
                          roleSetArray.push({
                            'SrNo'                  : i,
                            '_id'                   : user[i]._id,
                            'emails'                : user[i].emails[0].address,
                            'status'                : user[i].profile.status,
                            'roles'                 : user[i].roles,
                            'createdAt'             : user[i].createdAt,
                            'lastLogin'             : '',
                            'adminrole'             : adminrole,
                          }); 
                        }
                    }else{
                        roleSetArray.push({
                          'SrNo'                  : i,
                          '_id'                   : user[i]._id,
                          'emails'                : user[i].services.facebook.email,
                          'status'                : user[i].profile.status,
                          'roles'                 : user[i].roles,
                          'createdAt'             : user[i].createdAt,
                          'lastLogin'             : '',
                          'adminrole'             : adminrole,
                        });
                      }
                  }
              }else{
                if(user[i].emails){
                    if(user[i].emails[0].address){
                      roleSetArray.push({
                        'SrNo'                  : i,
                        '_id'                   : user[i]._id,
                        'emails'                : user[i].emails[0].address,
                        'status'                : user[i].profile.status,
                        'roles'                 : user[i].roles,
                        'createdAt'             : user[i].createdAt,
                        'lastLogin'             : '',
                        'adminrole'             : adminrole,
                      }); 
                    }
                  }else{
                    roleSetArray.push({
                      'SrNo'                  : i,
                      '_id'                   : user[i]._id,
                      'emails'                : user[i].services.facebook.email,
                      'status'                : user[i].profile.status,
                      'roles'                 : user[i].roles,
                      'createdAt'             : user[i].createdAt,
                      'lastLogin'             : '',
                      'adminrole'             : adminrole,
                    });
                  }
                }
              }
          }
        }   
      }else{
          for(i=0;i<userCount;i++){

              if(user[i].roles){
                if(user[i].roles.indexOf('admin') >= 0){
                  var adminrole = true;                
                }else{
                  var adminrole = false;
                }
              }

            if(user[i].status){
              if(user[i].status.lastLogin){

                console.log(i, ".) ", user[i].profile.name, " | ", user[i].emails);
                if(user[i].emails){
                    if(user[i].emails[0].address){
                      roleSetArray.push({
                        'SrNo'                  : i,
                        '_id'                   : user[i]._id,
                        'emails'                : user[i].emails[0].address,
                        'status'                : user[i].profile.status,
                        'roles'                 : user[i].roles,
                        'createdAt'             : user[i].createdAt,
                        'lastLogin'             : user[i].status.lastLogin.date,
                        'adminrole'             : adminrole,
                      });
                    }
                  }else{
                    roleSetArray.push({
                      'SrNo'                  : i,
                      '_id'                   : user[i]._id,
                      'emails'                : user[i].services.facebook.email,
                      'status'                : user[i].profile.status,
                      'roles'                 : user[i].roles,
                      'createdAt'             : user[i].createdAt,
                      'lastLogin'             : user[i].status.lastLogin.date,
                      'adminrole'             : adminrole,
                    });
                  }
                
              }else{
                if(user[i].emails){
                    if(user[i].emails[0].address){
                      roleSetArray.push({
                        'SrNo'                  : i,
                        '_id'                   : user[i]._id,
                        'emails'                : user[i].emails[0].address,
                        'status'                : user[i].profile.status,
                        'roles'                 : user[i].roles,
                        'createdAt'             : user[i].createdAt,
                        'lastLogin'             : '',
                        'adminrole'             : adminrole,
                      });
                    }
                  }else{
                    roleSetArray.push({
                      'SrNo'                  : i,
                      '_id'                   : user[i]._id,
                      'emails'                : user[i].services.facebook.email,
                      'status'                : user[i].profile.status,
                      'roles'                 : user[i].roles,
                      'createdAt'             : user[i].createdAt,
                      'lastLogin'             : '',
                      'adminrole'             : adminrole,
                    });
                  }
                }
            }else{
              if(user[i].emails){
                  if(user[i].emails[0].address){
                    roleSetArray.push({
                      'SrNo'                  : i,
                      '_id'                   : user[i]._id,
                      'emails'                : user[i].emails[0].address,
                      'status'                : user[i].profile.status,
                      'roles'                 : user[i].roles,
                      'createdAt'             : user[i].createdAt,
                      'lastLogin'             : '',
                      'adminrole'             : adminrole,
                    });
                  }
                }else{
                  roleSetArray.push({
                    'SrNo'                  : i,
                    '_id'                   : user[i]._id,
                    'emails'                : user[i].services.facebook.email,
                    'status'                : user[i].profile.status,
                    'roles'                 : user[i].roles,
                    'createdAt'             : user[i].createdAt,
                    'lastLogin'             : '',
                    'adminrole'             : adminrole,
                  });
                }
            }
            // console.log('roleSetArray1 ',roleSetArray);
            
          }
      }
      console.log('roleSetArray 1',roleSetArray);
      return roleSetArray;
    } 
    
  },

  roles() {
    return Meteor.roles.find({});
  },
});

Template.UMdeleteUserConfirm.events({
  'click .deleteUserConfirm': function(event){
    event.preventDefault();
    var uid = FlowRouter.getParam('userId');
    // console.log('uid:',uid);
    // console.log('uid : ' + uid);
    
    Meteor.call('deleteUser', uid,
      (err, res) => {
      if (err) {
          Bert.alert('Some error occured while deleting this record. Please contact System Admin!');
      } else {
          $('.modal-backdrop').hide(); 
          // Bert.alert('User deleted..');
          Bert.alert('User deleted successfully!','success','growl-top-right');
          
      }
    });
    FlowRouter.go('/listOfUsers');
  },
});

Template.UMuser.events({
  'click .deleteUserConfirmOne': function(event){
    event.preventDefault();
    var uid = event.target.id;
    // console.log('uidone click:',uid);
    // console.log('userId:',FollowUser.find({"followUserId":'gSPxWHc5MojcW3dGw'}).fetch());
    // console.log('1:',FollowUser.find({"userId":'gSPxWHc5MojcW3dGw'}).fetch());

    Meteor.call('deleteUser', uid,
      (err, res) => {
      if (err) {
          console.log('error');
          // alert('error');
      } else {
          $('.modal-backdrop').hide(); 
          // Bert.alert('User deleted..');
          Bert.alert('User deleted successfully!','success','growl-top-right');

      }
    });
  }
});

Template.UMlistOfUsers.events({
  'click .deleteUserConfirm': function(event){
    event.preventDefault();
    var uid = event.target.id;
    // console.log('uidone :',uid);
    Meteor.call('deleteUser', uid,
      (err, res) => {
      if (err) {
        alert('Some error occured while deleting this record. Please contact System Admin!');
      } else {
        $('.modal-backdrop').hide(); 
        // Bert.alert('User deleted..');
        Bert.alert('User deleted successfully!','success','growl-top-right');   
      }
    });
  },

  'click .allSelector': function (event) {
    var admin = Meteor.userId();
    // console.log('admin :',admin);
    // event.preventDefault();
    if(event.target.checked){
      $('.userCheckbox').prop('checked',true);
    }else{
      $('.userCheckbox').prop('checked',false);
    }
  },

  'change .actionSelect': function (event, template) {
    event.preventDefault();

    var target = event.target; 
    var selectedValue = event.target.value;
    var keywordSelectedValue = selectedValue.split('$')[0];
    var role = selectedValue.split('$')[1];

    // console.log('keywordSelectedValue : ' + keywordSelectedValue);
    // console.log('role : ' + role);

    var userCounts  = Meteor.users.find({"roles":selectedValue}).fetch();
    // console.log(userCounts);
    if (userCounts.length > 10) {
      Session.set('userListLimit',10);
      $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
    }else if(userCounts.length > 100){
      Session.set('userListLimit',100);
      $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
    }else if(userCounts.length > 200){
      Session.set('userListLimit',200);
      $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
    }else{
      Session.set('userListLimit',userCounts);
      $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
      $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
    }

    var selectedUsers = template.findAll( "input[type=checkbox]:checked");
    // console.log(selectedUsers );
    // $('#myCheckbox').prop('checked', false);
    var checkedUsersList = _.map(selectedUsers, function(item) {
      return item.defaultValue;
    });
    $(selectedUsers).prop('checked', false);
    // console.log("checkedUsersList : " + checkedUsersList);

  	switch(keywordSelectedValue){
  		case '-':
  		  // console.log('selectedValue:' + selectedValue);
  			break;

  		case 'block_selected':
		  	Meteor.call('blockSelectedUser', checkedUsersList, function(error, result){
          if(result){
            Bert.alert('User Blocked Successfully','success','growl-top-right');
          }
        });
  			break;

  		case 'active_selected':
		  	Meteor.call('activeSelectedUser', checkedUsersList, function(error, result){
          if(result){
            Bert.alert('User Activated Successfully','success','growl-top-right');
          }
        });
  			break;

  		case 'cancel_selected':
        var confirmDelete = window.confirm("Are you sure you want to remove this record?"+ Meteor.users.find({'_id' : checkedUsersList}));
		  	if(confirmDelete) {
		  		Meteor.call('deleteSelectedUser', checkedUsersList, function(error, result){
          if(error){
            // nothing
          } else{
            Bert.alert('User Account Canceled Successfully','success','growl-top-right');
          }
        });
		  	}
  			break;

  		case 'add':
        Meteor.call('addRoleToUser', role, checkedUsersList, function(error, result){
          if(error){
            // nothing
          } else{
            Bert.alert('Role Added Successfully','success','growl-top-right');
          }
        });

  			break;

  		case 'remove':
        Meteor.call('removeRoleFromUser', role, checkedUsersList, function(error, result){
          if(error){
            // nothing
          } else{
            Bert.alert('Role Removed Successfully','success','growl-top-right');
          }
        });
  			break;
  	}
    
  },

  'change .roleFilter': function (event, template) {
    event.preventDefault();
    var target        = event.target; 
    var selectedValue = event.target.value;
    // console.log('selectedValue : ' + selectedValue);
    Session.set("roleSet", selectedValue);
  },

  'click .loadMoreRows50': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRows50 .spinner').show();
    var nextLimitBus50 = Session.get('userListLimit');
    if(nextLimitBus50 != 0){
      var nextLimit = Session.get('userListLimit') + 50;
      var userCounts = Counts.get('noOfUser');
      if(userCounts > nextLimit){
        Session.set('userListLimit',nextLimit);
        if (userCounts > 10) {
          $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
        }else if(userCounts > 100){
          $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
        }else if(userCounts > 200){
          $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
        }else{
          $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
        }
      }else{
        Session.set('userListLimit',userCounts);
        $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
      }
    }
  },

  'click .loadMoreRows100': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRows100 .spinner').show();
    var nextLimitBus100 = Session.get('userListLimit');
    if(nextLimitBus100 != 0){
      var nextLimit = Session.get('userListLimit') + 100;
      var userCounts = Counts.get('noOfUser');
      if(userCounts > nextLimit){
        Session.set('userListLimit',nextLimit);
        if (userCounts > 10) {
          $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
        }else if(userCounts > 100){
          $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
        }else if(userCounts > 200){
          $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
        }else{
          $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
        }
      }else{
        Session.set('userListLimit',userCounts);
        $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
      }
    }
  },

  'click .loadMoreRowsRest': function(event){
    event.preventDefault();
    $('.spinner').hide();
    $('.loadMoreRowsRest .spinner').show();
    var nextLimit = Counts.get('noOfUser');
    Session.set('userListLimit',nextLimit);
    $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
    $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
  },

  'keyup #searchUser': _.throttle(function(event) {
    event.preventDefault();
    // Session.set('userListLimit',0);
    var searchText = event.currentTarget.value;
    var filter = searchText.toUpperCase();
    var table = $("#userListTable");
        // console.log('userListTable ==>',userListTable);
        table.find('tr').each(function(index, row)
    {
      var allCells = $(row).find('td');
      console.log(allCells.length);
      if(allCells.length > 0){
        if (allCells.length > 10) {
          Session.set('userListLimit',10);
          $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
        }else if(allCells.length > 100){
          Session.set('userListLimit',100);
          $('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
        }else if(allCells.length > 200){
          Session.set('userListLimit',200);
          $('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
        }else{
          Session.set('userListLimit',allCells.length);
          $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
          $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
        }

        var found = false;
        allCells.each(function(index, td)
        {
          var regExp = new RegExp(searchText, 'i');
          if(regExp.test($(td).text().toUpperCase()))
          {
            found = true;
            return false;
          }
        });
        if(found == true)$(row).show();else $(row).hide();
      }else{
        Session.set('userListLimit',allCells.length);
        $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
        $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
      }
    });
  }, 200),

});


UI.registerHelper('timeAgo', function(datetime) {
  if(datetime == ''){
    return 'Never Logged In';
  }else{
    Session.get('time');
    return moment(datetime).fromNow();
  }
});

setInterval(function() {
    Session.set("time", new Date())
}, 60); //Every minute




listOfUsersForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'listofUser'});
}

export { listOfUsersForm };

UMdeleteUserConfirmForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'UMdeleteUserConfirm'});
}

export { UMdeleteUserConfirmForm };