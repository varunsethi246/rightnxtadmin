
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'Admin Home Page',
    waitOn(params) {        
        return [ 
            // Meteor.subscribe('notificationTemplate') ,   
            // Meteor.subscribe('notification'),
            // Meteor.subscribe('currentuser'),
            // Meteor.subscribe('area'),
            Meteor.subscribe('userfunction'),   
       ];   
    },
    action: function() {
        // console.log('loading');
        AdminHomepageFunction();
    }
});

FlowRouter.route('/join-us/:id', {
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,   
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('area'),
                    Meteor.subscribe('onenewjob',params.id),
                    // Meteor.subscribe('userfunction'),
                    // Meteor.subscribe('businessImgS3'),  
                    // Meteor.subscribe('area'),
                    // Meteor.subscribe('newjob'),  
                    // Meteor.subscribe('resumeS3'),
                    // Meteor.subscribe('userProfileS3'),   
                    // Meteor.subscribe('notification'),
                    // Meteor.subscribe('notificationTemplate') ,   
               ];   
    },
    action: function() {
        // console.log('in join us -id-city')
        // BlazeLayout.render("generalLayout", {generalcontent: "joinUs"});
        joinUsFunc();
    }
});

FlowRouter.route('/viewNotifications', {
    name: 'ViewAllNotification-admin',
     waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('userfunction'),
                    // Meteor.subscribe('userProfileS3'), 
                    // Meteor.subscribe('followUser'),  
                    // Meteor.subscribe('userBusinessLikes'),
                    // Meteor.subscribe('userBookmark'),
                    // Meteor.subscribe('userBeenThere'),  
                    // Meteor.subscribe('businessImgS3'),
                    // Meteor.subscribe('vendorBusinessEnquiry'),
                    // Meteor.subscribe('allSavedOffer'), 
                    // Meteor.subscribe('reviewUser'),
                    // Meteor.subscribe('area'),
                    // Meteor.subscribe('allCity'),
                    // Meteor.subscribe('vendorBusiness'),  
                ];   
    },

    action: function() {
        ViewAllNotifFuncs();

    }
});

FlowRouter.route('/adminDashboard', {
    name: 'general Header',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('noOfUserCount'),
                    Meteor.subscribe('noOfVendorCount'),
                    Meteor.subscribe('noOfBusinessInactive'),
                    Meteor.subscribe('noOfBusinessActive'),
                    Meteor.subscribe('noOfEnqWeek'),
                    Meteor.subscribe('noOfEnqMonth'),
                    Meteor.subscribe('noOfEnqYear'),
                    Meteor.subscribe('noOfOfferWeek'),
                    Meteor.subscribe('noOfofferYear'),
                    Meteor.subscribe('noOfofferMonth'),
               ];   
    }, 
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "adminDashboard"});
        adminDashboardFunc();
    }
});

FlowRouter.route('/companySettings', {
    name: 'company settings',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('tempLogoImage'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
               ];   
    }, 
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "companySettings"});
        companySettingsFormFunc();
    }
});

FlowRouter.route('/webpage/:url', {
    waitOn(params) { 
        return [ 
                    Meteor.subscribe('notificationTemplate') ,      
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('area'),
                    Meteor.subscribe('generalContentUrl',params.url), 
                    // // Meteor.subscribe('businessImgS3'),  
                    // Meteor.subscribe('area'),
                    // Meteor.subscribe('generalContentUrl',params.url), 
                    // // Meteor.subscribe('userProfileS3'),  
                    // Meteor.subscribe('notification'),
                    // Meteor.subscribe('notificationTemplate') ,      
                    // // Meteor.subscribe('userfunction'),
                ];   
    },  
    action: function() {
        // BlazeLayout.render("generalLayout", {generalcontent: "merchantGuidelines"});
        merchantGuidelinesFunc();
    }
});


FlowRouter.route('/about', {
    action: function() {
        // BlazeLayout.render("generalLayoutWithImage", {generalcontent: "aboutUs"} );
        aboutUsFunc();
    }
});


