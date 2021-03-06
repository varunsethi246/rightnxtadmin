import './myBusinessAdmin.html';
import './listOfBusiness.html';
import './addImagesVidAdmin.html';
import './openCloseDayAdmin.html';
import './aboutOwnerAdmin.html';
import './addNewBusInfoAdmin.html';
import './editBusinessAdmin.html';
import '/imports/admin/commonAdmin/commonAdmin.js';
import '/imports/vendor/mybusiness/AboutBusiness/AboutBusiness.js';
import '/imports/vendor/mybusiness/AboutBusiness/VendorBusinessInformation.js';
import '/imports/vendor/mybusiness/AboutBusiness/VendorOpeningAndClosing.js';
import '/imports/vendor/mybusiness/AboutBusiness/vendorAboutOwner.js';
import '/imports/vendor/mybusiness/AboutBusiness/VendorImagesVideos.js';
import '/imports/vendor/AddNewBusiness/addvendorBusInfo.js';
import '/imports/common/starRating2.html';
import '/imports/vendor/AddNewBusiness/AddvendorOpeningAndClosing.js'
import '/imports/vendor/AddNewBusiness/AddvendorAboutOwner.js'
import '/imports/vendor/AddNewBusiness/AddvendorImagesVideos.js'



import { Business } from '/imports/api/businessMaster.js';
import { State } from '../../api/masterData/stateMaster.js';
import { City } from '../../api/masterData/cityMaster.js';
import { Area } from '../../api/masterData/areaMaster.js';
import { users } from '../../api/userMasterAPI.js';
import { BusinessVideoUpload } from '/client/cfsjs/businessVideo.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { BizVideo } from '/imports/videoUploadClient/videoUpload.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BusinessImage } from '/imports/videoUploadClient/businessImageClient.js';
import ImageCompressor from 'image-compressor.js';
import { OwnerImage } from '/imports/videoUploadClient/ownerImageClient.js';
import { BusinessMenu } from '/imports/videoUploadClient/businessMenuClient.js';

var videoListCount = 0;

var files = [];
var filesM = [];
var filesV = [];
var filesO = [];
var counterImg = 0;
var counterMenu = 0;
var searchButton = 0;

var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

var fields = ['businessTitle'];

listbusinessSearchVar = new SearchSource('listbusinessSearch', fields, options);

buildRegExp = function (searchText) {
	var words = searchText.trim().split(/[ \-\:]+/);
    console.log('words',words);
    var exps = _.map(words, function(word) {
        return "(?=.*" + word + ")";
    });
    console.log('exps',exps);

    var fullExp = exps.join('') + ".+";
    console.log('fullExp',fullExp);
    return new RegExp(fullExp, "i");
};

getBusinessSearchData = function (status,searchValue,businessCount) {
	// console.log('searchValue',searchValue);
	Meteor.call("getSearchData",status,searchValue,businessCount,(err,res)=>{
    	if(err){}else{
            // console.log('res',res);
            if(status=='active'){
            	var noOfBusiness = Counts.get('noOfBusinessActive')
            }else{
            	var noOfBusiness = Counts.get('noOfBusinessInactive')
            }
            // console.log('noOfBusiness',noOfBusiness);
            if(res){
				$('.loadMoreRows50 .spinner').hide();
            	if(noOfBusiness&&noOfBusiness<businessCount){
					Session.set('businessArray',res);
            		$('.loadMoreRows50').addClass('hideMore50').removeClass('showMore50');
            	}else{
	            	if (res.length > 15) {
						Session.set('businessArray',res.slice(0,(res.length-1)));
				        $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
					}else{
						Session.set('businessArray',res);
				        $('.loadMoreRows50').addClass('hideMore50').removeClass('showMore50');
					}
            	}
            }
        }
    });
};

Template.listOfBusiness.onRendered( ()=>{
	$('[data-toggle="tooltip"]').tooltip();
	$('.actInactAdminOn').addClass('actInactAdminColor');
	Session.set('busListAct','activeList');
	$("html,body").scrollTop(0);

	files = [];
	filesM = [];
	counterImg = 0;
	counterMenu = 0;
	videoListCount = 0;

	getBusinessSearchData('active','',0);

	// Session.set('businessArray',null);
 //    var businessCount  = Business.find({"status":"active"}).count();
	// if (businessCount > 15) {
	// 	Session.set('businessListLimit',15);
 //        $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
	// }else if(businessCount > 50){
	// 	// Session.set('businessListLimit',50);
	// 	$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
	// }else if(businessCount > 100){
	// 	// Session.set('businessListLimit',100);
	// 	$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
	// }else{
	// 	// Session.set('businessListLimit',businessCount);
	// 	$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// }
});

