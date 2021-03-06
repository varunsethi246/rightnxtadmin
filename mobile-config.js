App.info({ 
  name: 'rightnxt',
  version: "1.10.0", 
});

App.setPreference('loadUrlTimeoutValue', '700000', 'android');
App.accessRule('*://s3.us-east-2.amazonaws.com/rightnxt1/StaticImages/*');
App.accessRule('*');
App.accessRule('https://*.googleapis.com/*');
App.accessRule('https://*.google.com/*');
App.accessRule('https://*.gstatic.com/*');
App.accessRule('blob:*',{type: 'intent'});
App.accessRule('polyblob:*',{type: 'intent'});
App.accessRule('*://rightnxt.com/*');
// App.accessRule('https://s3.us-east-2.amazonaws.com/rightnxt1/BannerVideo/n9a6JFjfWRTtDmM9X-original.mp4');
// App.launchScreens({
//   'android_mdpi_portrait': 'splashscreen/480X320.png',
// });
// App.icons({
//   'android_mdpi': 'splashscreen/48X48.png',
//   'android_hdpi': 'splashscreen/72X72.png',
//   'android_xhdpi': 'splashscreen/96X96.png',
//   'android_xxhdpi': 'splashscreen/144X144.png',
//   'android_xxxhdpi': 'splashscreen/192X192.png',
// });