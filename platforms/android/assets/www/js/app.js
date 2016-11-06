// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova', 'ionic-ratings', 'isteven-multi-select', 'ngDialog', 'angular-datepicker', , 'ion-datetime-picker'])

        .run(function ($ionicPlatform, $rootScope, $state, $ionicPopup, $cordovaNetwork) {
            $ionicPlatform.ready(function () {
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    $ionicPopup.confirm({
                        title: 'No Internet Connection',
                        content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                    })
                            .then(function (result) {
                                if (!result) {
                                    ionic.Platform.exitApp();
                                } else {
                                    ionic.Platform.exitApp();
                                }
                            });
                });
                $rootScope.dateValue = new Date();
                $rootScope.timeValue = new Date();
                $rootScope.datetimeValue = new Date();
                $rootScope.disableCancelBtn = null;
                $rootScope.disableCancelBtnTime = 5;
                if (window.localStorage.getItem('AccountId')) {
                    $state.go("menu.map");

                } else {
                    window.localStorage.clear();
                    $state.go("login");
                }


                function onSuccess(position) {
                    $rootScope.pos = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                }
                function onError(error) {
                    console.log('code: ' + error.code + '\n' +
                            'message: ' + error.message + '\n');
                }
                  if (cordova.platformId == 'android') {
                    StatusBar.backgroundColorByHexString('#00a6ce');
                }
                //watchID = navigator.geolocation.watchPosition(onSuccess, onError, {timeout: 60000});
                $rootScope.base_url = 'URL';
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
//                if (window.StatusBar) {
//                    // org.apache.cordova.statusbar required
//                    StatusBar.styleDefault();
//                }
            });

        })

        .config(function ($ionicConfigProvider) {
            $ionicConfigProvider.navBar.alignTitle('center');

            //$ionicConfigProvider.views.maxCache(5);
            //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
        });