FlowRouter.route('/career', {

    name: 'career',

    action: function() {
        // BlazeLayout.render("generalLayoutWithImage", {generalcontent: "career"});
        careerFunc();
    }
});

FlowRouter.route('/jobList', {
    name: 'Job Lists',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('businessImgS3'),  
                    Meteor.subscribe('newjob'),  
                    // Meteor.subscribe('allCity'),  
                    // Meteor.subscribe('allStates'), 
                    // Meteor.subscribe('userProfileS3'), 
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('notificationTemplate') ,    
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main: "jobList"});
        jobListFunc();
    }
});


FlowRouter.route('/faqs/:tabName', {
    waitOn(params) {  
        var name = 'faqs';      
        var tabName = params.tabName.split('-').join(' ');     
        return [ 
                    Meteor.subscribe('notificationTemplate') ,              
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('area'),
                    // Meteor.subscribe('vendorImage'),
                    Meteor.subscribe('generalContentFaq',name,tabName),
                ];   
    },  
    action: function() {
        // BlazeLayout.render("generalLayoutWithImage", {generalcontent: "faq"});
        faqFunc();
    }
});




FlowRouter.route('/contactUs', {
    name: 'contactUs',

    action: function() {
        // BlazeLayout.render("generalLayoutWithImage", {generalcontent: "contactUs"});
        contactUsFunc();
    }
});

FlowRouter.route('/joinUsForm', {
    name: 'careerJoinUsForm',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('career'),
                    // Meteor.subscribe('newjob'),
                    Meteor.subscribe('resumeImage'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('currentuser'),
                    
                ];   
    }, 
   
    triggersEnter : [activateSidebarLink],
    action: function() {
        console.log('in route');
        // BlazeLayout.render('adminLayout',{main: "careerJoinUsForm"});
        careerJoinUsFormFunc();
    }
});

FlowRouter.route('/addNewJob', {
    name: 'AddNewJobForm',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('notificationTemplate'),
                ];   
    }, 
     
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "AddNewJobForm"});
        addNewJobFormFunc();
    }
});
FlowRouter.route('/homePageBanner', {
    name: 'homePageBanner',
     waitOn(params) {        
        return [ 
                    // Meteor.subscribe('allCity'),
                    // Meteor.subscribe('allStates'),
                    // Meteor.subscribe('notification'),
                    // Meteor.subscribe('userfunction'),
                    // Meteor.subscribe('notificationTemplate'),
                    // Meteor.subscribe('vendorBusiness'),
                ];   
    }, 

    triggersEnter : [activateSidebarLink],
    action: function() {

        homePageBannerFunc();
    }
});

FlowRouter.route('/listOfUsers', {
    name: 'listOfUsers',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('noOfUser'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('followUser'),
                    Meteor.subscribe('businessReports'),
                ];   
    }, 
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "listofUser"});
        listOfUsersFunc();
    }
});

FlowRouter.route('/editMyProfile', {
    name: 'Edit Profile',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    }, 
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "editMyProfileAdmin"});
        editMyProfileAdminFunc();
    }
});

FlowRouter.route('/BusinessBlkupload', {
    name: 'Business Blkupload',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    }, 
   
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "businessBlkup"});
        businessBlkupFunc()
    }
});

FlowRouter.route('/editRoles', {
    name: 'editRoles',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('currentuser'),
                ];   
    }, 
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "adminAddRolesList"});
        adminAddRolesListFunc();
    }
});

FlowRouter.route('/businessbanners', {
    name: 'Business Banners',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('allpayment'),
                    Meteor.subscribe('bannerPayment','Banner'),
                    Meteor.subscribe('noOfInvoiceCount'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allbusinessBanner'),
                    Meteor.subscribe('discounts'),
                    Meteor.subscribe('position'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('area'),
                ];   
    }, 
    // triggersEnter : [activateSidebarLink],     
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "businessBanner"});
        businessBannerFunc();
    }
});