Template.listOfBusiness.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
    this.subscribe('getBizVideo');
});

Template.listOfBusiness.helpers({
	currentUpload: function() {
        return Template.instance().currentUpload.get();
    },

    files: function() {
		var businessLink = FlowRouter.getParam('businessLink');
    	var bussData = Business.findOne({"businessLink":businessLink});
    	if(bussData){
	        var data = BizVideo.find({"_id":bussData.businessVideo}).fetch();
	        return data;
	    }
    },
	'Details' : function(){
		// var listLimit = Session.get('businessListLimit');
		// var setValue = Session.get('busListAct');
		var data = [];
		var businessArray = Session.get('businessArray');
		data = businessArray; 
		// console.log('listLimit',listLimit);
		// if(setValue == 'activeList') {
		// 	if(businessArray){
		// 		data = businessArray; 
		// 	}else{
		// 		data = Business.find({"status":"active"},{sort:{'createdAt': -1}, limit: listLimit}).fetch();
		// 	}
		// } else {
		// 	if(businessArray){
		// 		data = businessArray; 
		// 	}else{
		// 		data = Business.find({"status":"inactive"},{sort:{'createdAt': -1}, limit: listLimit}).fetch();
		// 	}
		// }
		 
		// console.log('data ', data.length);
		if(data){
			for(i=0; i< data.length; i++){
				// var ownerDetails = Meteor.users.findOne({"_id":data[i].businessOwnerId});
				var ownerDetails = Meteor.users.findOne({"_id":data[i].createdBy});
				// console.log('ownerDetails :',ownerDetails);
				if(ownerDetails){
					data[i].userEmailID = ownerDetails.emails[0].address;
					data[i].userEmailIDVal = true;
					if(ownerDetails.profile.name){
						data[i].createdByName = ownerDetails.profile.name;
					}else if(ownerDetails.username){
						data[i].createdByName = ownerDetails.username;
					}else{
						data[i].createdByName = ownerDetails.emails[0].address;
					}

				}else{
					var loggedInUser = Meteor.user();
					if (Roles.userIsInRole(loggedInUser, ['Staff'])) {
						data[i].createdByName = 'Staff';
					}else{
						data[i].createdByName = 'admin';
					}
					data[i].userEmailIDVal = false;
				}
				// for (var j = 0; j < data[i].createdBy.length; j++) {
				// 	for (var k = 0; k < data[i].createdBy[j].roles.length; k++) {
						
				// 	console.log('data[i].createdBy[j].roles',data[i].createdBy[j].roles[0]);
				// 	}
				// }
				// 	console.log('staff :',data[i].createdBy.roles);

				// if (data[i].createdBy.roles == 'Staff') {
				// 	console.log('staff :',data[i].createdBy.roles);
				// 	data[i].createdByStaff == 'staffCreatedy';
				// }

				// console.log(data[i].createdBy,Meteor.userId());
				if(data[i].createdBy == Meteor.userId()){
					data[i].showToOnly = true;		
				}else{
					data[i].showToOnly = false;		
				}

				if(data[i].status == "inactive"){
					data[i].statusTooltipone = 'Activate';
				}else{
					data[i].statusTooltipone = 'Deactivate';
				}
				if(data[i].businessAnythingElse){
					data[i].businessAnythingElseShow = "adminBusListAnythEls";
				}else{
					data[i].businessAnythingElseShow = "";
				}

				if(data[i].StatusReview){
					if(data[i].StatusReview == "Reject"){
						data[i].reason = "Rejected";
						data[i].isRejected = true;
					}else{
						data[i].reason = "Approved";
						data[i].isRejected = false;
					}
				}else{
					data[i].isRejected = true;
				}
	  		}
			// console.log('before return data ', data);
		    return data;
		}
		
	},
	'businessImgCount' : function(img){
		if(img){
			var count = img.length;
			if(count){
				return count;
			}else{
				return 0;
			}
		}else{
			return 0;
		}
	},
	'businessMenuCount' : function(img){
		if(img){
			var count = img.length;
			if(count){
				return count;
			}else{
				return 0;
			}
		}else{
			return 0;
		}
	},
	'businessVideos' : function(video){
		if(video){
			if(video != '' ){
				return 1;
			}else{
				return 0;
			}
		}else{
			return 0;
		}
	},
	'ownerImg' : function(img){
		if(img){
			return 1;
		}else{
			return 0;
		}
	},
	
	'showStatus' : function(status){
		if(status == 'active'){

			return true;

		}else{
			return false;
		}
	},
});

