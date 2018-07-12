import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './adminDashboard.html';
import './commonAdmin/commonAdmin.js';

import './adminStatistics/adminStatistics.html';
import '../companysettings/companySettings.js';

import './adminStatistics/adminStatistics.html';
import './adminStatistics/adminStatistics.js';

import './catgManagement/catgManagement.html';
import './catgManagement/catgBulkUpload.html';
import './catgManagement/catgBulkUpload.js';
import './careerJoinUsForm/careerJoinUsForm.html';

import './userManagement/listofUser.html';
import './userManagement/adminAddRolesList.html';
import './userManagement/createUser.html';
import './userManagement/editMyProfileAdmin.html';
import './userManagement/UMlistOfUsers.js';
import './userManagement/UMeditMyProfile.js';

import './masterData/businessBlkup.html';
import './masterData/businessBlkup.js';
import './masterData/masterData.js';

import './myBusiness/myBusinessAdmin.js';
import './myBusiness/editBusinessAdmin.html';
import '/imports/vendor/mybusiness/AboutBusiness/AboutBusiness.js';

import './businessBanner/businessBanner.html';
import './businessBanner/businessBanner.js';

import './businessAds/businessAds.js';

import './homePageBanner/homePageBanner.js';


import './editUser/editMyProfiles.html';
import './editUser/editMyProfiles.js';
import './editUser/createUsers.html';
import './editUser/createUsers.js';
import './editUser/configSettings.js';

import './discountManagement/discountManagement.js';

import '/imports/notifications/createEmailTemplate.html';
import '/imports/notifications/viewTemplate.html';
import '/imports/general/FAQ/FaqForm.html';
import '/imports/general/EditPages/editPages.html';
import '/imports/general/careers/AddNewJobForm.html';
import '/imports/general/careers/jobList.html';

import '/imports/admin/contactUsList/contactUsList.js';

import '/imports/admin/salesReport/salesReport.js';
import '/imports/admin/salesReportBanner/salesReportBanner.js';


import { State } from '/imports/api/masterData/stateMaster.js';
import { City } from '/imports/api/masterData/cityMaster.js';
import { GeneralContent } from '../api/webPages/generalContentMaster.js';
import { Career } from '../api/webPages/joinusMaster.js';
import { Newjob } from '../api/webPages/AddNewJobMaster.js';
import { ResumeImage } from '/imports/videoUploadClient/resumeImageClient.js';
import ImageCompressor from 'image-compressor.js';

Template.careerJoinUsForm.helpers({
	careerData:function() {
		var careerDetails = [];
		var careerDetails = Career.find({}).fetch();
		// console.log("careerDetails: ",careerDetails);

		for(var i=0; i<careerDetails.length; i++){
			if(careerDetails[i].ResumeId){
				var resumeData = ResumeImage.findOne({"_id":careerDetails[i].ResumeId});
				if(resumeData){
					careerDetails[i].resume = resumeData					
				}
			}
			careerDetails[i] = {
					_id					: careerDetails[i]._id,
					name 				: careerDetails[i].name,
					email 				: careerDetails[i].email,
					MobileNo 			: careerDetails[i].MobileNo,
					Qualification 		: careerDetails[i].Qualification,
					PostForApply 		: careerDetails[i].PostForApply,
					resume 				: careerDetails[i].resume,
					dateofPost 			: moment(careerDetails[i].createdAt).format('DD/MM/YYYY'),
				
				};
			// var dateofapplied = moment(careerDetails[i].createdAt).format('DD/MM/YYYY')
		}
		// console.log('careerDetails:',careerDetails);
		return careerDetails;
	},
});

Template.manageLocations.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
});

Template.manageCategoriesList.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
});

Template.myBusinessAdmin.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
});

Template.listOfBusiness.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
});

Template.businessBlkup.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});

Template.faqForm.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});

Template.editPages.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});

Template.createEmailTemplate.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});


Template.viewTemplate.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});

Template.careerJoinUsForm.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});


Template.jobList.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});


Template.listofUser.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});

Template.adminAddRolesList.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});

Template.createUsers.onRendered(()=>{
		var currentURL = FlowRouter.current().path;
		var actualURL = currentURL.substring(1);
		$('.sidebarlink').removeClass('active');
		$('.'+actualURL).addClass('active');
		// console.log('currentURL: ',currentURL,' | actualURL: ',actualURL);
});




adminDashboard = function () {  
  BlazeLayout.render("adminLayout",{main: 'adminDashboard'});
}

export { adminDashboard };

careerJoinUsForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'careerJoinUsForm'});
}

export { careerJoinUsForm };