FlowRouter.route('/businessbannersInvoice/:businessLink', {
    name: 'Business Banners Invoice',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allpayment'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('vendorBusiness'),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allbusinessBanner'),
                    Meteor.subscribe('discounts'),
                    Meteor.subscribe('position'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                ];   
    }, 
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "bannerInvoice"});
        bannerInvoiceFunc();
    }
});

FlowRouter.route('/businessbannersInvoice/:businessLink/:paymentId', {
    name: 'Business Banners Invoice',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allpayment'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('vendorBusiness'),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allbusinessBanner'),
                    Meteor.subscribe('discounts'),
                    Meteor.subscribe('position'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                ];   
    }, 
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "bannerInvoice"});
        bannerInvoiceFunc();
    }
});

FlowRouter.route('/businessBannerList', {
    name: 'Business Banners List',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('area'),
                    // Meteor.subscribe('allpayment'),
                    // Meteor.subscribe('discounts'),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('position'),
                    Meteor.subscribe('allbusinessBanner'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('bannerPayment','Banner'),
                ];   
    },
    triggersEnter : [activateSidebarLink],     
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "businessBannerList"});
        businessBannerListFunc();
    }
});

FlowRouter.route('/businessAds', {
    name: 'Business Ads',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('area'),
                    Meteor.subscribe('adsPayment','Ads'),
                    Meteor.subscribe('noOfInvoiceCount'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allBusinessAds'),
                    Meteor.subscribe('adsDiscount'),
                    Meteor.subscribe('adsPosition'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('area'),
                ];   
    },

    triggersEnter : [activateSidebarLink],     
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "businessAds"});
        businessAdsFunc();
    }
});

FlowRouter.route('/businessAdsInvoice/:businessLink', {
    name: 'Business Ads Invoice',
    waitOn(params) {        
        var type = 'Ads';
        return [ 
                    // Meteor.subscribe('area'),
                    Meteor.subscribe('adsPayment',type),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('oneBusiness',params.businessLink),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allBusinessAds'),
                    Meteor.subscribe('adsDiscount'),
                    Meteor.subscribe('adsPosition'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "adsInvoice"});
        adsInvoiceFunc();
    }
});

FlowRouter.route('/businessAdsInvoice/:businessLink/:paymentId', {
    name: 'Business Ads Invoice',
    waitOn(params) {        
        var type = 'Ads';
        return [ 
                    // Meteor.subscribe('area'),
                    Meteor.subscribe('adsPayment',type),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('oneBusiness',params.businessLink),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allBusinessAds'),
                    Meteor.subscribe('adsDiscount'),
                    Meteor.subscribe('adsPosition'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "adsInvoice"});
        adsInvoiceFunc();
    }
});

FlowRouter.route('/businessAdsList', {
    name: 'Business Ads List',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('area'),
                    // Meteor.subscribe('adsPayment',type),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('companySettings'),
                    Meteor.subscribe('allBusinessAds'),
                    Meteor.subscribe('adsDiscount'),
                    Meteor.subscribe('adsPosition'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('adsPayment','Ads'),
                ];   
    },
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "businessAdsList"});
        businessAdsListFunc();
    }
});

FlowRouter.route('/adsDiscountManagement', {
    name: 'Ads Discount Management',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('adsDiscount'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'adsDiscountManagement'});
        adsDiscountManagementFunc();
    }
});

FlowRouter.route('/adsPositionManagement', {
    name: 'Ads Position Management',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('adsPosition'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'adsPositionManagement'});
        adsPositionManagementFunc();
    }
});

FlowRouter.route('/manageLocations', {
    name: 'Manage Locations',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    triggersEnter : [activateSidebarLink],     
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "manageLocations"});
        manageLocationsFunc();
    }
});

FlowRouter.route('/categoriesLevels', {
    name: 'Categories Levels List',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    triggersEnter : [activateSidebarLink],     
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "manageCategoriesList"});
        manageCategoriesListFunc();
    },
    triggersExit: [trackCatgLevelsLeft]
});

function trackCatgLevelsLeft(context){
    console.log('left catg levels page');
    Session.set('catgListLimit',10);
}