Template.listOfBusiness.events({
	'mouseover a[data-toggle="tooltip"]'(event) {
		// console.log(event);
		$('[data-toggle="tooltip"]').tooltip();
	},
	'change #fileInputs'(e, template) {
	    if (e.currentTarget.files && e.currentTarget.files[0]) {
	    		var businessLink  = $(e.currentTarget).attr("data-businessLink");
	    		// console.log('data-businessLink ',businessLink);
		      // We upload only one file, in case
		      // multiple files were selected
		      const upload = BizVideo.insert({
		        file: e.currentTarget.files[0],
		        streams: 'dynamic',
		        chunkSize: 'dynamic'
		      }, false);

		      upload.on('start', function () {
		        template.currentUpload.set(this);
		      });

		      upload.on('end', function (error, fileObj) {
		        if (error) {
		          alert('Error during upload: ' + error);
		        } else {
		          // alert('FilBee "' + fileObj._id + '" successfully uploaded');
		          Bert.alert('Business Video uploaded','success','growl-top-right');
		          	Meteor.call("updateVendorBulkVideo", businessLink,fileObj._id,
			          function(error, result) { 
			              if(error) {
			                  console.log ('Error Message: ' +error ); 
			              }else{
								  // process.exit();
								  
			              }
			        });

			        var file = e.target.files[0];
					var fileReader = new FileReader();
					if (file.type.match('image')) {
					fileReader.onload = function() {
					  var img = document.createElement('img');
					  img.src = fileReader.result;
					  document.getElementsByTagName('div')[0].appendChild(img);
					};
					fileReader.readAsDataURL(file);
					} else {
					fileReader.onload = function() {
					  var blob = new Blob([fileReader.result], {type: file.type});
					  var url = URL.createObjectURL(blob);
					  var video = document.createElement('video');
					  var timeupdate = function() {
					    if (snapImage()) {
					      video.removeEventListener('timeupdate', timeupdate);
					      video.pause();
					    }
					  };
					  video.addEventListener('loadeddata', function() {
					    if (snapImage()) {
					      video.removeEventListener('timeupdate', timeupdate);
					    }
					  });
					  var snapImage = function() {
					    var canvas = document.createElement('canvas');
					    canvas.width = video.videoWidth;
					    canvas.height = video.videoHeight;
					    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
					    var image = canvas.toDataURL();
					    var success = image.length > 100000;
					    if (success) {
					      var img = document.createElement('img');
					      img.src = image;
					      // console.log(img.src)
					      Meteor.call("createVideoThumbnail",img.src,fileObj._id,
					        function(error, result) { 
				              if(error) {
				                console.log ('Error Message: ' +error ); 
				              }else{
					        }
					      });
					      // document.getElementById('uniqueVid').appendChild(img);
					      URL.revokeObjectURL(url);
					    }
					    return success;
					  };
					  video.addEventListener('timeupdate', timeupdate);
					  video.preload = 'metadata';
					  video.src = url;
					  // Load video in Safari / IE11
					  video.muted = true;
					  video.playsInline = true;
					  video.play();
					};
					fileReader.readAsArrayBuffer(file);
					}
		        }
		        template.currentUpload.set(false);
		      });

		      upload.start();
		    }
	    // }
	},
	'click #reviewedstatusId': function(event){
		var busComment = $(event.currentTarget).parent().siblings('.adminReviewBusText').val();
		if(busComment){
			busComment = busComment.trim();
		}
		var Approve = "Approve";
		var busId = $(event.currentTarget).attr('data-busID');
		if(busId){
			Meteor.call('updateBusReviewComment', busId, busComment,Approve, function(error,result){
				if(error){
					//Do something
				} else {
					$('.modal-backdrop').hide();
				}
			});
		}
	},
	'click .rejectBusiness': function(event){
		var busComment = $(event.currentTarget).parent().siblings('.adminReviewBusText').val();
		if(busComment){
			busComment = busComment.trim();
		}
		var Reject = 'Reject';
		var busId = $(event.currentTarget).attr('data-inactiveBusID');
		if(busId){
			Meteor.call('updateBusInactivate', busId, busComment,Reject, function(error,result){
				if(error){
					//Do something
				} else {
					$('.modal-backdrop').hide();
				}
			});
		}
	},
	'change #businessImgfiles' : function(event){
		// alert('testing');
		$('#drag1').hide();
		var file = event.target.files; // FileList object\
		for(var j = 0 , f1;f1 = file[j]; j++){
			files[counterImg] = file[j];
			counterImg = counterImg + 1;
		}
		// Loop through the FileList and render image files as thumbnails.
		
		for (var i = 0, f; f = file[i]; i++) {
			file[i].businessLink = Session.get('SessionBusinessLink');
			
		    // Only process image files.
		    if (!f.type.match('image.*')) {
		      continue;
			}

			var reader = new FileReader();
			
			// Closure to capture the file information.
		    reader.onload = (function(theFile) {
		      return function(e) {
		        // Render thumbnail.

		        var span = document.createElement('span');
		        span.innerHTML = ['<img class="draggedImg" src="', e.target.result,
		                          '" title="', escape(theFile.name), '"/>'].join('');
		        document.getElementById('businessImglist').insertBefore(span, null);
		        
		      };
		    })(f); //end of onload


		    // Read in the image file as a data URL.
		    reader.readAsDataURL(f);
		    
		}// end of for loop

	},

	'click #saveBusinessImg' : function(event){
		var businessLink = $(event.target).attr('data-Link');
		
		// var businessLink = FlowRouter.getParam('businessLink');
		for(i = 0 ; i < files.length; i++){
			const imageCompressor = new ImageCompressor();
		      imageCompressor.compress(files[i])
		        .then((result) => {
		          // console.log(result);

		          // Handle the compressed image file.
		          // We upload only one file, in case
		        // multiple files were selected
		        const upload = BusinessImage.insert({
		          file: result,
		          streams: 'dynamic',
		          chunkSize: 'dynamic',
		          // imagetype: 'profile',
		        }, false);

		        upload.on('start', function () {
		          // template.currentUpload.set(this);
		        });

		        upload.on('end', function (error, fileObj) {
		          if (error) {
		            // alert('Error during upload: ' + error);
		            console.log('Error during upload 1: ' + error);
		            console.log('Error during upload 1: ' + error.reason);
		          } else {
		            // alert('File "' + fileObj._id + '" successfully uploaded');
		            Bert.alert('Business Image uploaded.','success','growl-top-right');
		            // console.log(fileObj._id);
		            // Session.set("vendorImgFilePath",fileObj._id);
		            var imgId =  fileObj._id ;
			        Meteor.call("updateVendorBulkImg", businessLink,imgId,
			          function(error, result) { 
			              if(error) {
			                  console.log ('Error Message: ' + error ); 
			              }else{
							// console.log('img upload ', fileObj._id);	
			              }

			        });
		          }
		          // template.currentUpload.set(false);
		        });

		        upload.start();
		        })
		        .catch((err) => {
		          // Handle the error
		    }) 
		}
		$('#businessImglist').empty();
		$('#drag1').show();
		counterImg = 0;
		files=[];
		$('#businessImgfiles').val('');
	},

	'change #businessMenufiles' : function(event){
		$('#drag1').hide();
		var file = event.target.files; // FileList object\
		for(var j = 0 , f1;f1 = file[j]; j++){
			filesM[counterMenu] = file[j];
			counterMenu = counterMenu + 1;
		}
		// Loop through the FileList and render image files as thumbnails.
		
		for (var i = 0, f; f = file[i]; i++) {
			file[i].businessLink = Session.get('SessionBusinessLink');
			
		    // Only process image files.
		    if (!f.type.match('image.*')) {
		      continue;
			}

			var reader = new FileReader();
			
			// Closure to capture the file information.
		    reader.onload = (function(theFile) {
		      return function(e) {
		        // Render thumbnail.

		        var span = document.createElement('span');
		        span.innerHTML = ['<img class="draggedImg" src="', e.target.result,
		                          '" title="', escape(theFile.name), '"/>'].join('');
		        document.getElementById('businessMenulist').insertBefore(span, null);
		        
		      };
		    })(f); //end of onload


		    // Read in the image file as a data URL.
		    reader.readAsDataURL(f);
		    
		}// end of for loop

	},

	'click #saveBusinessMenu' : function(event){
		var businessLink = $(event.target).attr('data-Link');
		// var businessLink = FlowRouter.getParam('businessLink');
		for(i = 0 ; i < filesM.length; i++){
			const imageCompressor = new ImageCompressor();
		      imageCompressor.compress(filesM[i])
		        .then((result) => {
		          // console.log(result);

		          // Handle the compressed image file.
		          // We upload only one file, in case
		        // multiple files were selected
		        const upload = BusinessMenu.insert({
		          file: result,
		          streams: 'dynamic',
		          chunkSize: 'dynamic',
		          // imagetype: 'profile',
		        }, false);

		        upload.on('start', function () {
		          // template.currentUpload.set(this);
		        });

		        upload.on('end', function (error, fileObj) {
		          if (error) {
		            // alert('Error during upload: ' + error);
		            console.log('Error during upload 1: ' + error);
		            console.log('Error during upload 1: ' + error.reason);
		          } else {
		            // alert('File "' + fileObj._id + '" successfully uploaded');
		            Bert.alert('Business Menu Image uploaded.','success','growl-top-right');
		            var imgId =  fileObj._id ;
		        	// console.log('businessLink ',businessLink);
		        	// console.log('imgId ',imgId);
			        Meteor.call("updateVendorBulkMenu", businessLink,imgId,
			          function(error, result) { 
			              if(error) {
			                  console.log ('Error Message: ' + error ); 
			              }else{
							// console.log('result ',result);

			            }
			        });
		          }
		          // template.currentUpload.set(false);
		        });

		        upload.start();
		        })
		        .catch((err) => {
		          // Handle the error
		    }) 

		}
		$('#businessMenulist').empty();
		$('#drag3').show();
		counterMenu = 0;
		filesM=[];
		$('#businessMenulist').val('');
	},

	'change #businessVideofiles' : function(event){
		$('#drag2').hide();
		 filesV = event.target.files; // FileList object
		 if(filesV.length > 1 ){
		 	Bert.alert('Only One can be upload','danger','growl-top-right');
			$('#businessVideofiles').val('');
				return;
		 }
		// Loop through the FileList and render image files as thumbnails.
		var f = filesV[0];
		
			var reader = new FileReader();
			
			// Closure to capture the file information.
		    reader.onload = (function(theFile) {
		      return function(e) {
		        // Render thumbnail.

		        var span = document.createElement('span');
		        span.innerHTML = ['<video class="draggedImg">' +
		        				 	'<source src="'+ e.target.result + '" title="'+escape(theFile.name)+'">' +
		        				 	'Browser not supporting' + 
		        				  '</video>'
		        				 ].join('');
		        document.getElementById('businessVideolist').insertBefore(span, null);
		        
		      };
		    })(f); //end of onload

		    // Read in the image file as a data URL.
		    reader.readAsDataURL(f);
		$('#editbusinessVideolist').empty();
		    
		// }// end of for loop
	},

	'click #saveBusinessVideo' : function(event){
		var businessLink = $(event.target).attr("data-id");
		BusinessVideoUpload.insert(filesV[0], function (err, fileObj) {
	        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
	        if(err){
	        	console.log('Error : ' + err.message);
	        }else{
	        	var videoId =  fileObj._id ;
		        Meteor.call("updateVendorBulkVideo", businessLink,videoId,
		          function(error, result) { 
		              if(error) {
		                  console.log ('Error Message: ' +error ); 
		              }else{
							Bert.alert('Business Video added','success','growl-top-right');
		              }

		        });
	        }
	    });
		$('#businessVideolist').empty();	
		$('#drag2').show();
		filesV=[];
		$('#businessVideofiles').val('');

	},
	'change #businessOwnerPicturefiles' : function(event){
		$('#drag4').hide();
		 filesO = event.target.files; // FileList object
		 // console.log('filesO ', filesO.length);
		 if(filesO.length > 1 ){
		 	Bert.alert('Only One Picture can be upload','danger','growl-top-right');
			$('#businessOwnerPicturefiles').val('');
				return;
		 }
		// Loop through the FileList and render image files as thumbnails.
		var f = filesO[0];
		
		var reader = new FileReader();
		
		// Closure to capture the file information.
	    reader.onload = (function(theFile) {
	      return function(e) {
	        // Render thumbnail.

	        var span = document.createElement('span');
	        span.innerHTML = ['<img class="draggedImg" src="', e.target.result,
		                          '" title="', escape(theFile.name), '"/>'].join('');
	        document.getElementById('businessOwnerPicturelist').insertBefore(span, null);
	        
	      };
	    })(f); //end of onload

	    // Read in the image file as a data URL.
	    reader.readAsDataURL(f);
		$('#businessOwnerPicturelist').empty();
		    
	},

	'click #saveBusinessOwnerPicture' : function(event){
		var businessLink = $(event.target).attr("data-Link");
		const imageCompressor = new ImageCompressor();
	    imageCompressor.compress(filesO[0])
	        .then((result) => {
	          // console.log(result);

	          // Handle the compressed image file.
	          // We upload only one file, in case
	        // multiple files were selected
	        const upload = OwnerImage.insert({
	          file: result,
	          streams: 'dynamic',
	          chunkSize: 'dynamic',
	          // imagetype: 'profile',
	        }, false);

	        upload.on('start', function () {
	          // template.currentUpload.set(this);
	        });

	        upload.on('end', function (error, fileObj) {
	          if (error) {
	            // alert('Error during upload: ' + error);
	            console.log('Error during upload 1: ' + error);
	            console.log('Error during upload 1: ' + error.reason);
	          } else {
	            // alert('File "' + fileObj._id + '" successfully uploaded');
	            Bert.alert('Owner Image uploaded.','success','growl-top-right');
	            // console.log(fileObj._id);
	            var filePath = fileObj._id;
              	Meteor.call("updateBusinessAboutOwnerImage", businessLink, filePath,
                function(error, result) { 
                    if(error) {
                    // Bert.alert('Error Message: ' +error.reason ); 
                    }else{
	                    Bert.alert( 'Image Updated successfully!!!!', 'success', 'growl-top-right' );
                    }
                });
	          }
	          // template.currentUpload.set(false);
	        });

	        upload.start();
	        })
	        .catch((err) => {
	          // Handle the error
	    })    

		$('#businessOwnerPicturelist').empty();	
		$('#drag4').show();
		filesO=[];
		$('#businessOwnerPicturefiles').val('');

	},

	'click .loadMoreRows50': function(event){
		event.preventDefault();
		$('.loadMoreRows50 .spinner').show();
		var searchby = $('#searchBusiness').val();
		// console.log('searchby',searchby);
      	var RegExpBuildValue = buildRegExp(searchby);

		var data = Session.get('businessArray');
		var setValue = Session.get('busListAct');
		if(setValue == 'activeList') {
			var status = 'active';
		}else{
			var status = 'inactive';
		}
		var businessCount = data.length + 50;
		getBusinessSearchData(status,RegExpBuildValue,businessCount);
		// $('.spinner').hide();
		// var nextLimitBus50 = Session.get('businessListLimit');
		// if(nextLimitBus50 != 0){
		// 	var nextLimit = Session.get('businessListLimit') + 50;
		// 	if(Session.get('busListAct') == 'activeList'){
  //   			var businessCount  = Counts.get('noOfBusinessActive');
		// 	}else{
  //   			var businessCount  = Counts.get('noOfBusinessInactive');
		// 	}
			
		//     if(businessCount > nextLimit){
		//         // Session.set('businessListLimit',nextLimit);
		//         if (businessCount > 15) {
		// 	        $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
		// 		}
		// 		// else if(businessCount > 50){
		// 		// 	$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
		// 		// }else if(businessCount > 100){
		// 		// 	$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
		// 		// }else{
		// 		// 	$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
		// 		// 	$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
		// 		// 	$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
		// 		// }
		//     }else{
		//         // Session.set('businessListLimit',businessCount);
		//         $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
		//         // $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
		//         // $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
		//     }
		// }
		
	},

	// 'click .loadMoreRows100': function(event){
	// 	 event.preventDefault();
	// 	$('.spinner').hide();
	// 	$('.loadMoreRows100 .spinner').show();
	// 	var nextLimitBus100 = Session.get('businessListLimit');
	// 	if(nextLimitBus100 != 0){
	// 		var nextLimit = Session.get('businessListLimit') + 100;
	// 		if(Session.get('busListAct') == 'activeList'){
 //    			var businessCount  = Counts.get('noOfBusinessActive');
	// 		}else{
 //    			var businessCount  = Counts.get('noOfBusinessInactive');
	// 		}
			
	// 	    if(businessCount > nextLimit){
	// 	        // Session.set('businessListLimit',nextLimit);
	// 	        if (businessCount > 15) {
	// 		        $('.loadMoreRows50').addClass('showMore50').removeClass('hideMore50');
	// 			}else if(businessCount > 50){
	// 				$('.loadMoreRows100').addClass('showMore50').removeClass('hideMore50');
	// 			}else if(businessCount > 100){
	// 				$('.loadMoreRowsRest').addClass('showMore50').removeClass('hideMore50'); 
	// 			}else{
	// 				$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 				$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 				$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// 			}
	// 	    }else{
	// 	        // Session.set('businessListLimit',businessCount);
	// 	        $('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 	        $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 	        $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// 	    }
	// 	}
	// },

	// 'click .loadMoreRowsRest': function(event){
	// 	event.preventDefault();
	// 	$('.spinner').hide();
	// 	$('.loadMoreRowsRest .spinner').show();
	// 	if(Session.get('busListAct') == 'activeList'){
	// 		var nextLimit  = Counts.get('noOfBusinessActive');
	// 	}else{
	// 		var nextLimit = Counts.get('noOfBusinessInactive');
	// 	}
	// 	// Session.set('businessListLimit',nextLimit);
	// 	$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
 //        $('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
 //        $('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// },

	// 'focus #searchBusiness': function(event){
	// 	// Session.set('businessListLimit',0);
	// 	$('.loadMoreRows50').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRows100').removeClass('showMore50').addClass('hideMore50');
	// 	$('.loadMoreRowsRest').removeClass('showMore50').addClass('hideMore50');
	// },
	
	// 'keyup #searchBusiness': _.throttle(function(event) {
	// 	event.preventDefault();
	// 	var searchText = event.currentTarget.value;
	// 	var filter = searchText.toUpperCase();
	// 	var table = document.getElementById("businessListTable");
	// 	var tr = table.getElementsByTagName("tr");

	// 	  // Loop through all table rows, and hide those who don't match the search query
	// 	if(tr){
	// 	    if(tr.length > 0){
	// 		    for (var i=0; i<tr.length; i++) {
	// 		    	var td = tr[i].getElementsByTagName("td")[0];
	// 		    	if(td) {
	// 		      		if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	// 		        		tr[i].style.display = "";
	// 		      		} else {
	// 		        		tr[i].style.display = "none";
	// 		      		}
	// 		    	} 
	// 		  	}
	// 	    }
	// 	}

	// }, 200),

	'keyup #searchBusiness': _.throttle(function(event) {
		event.preventDefault();
		var searchby = event.currentTarget.value;
      	var RegExpBuildValue = buildRegExp(searchby);
      	var setValue = Session.get('busListAct');
		if(setValue == 'activeList') {
			var status = 'active';
		}else{
			var status = 'inactive';
		}
		var data = Session.get('businessArray');
		getBusinessSearchData(status,RegExpBuildValue,0);
		// if(searchby){
		// }else{
		// 	getBusinessSearchData(status,'',0);
		// }
	}, 200),

	'click .deleteBusiness': function(event){
	   event.preventDefault();

		var modelid = $(event.target).parent().parent().parent().parent().parent().attr('id');
		var id  = modelid.split("-");
		var businessIdS = $(event.currentTarget).attr("data-vendorId");
		var vendorId  = Business.findOne({'_id':businessIdS});
		var vendoriDS = vendorId.createdBy;
		// var businessTitle = $(event.currentTarget).attr("data-busTitle");
		// var businessLink = $(event.currentTarget).attr("data-busLink");
		var businessTitle = vendorId.businessTitle;
		var businessLink = vendorId.businessLink;
		
		Meteor.call('removeBusinessPermanent',id[1],function(error,result){
			if(error){
				Bert.alert(error.reason,"danger",'growl-top-right');
			}else{
				Bert.alert('Business deleted successfully!','success','growl-top-right');

				var admin = Meteor.users.findOne({'roles':'admin'});
				var vendorDetail = Meteor.users.findOne({'_id':vendoriDS});
				console.log('vendorDetail :',vendorDetail);
				var vendorids = vendorDetail._id;
				// var notificationOn = vendorDetail.notificationConfiguration;

				// console.log('notificationOn:',notificationOn);

				if(admin&&vendorDetail){
			    	var adminId = admin._id;

					//Send Notification, Mail and SMS to Current Vendor
					var vendorname 	= vendorDetail.profile.name;
					var username 	= admin.profile.firstName;

            		var date 		= new Date();
            		var currentDate = moment(date).format('DD/MM/YYYY');
            		var msgvariable = {
						'[vendorname]' 	: vendorname,
	   					'[currentDate]'	: currentDate,
						'[businessName]': businessTitle

	               	};

					var inputObj = {
						notifPath	 : businessLink,
					    to           : vendorids,
					    templateName : 'Delete Business Admin',
					    variables    : msgvariable,
					}
					console.log('inputObj :',inputObj);
					
					sendInAppNotification(inputObj);

					var inputObj = {
						notifPath	 : businessLink,
						from         : adminId,
					    to           : vendorids,
					    templateName : 'Delete Business Admin',
					    variables    : msgvariable,
					}
					// console.log('inputObj :',inputObj);
					sendMailNotification(inputObj);
				}
					$('.deletePermanent').hide();
				$('.modal-backdrop').remove();
			}
		});
	},
	'click .delete': function(event){
	   	event.preventDefault();

		var modelid = $(event.target).parent().parent().parent().parent().parent().attr('id');
		var id  = modelid.split("-");
		// console.log('delete id ' + id[1]);
		Meteor.call('deleteBusiness',id[1],function(error,result){
			if(error){
				Bert.alert(error.reason,"danger",'growl-top-right');
			}else{
				Bert.alert('Business Inactived','success','growl-top-right');
			}
				$('.fade').hide();	
				$('.modal-backdrop').remove();
		});
	},

	'click .actInactAdminOn':function(event) {
	   	event.preventDefault();

		Session.set('busListAct','activeList');
		$('.actInactAdminC').removeClass('actInactAdminColor');
		$('.actInactAdminOn').addClass('actInactAdminColor');
		$('.actInactAdminOn').addClass('bussTabletwo');
		getBusinessSearchData('active','',0);
		$('#searchBusiness').val('');
	},
	'click .actInactAdminTw':function(event) {
	   	event.preventDefault();
		Session.set('busListAct','inactiveList');
		$('.actInactAdminC').removeClass('actInactAdminColor');
		$('.actInactAdminTw').addClass('actInactAdminColor');
		getBusinessSearchData('inactive','',0);
		$('#searchBusiness').val('');
	},

	'click .inactiveStatus': function(event){
	  	event.preventDefault();
		var businessId = $(event.target).attr('id');
		var recId = businessId.split('-');
		Meteor.call('updateBusinessStatusActive',recId[1],"active",function(error,result){
			if(error){
				Bert.alert(error.reason,"danger",'growl-top-right');
			}else{
				Bert.alert('BusinessActivated','success','growl-top-right');
				$('.modal-backdrop').hide();
			}
		});
	},

	'click .activeStatus': function(event){
	   event.preventDefault();
		var businessId = $(event.target).attr('id');
		var recId = businessId.split('-');
		Meteor.call('updateBusinessStatusInactive',recId[1],"inactive" );
	},

	// ===========tooltip===============
	
	// 'mouseover .fa-circle':function(event){
	// 	event.preventDefault();
	// 	$('.fa-circle').tooltip({title: "Inactive", trigger: "hover"});
	// },
	
	// 'mouseover .fa-check-circle-o':function(event){
	// 	event.preventDefault();
	// 	$('.bussDeleted').tooltip({title: "Active", trigger: "hover"});
	// },


// });

	// 'mouseover .showTooltipBussList': function(event){
	// 	$(event.currentTarget).siblings('.newTooltipBuss').show();
	// },

	// 'mouseout .showTooltipBussList': function(event){
	// 	$(event.currentTarget).siblings('.newTooltipBuss').hide();
	// },
	// 'mouseover .showTooltipOneList': function(event){
	// 		$(event.currentTarget).siblings('.newtooltipList').show();
	// 	},
	// 'mouseout .showTooltipOneList': function(event){
	// 	$(event.currentTarget).siblings('.newtooltipList').hide();
	// },

});

listOfBusinessForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'listOfBusiness'});
}
export { listOfBusinessForm }

editBusinessAdminForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'editBusinessAdmin'});
}
export { editBusinessAdminForm }

addNewBusInfoAdminForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'addNewBusInfoAdmin'});
}
export { addNewBusInfoAdminForm }

openCloseDayAdminForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'openCloseDayAdmin'});
}
export { openCloseDayAdminForm }

aboutOwnerAdminForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'aboutOwnerAdmin'});
}
export { aboutOwnerAdminForm }

addImagesVidAdminForm = function () {  
  BlazeLayout.render("adminLayout",{main: 'addImagesVidAdmin'});
}
export { addImagesVidAdminForm }

