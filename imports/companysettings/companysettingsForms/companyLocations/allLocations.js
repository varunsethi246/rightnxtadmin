import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './allLocations.html';

import { CompanySettings } from '/imports/api/companysettingsAPI.js';
// Meteor.subscribe('companySettings'); 

	Template.allLocations.helpers({
  		'allLocationsinfo' : function() {
    		return CompanySettings.find({'companyId':101});
		},

        'allLocationsinformationhead' : function() {
            var CSObject = CompanySettings.findOne({'companyId':101});
            if(CSObject){
                if(CSObject.companyLocationsInfo.length > 0){
                        var mainLocation = {
                     'mainLocation': CSObject.companyLocationsInfo[0].mainLocation,
                    }
                }else{
                    var mainLocation = {
                     'mainLocation':'none',
                    }
                }
            }else{
                var mainLocation = {
                 'mainLocation':'none',
                }
            }
            return mainLocation;
        },
        'isSelectedLocation':function(mainLocation){
            return this.mainLocation == mainLocation;
        }
	});


	Template.allLocations.events({
		'click .deleteLocations':function(event){
			event.preventDefault();
        	var selectedLocation = this;
			var id = event.currentTarget.name;
			// console.log(id);
			// console.log(selectedLocation);
			var confirm = window.confirm("Do you really want to delete this record?");

          	if(confirm){
             $('#companyNewLocation').val('');
             $('#companyNewAddress').val('');
             $('#companyPincodeLoc').val('');
             $('#companyCityLoc').val('Pune');
             $('#companyStateLoc').val('Maharashtra');
             $('#companyCountryLoc').val('India');
             // $('#companyNewLocation').removeClass('error');
             // $('#companyNewAddress').removeClass('error');
             // $('#companyPincode').removeClass('error');
             Session.set('editLocation',false);
             Session.set('companyLocationId','');
           	 Meteor.call('removeallCompanyLocations', selectedLocation);
          	}

		},

		'click .editLocations': function(e) {
        e.preventDefault();
        $('.locationFormWrapper').css('display','block');
        // var locationObj = CompanySettings.find({'companyId':'101'});
	        $('.HRMSTextbox').css({
	        'background-color': 'transparent',
	        'color': '#000',
	        'font-weight':'bold',
	        'font-size': '15px'
    	});
        var rule = this;
        console.log('rule: ',rule);
        var address = rule.companyAddress;
        var id = {id : e.currentTarget.name};

        FlowRouter.setQueryParams(id);
        if(this.mainLocation){
            $('input[name="companyNewLocation"]').val(this.mainLocation);
        }else{
            $('input[name="companyNewLocation"]').val(this.companyLocation);
        }
        $('input[name="companyNewAddress"]').val(this.companyAddress);
        $('input[name="companyPincodeLoc"]').val(this.companyPincode);
        $('select[name="companyCityLoc"]').val(this.companyCity);
        $('select[name="companyStateLoc"]').val(this.companyState);
        $('select[name="companyCountryLoc"]').val(this.companyCountry);
        Session.set('editLocation',true);        
        Session.set('companyAddress',address);        
        Session.set('companyLocationId',this.companyLocationId);        
    }



		
	});