FlowRouter.route('/listOfBusiness', {
    name: 'Categories Levels List',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('noOfBusiness'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('userfunction'),
                    
                ];   
    },
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "listOfBusiness"});
        listOfBusinessFunc();
    }
});

FlowRouter.route('/editBusinessAdmin/:businessLink', {
    name: 'Edit Business Admin',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('oneBusiness',params.businessLink),
                    // Meteor.subscribe('businessImgS3'),
                    // Meteor.subscribe('businessVideo'),
                    // Meteor.subscribe('businessMenu'),
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('review'),
                    Meteor.subscribe('review',params.businessLink),

                    Meteor.subscribe('businessMenuImage'),
                    Meteor.subscribe('businessOfferImage'),
                    Meteor.subscribe('vendorImage'),
                    Meteor.subscribe('ownerImage'),
                    // Meteor.subscribe('reviewImage'),
                    Meteor.subscribe('getBizVideo'),
                ];   
    },
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "editBusinessAdmin"});
        editBusinessAdminFunc();
    }
});

FlowRouter.route('/addnewbusinessAdmin', {
    name: 'addnewbusinessAdmin',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('userProfile'),
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('categoriesListSearch'),
                    
                ];   
    },
    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "myBusinessAdmin"});
        addNewBusInfoAdminFunc();
    }
});

FlowRouter.route('/openingAndClosingDaysAdmin/:businessLink', {
    name: 'vendor Header',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('oneBusiness',params.businessLink),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('categories'),
                    // Meteor.subscribe('categoriesListSearch'),

                ];   
    },

    action: function() {
        // BlazeLayout.render('adminLayout',{main: "openCloseDayAdmin"});
        openCloseDayAdminFunc();
    }
});

FlowRouter.route('/aboutOwnerAdmin/:businessLink', {
    name: 'vendor Header',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('oneBusiness',params.businessLink),
                    // Meteor.subscribe('businessImgS3'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('ownerImage'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('categoriesListSearch'),

                ];   
    },

    action: function() {
        // BlazeLayout.render('adminLayout',{main: "aboutOwnerAdmin"});
        aboutOwnerAdminFunc();
    }
});

FlowRouter.route('/imagesAndVideosAdmin/:businessLink', {
    name: 'vendor Header',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('oneBusiness',params.businessLink),
                    // // Meteor.subscribe('businessImgS3'),
                    // Meteor.subscribe('businessVideo'),
                    Meteor.subscribe('businessImage'),
                    // Meteor.subscribe('businessMenu'),
                    // Meteor.subscribe('notification'),
                    // Meteor.subscribe('userfunction'),
                    // Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('businessMenuImage'),
                    Meteor.subscribe('businessOfferImage'),
                    Meteor.subscribe('vendorImage'),
                    Meteor.subscribe('ownerImage'),
                    // Meteor.subscribe('reviewImage'),
                    Meteor.subscribe('getBizVideo'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('categoriesListSearch'),

                ];   
    },
    action: function() {
        // BlazeLayout.render( 'adminLayout',{main: "addImagesVidAdmin"});
        addImagesVidAdminFunc();
    }
});

FlowRouter.route('/UMdeleteUserConfirm/:userId', {
    name: 'Delete Confirm',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                ];   
    },

    action: function() {
        // BlazeLayout.render( 'adminLayout',{main: "UMdeleteUserConfirm"});
        UMdeleteUserConfirmFunc();
    }
});

FlowRouter.route('/createUser', {
    name: 'Create User',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('area'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('configSettings'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('notificationTemplate'),
                ];   
    },

    triggersEnter : [activateSidebarLink],
    action: function() {
        // BlazeLayout.render( 'adminLayout',{main: "createUsers"});
        createUsersFunc();
    }
});

FlowRouter.route('/editUsersProfile/:userId', {
    name: 'Edit My Profile',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allCity'),
                    Meteor.subscribe('allStates'),
                    Meteor.subscribe('configSettings'),
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('userfunction'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('userData',params.userId),
                ];   
    },

    action: function() {
        // BlazeLayout.render( 'adminLayout',{main: "editMyProfiles"});
        editMyProfilesFunc();
    }
});

