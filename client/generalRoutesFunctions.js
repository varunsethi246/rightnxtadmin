
// /*================general page =====================*/





comingSoonFunc= function () {    
	import('/imports/general/generalLayout/generalLayout.js').then(function (handle) {        
		handle.comingSoonForm();    
	})
	.then(function(){
		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
	})
}
joinUsFunc= function () {    
	import('/imports/general/careers/career.js').then(function (handle) {        
		handle.joinUsForm();    
	})
	.then(function(){
		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
	})
}
// codeOfConductFunc= function () {    
// 	import('/imports/general/codeOfConduct/codeOfConduct.js').then(function (handle) {        
// 		handle.codeOfConductForm();    
// 	})
// 	.then(function(){
// 		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
// 	})
// }
// privacyPolicyFunc= function () {    
// 	import('/imports/general/privacyPolicy/privacyPolicy.js').then(function (handle) {        
// 		handle.privacyPolicyForm();    
// 	})
// 	.then(function(){
// 		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
// 	})
// }
// termsOfServiceFunc= function () {    
// 	import('/imports/general/termsCondition/termsOfService.js').then(function (handle) {        
// 		handle.termsOfServiceForm();    
// 	})
// 	.then(function(){
// 		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
// 	})
// }

// aboutUsFormTwoFunc= function () {    
// 	import('/imports/general/aboutUs/aboutUs.js').then(function (handle) {        
// 		handle.aboutUsFormTwo();    
// 	})
// 	.then(function(){
// 		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
// 	})
// }


