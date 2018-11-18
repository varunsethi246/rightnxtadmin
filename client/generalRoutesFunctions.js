
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

// aboutUsFormTwoFunc= function () {    
// 	import('/imports/general/aboutUs/aboutUs.js').then(function (handle) {        
// 		handle.aboutUsFormTwo();    
// 	})
// 	.then(function(){
// 		$("#inject-loader-wrapper").fadeOut(1500, function() { $(this).remove(); });
// 	})
// }