FlowRouter.route('/contactUsList', {
    name: 'contactUsList',
     waitOn(params) {        
        return [ 
                    Meteor.subscribe('contactUs'),
                    Meteor.subscribe('noOfContactUs'),
                    Meteor.subscribe('currentuser'),
                    Meteor.subscribe('notificationTemplate'),
                    Meteor.subscribe('notification'),
                ];   
    },

    action: function() {
        // BlazeLayout.render('adminLayout',{main: "contactUsList"});
        contactUsListFunc();
    }
});

FlowRouter.route('/configSettings', {
    name: 'configSettings',
    action: function() {
        // BlazeLayout.render('configSettings');
        configSettingsFunc();
    }
});

function activateSidebarLink(){
    var currentURL = FlowRouter.current().path;
    var actualURL = currentURL.substring(1);
    $('.sidebarlink').removeClass('active');
    $('.'+actualURL).addClass('active');
}



FlowRouter.route('/AdSaleReport', {
    name: 'adSalesReport',
    waitOn(params) {        
        var type = 'Ads';
        return [ 
                    // Meteor.subscribe('contactUs'),  
                    // Meteor.subscribe('noOfContactUs'),  
                    Meteor.subscribe('currentuser'),  
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('adsPayment',type),
                ];   
    },
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "salesReportTabs"});
        salesTableViewFunc();
    }
});

FlowRouter.route('/BannerSaleReport', {
    name: 'bannerSalesReport',
    waitOn(params) {        
        var type = 'Banner';
        return [ 
                    Meteor.subscribe('contactUs'),  
                    Meteor.subscribe('noOfContactUs'),  
                    Meteor.subscribe('currentuser'),  
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('bannerPayment',type),
                ];   
    },
    action: function() {
        // BlazeLayout.render('adminLayout',{main: "salesReportTabsBanner"});
        salesReportTabsBannerFunc();

    }
});

// FlowRouter.route('/BannerSaleReport', {
//     name: 'contactUsList',
    
//     subscriptions: function(params, queryParams) {
//         this.register('contactUs', Meteor.subscribe('contactUs'));  
//         this.register('noOfContactUs', Meteor.subscribe('noOfContactUs'));  
//         this.register('userfunction', Meteor.subscribe('userfunction'));  
//         this.register('notification', Meteor.subscribe('notification'));
//         this.register('notificationTemplate', Meteor.subscribe('notificationTemplate') );
//      },
//     action: function() {
//         BlazeLayout.render('adminLayout',{main: "contactUsList"});
//     }
// });



FlowRouter.route('/createEmailTemplate', {
    name: 'createEmailTemplate',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'), 
                    // Meteor.subscribe('rolefunction'),
               ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'createEmailTemplate'});
        createEmailTemplateFunc();
    }
});

FlowRouter.route('/createEmailTemplate/:id', {
    name: 'createEmailTemplate',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'), 
                    // Meteor.subscribe('rolefunction'),
               ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'editTemplate'});
        editTemplateFunc();
    }
});

FlowRouter.route('/userDefinedTemplate', {
    name: 'userDefinedTemplate',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    // Meteor.subscribe('currentuser'), 
                    Meteor.subscribe('userfunction'), 
                    // Meteor.subscribe('rolefunction'),
               ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'userDefinedTemplate'});
        userDefinedTemplateFunc();
    }
});

FlowRouter.route('/notificationConfiguration', {
    name: 'notificationConfig',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('userfunction'), 
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('rolefunction'), 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('userProfileS3'), 
                    Meteor.subscribe('businessImgS3'),  
                    Meteor.subscribe('area'),
                    Meteor.subscribe('allCity'),
               ];   
    },
    action: function() {
        // BlazeLayout.render("profileSettingLayout", {profileSettings:'notificationConfig'});
        notificationConfigFunc()
    }
});


FlowRouter.route('/viewTemplate', {
    name: 'viewTemplate',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'), 
               ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'viewTemplate'});
        viewTemplateFunc();
    }
});

