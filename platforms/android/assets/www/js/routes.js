angular.module('app.routes', [])

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider
                    .state('menu.map', {
                        url: '/map',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/map.html',
                                controller: 'mapCtrl',
                            },
                        }
                    })
                    .state('menu', {
                        url: '/side-menu21',
                        templateUrl: 'templates/menu.html',
                        abstract: true,
                        controller: 'menuCtrl',
                    })

                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'templates/signup.html',
                        controller: 'signupCtrl'
                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl',
                        cache: false

                    })
                    .state('confirmation', {
                        url: '/confirmation',
                        templateUrl: 'templates/confirmation.html',
                        controller: 'confirmationCtrl'
                    })
                    .state('changePassword', {
                        url: '/changePassword',
                        templateUrl: 'templates/change_password.html',
                        controller: 'changePasswordCtrl'


                    })

                    .state('payment', {
                        url: '/payment',
                        templateUrl: 'templates/payment.html',
                        controller: 'paymentCtrl'
                    })
                    .state('help', {
                        url: '/help',
                        templateUrl: 'templates/help.html',
                        controller: 'helpCtrl',
                    })
                    .state('notifications', {
                        url: '/notifications',
                        templateUrl: 'templates/notifications.html',
                        controller: 'notificationsCtrl',
                        cache: false

                    })
                    .state('forgetPassword', {
                        url: '/forgetPassword',
                        templateUrl: 'templates/forget_password.html',
                        controller: 'forgetPasswordCtrl'
                    })
                    .state('settings', {
                        url: '/settings',
                        templateUrl: 'templates/settings.html',
                        controller: 'settingsCtrl',
                    })
                    .state('editProfileAccount', {
                        url: '/editProfileAccount',
                        templateUrl: 'templates/editProfileAccount.html',
                        controller: 'editProfileAccountCtrl'
                    })
                    .state('forgetPasswordCode', {
                        url: '/forgetPasswordCode',
                        templateUrl: 'templates/forget_password_code.html',
                        controller: 'forgetPasswordCodeCtrl'
                    })
                    /*
                    .state('FormExample', {
                        url: '/FormExampleCtrl',
                        templateUrl: 'templates/FormExampleCtrl.html',
                        controller: 'FormExampleCtrl',
                        cache: false
                    })
                    .state('searchExample', {
                        cache: false,
                        url: '/searchExample/:spiId',
                        templateUrl: 'templates/search_Example.html',
                        controller: 'searchExampleCtrl',
                        controllerAs: 'As searchCTRL',
                    })
                    .state('searchResListCtrl', {
                        url: '/doctorList/:speId/:patientId/:gender/:grade/:major/:minor/',
                        params: {
                            'myParam': null,
                            'speId': null,
                            'patientId': null,
                            'gender': null,
                            'grade': null,
                            'major': null,
                            'minor': null,
                        },
                        templateUrl: 'templates/search-list.html',
                        controller: 'searchListCtrl'
                    })
                    .state('listDetails', {
                        url: '/visitDetails',
                        templateUrl: 'templates/visitDetails.html',
                        controller: 'visitDetailsCtrl',
                        params: {visit_details: null},
                    })
                    .state('list', {
                        url: '/list',
                        templateUrl: 'templates/list.html',
                        controller: 'listCtrl'
                    })*/


            $urlRouterProvider.otherwise('menu.map');
        });