FlowRouter.route('/ViewAllNotification', {
    name: 'ViewAllNotification',
    waitOn(params) {        
        return [ 
        Meteor.subscribe('businessImgS3'),  
        Meteor.subscribe('notification') ,
        Meteor.subscribe('notificationTemplate') ,
     ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'ViewAllNotif'});
        ViewAllNotifFunc();
    }
});

FlowRouter.route('/mailTemplate', {
    name: 'mailTemplate',
    subscriptions: function(params, queryParams) {
        this.register('notificationTemplate', Meteor.subscribe('notificationTemplate') );
        this.register('userfunction', Meteor.subscribe('userfunction') );
        this.register('notification', Meteor.subscribe('notification')); 
    },
    action: function() {
        BlazeLayout.render("adminLayout",{main:'mailTemplate'});
    }
});


FlowRouter.route('/sendMailnNotification', {
    name: 'sendMailnNotification',
    subscriptions: function(params, queryParams) {
        this.register('notification', Meteor.subscribe('notification')); 
        this.register('userfunction', Meteor.subscribe('userfunction'));  
        this.register('notificationTemplate', Meteor.subscribe('notificationTemplate') );
        this.register('vendorBusinessEnquiry', Meteor.subscribe('vendorBusinessEnquiry') );
        this.register('enquiryImgS3', Meteor.subscribe('enquiryImgS3'));
        this.register('business', Meteor.subscribe('vendorBusiness'));  
        this.register('allpayment', Meteor.subscribe('allpayment'));
        this.register('allreviews', Meteor.subscribe('allreviews'));
        this.register('likes', Meteor.subscribe('userBusinessLikes'));
        this.register('userfunction', Meteor.subscribe('userfunction') );
        this.register('followUser', Meteor.subscribe('followUser')); 
    },
    action: function() {
        BlazeLayout.render('sendMailnNotification');
    }
});

FlowRouter.route('/discountManagement', {
    name: 'discountManagement',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('discounts') ,
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'), 
                    Meteor.subscribe('currentuser'),  
               ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'discountManagement'});
        discountManagementFunc();
    }
});

FlowRouter.route('/positionManagement', {
    name: 'positionManagement',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('position') ,
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'), 
                    Meteor.subscribe('currentuser'),  
               ];   
    }, 
    action: function() {
        // BlazeLayout.render("adminLayout",{main:'positionManagement'});
        positionManagementFunc();
    }
});


FlowRouter.route('/aboutUs-form', {
    name: 'Aboutusform',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('businessImgS3'),  
                    // Meteor.subscribe('generalContent'), 
                    // Meteor.subscribe('userProfileS3'),  
                    Meteor.subscribe('notificationTemplate') ,      
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main: "aboutUsForm"});
        aboutUsFormTwoFunc();
    }
});

FlowRouter.route('/generalcontent-form', {
    name: 'GENERALCONTENTform',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('businessImgS3'),  
                    // Meteor.subscribe('userProfileS3'), 
                    // Meteor.subscribe('generalContent'),  
                    Meteor.subscribe('notificationTemplate') ,     
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main: "generalContentForm"});
        generalContentFunc();
    }
});

FlowRouter.route('/admin-FAQ-form', {
    name: 'Admin FAQ Form',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('businessImgS3'),  
                    // Meteor.subscribe('generalContent'),  
                    // Meteor.subscribe('userProfileS3'), 
                    Meteor.subscribe('notificationTemplate') ,      
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main: "faqForm"});
        faqFormThreeFunc();
    }
});

FlowRouter.route('/editPages', {
    name: 'Edit Webpages',
    waitOn(params) {        
        return [ 
                    // Meteor.subscribe('businessImgS3'),  
                    // Meteor.subscribe('userProfileS3'),   
                    Meteor.subscribe('generalContent'),
                    Meteor.subscribe('notificationTemplate') ,      
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('currentuser'),
                ];   
    },
    action: function() {
        // BlazeLayout.render("adminLayout",{main: "editPages"});
        editPagesFunc();
    }
});

FlowRouter.route('/search/:city/:area/:category/:searchText', {
   name: 'Business List',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('userfunction'),  
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'), 
                    Meteor.subscribe('adminfunction'), 
                    Meteor.subscribe('allBusinessAds'), 
                    Meteor.subscribe('businessListSearch'),  
                    Meteor.subscribe('offersListSearch'),
                    Meteor.subscribe('businessListReview'),
                    // Meteor.subscribe('userProfileS3'), 
                    Meteor.subscribe('businessEnquiryCount'),
                    Meteor.subscribe('areaListSearch'),
                    Meteor.subscribe('categoriesListSearch'),  
                    // Meteor.subscribe('businessImgS3'),  
                    Meteor.subscribe('allbusinessBanner'), 
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('offers'),
                   
               ];   
    }, 
    action: function() {
        // console.log('fdsaa');
        // BlazeLayout.render("businessList");
        businessListFunc();
    }
});

FlowRouter.route('/search/:city/:area/:searchText', {
    name: 'Business List',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('userfunction'),  
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'), 
                    Meteor.subscribe('adminfunction'), 
                    Meteor.subscribe('allBusinessAds'), 
                    Meteor.subscribe('businessListSearch'),  
                    Meteor.subscribe('offersListSearch'),
                    Meteor.subscribe('businessListReview'),
                    // Meteor.subscribe('userProfileS3'), 
                    Meteor.subscribe('businessEnquiryCount'),
                    Meteor.subscribe('areaListSearch'),
                    Meteor.subscribe('categoriesListSearch'),  
                    // Meteor.subscribe('businessImgS3'),  
                    Meteor.subscribe('allbusinessBanner'), 
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('categories'),
                    Meteor.subscribe('offers'),

               ];   
    }, 
    action: function() {
        // console.log('fdsaa');
        // BlazeLayout.render("businessList");
        businessListFunc();
    }
});
FlowRouter.route('/search/:city/:area', {
    name: 'Business List',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'), 
                    Meteor.subscribe('currentuser'),  
                    // Meteor.subscribe('userfunction'),  
                    // Meteor.subscribe('adminfunction'), 
                    Meteor.subscribe('allBusinessAds'), 
                    Meteor.subscribe('businessListSearch'),  
                    Meteor.subscribe('offersListSearch'),
                    Meteor.subscribe('businessListReview'),
                    Meteor.subscribe('businessEnquiryCount'),
                    Meteor.subscribe('areaListSearch'),
                    Meteor.subscribe('categoriesListSearch'),  
                    Meteor.subscribe('allbusinessBanner'),
                    Meteor.subscribe('allBusinesses'),
                    Meteor.subscribe('offers'),

                    // Meteor.subscribe('userProfileS3'), 
                    // Meteor.subscribe('businessImgS3'), 
               ];   
    }, 
    action: function() {
        // console.log('hello');
        // BlazeLayout.render("businessList");
        businessListFunc();
    }
});
FlowRouter.route('/searchMap/:city/:area/:searchText/:currentMap', {
    name: 'Business List',
    waitOn(params) {        
        return [ 
                    Meteor.subscribe('userfunction'), 
                    Meteor.subscribe('notificationTemplate') ,
                    Meteor.subscribe('notification'),
                    Meteor.subscribe('adminfunction'),
                    Meteor.subscribe('allBusinessAds'),
                    Meteor.subscribe('businessListSearch'), 
                    Meteor.subscribe('offersListSearch'),
                    Meteor.subscribe('businessListReview'),
                    // Meteor.subscribe('userProfileS3'),
                    Meteor.subscribe('businessEnquiryCount'),
                    Meteor.subscribe('areaListSearch'),
                    Meteor.subscribe('categoriesListSearch'), 
                    // Meteor.subscribe('businessImgS3'), 
                    Meteor.subscribe('allbusinessBanner'),
                    Meteor.subscribe('offers'),
                    
               ];   
    }, 
    
    action: function() {
        // console.log('hi');
        // BlazeLayout.render("businessList");
        businessListFunc();

    }
});