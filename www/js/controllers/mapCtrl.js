angular.module('app.controllers')
        .controller('mapCtrl', function ($scope, $ionicPlatform, MapService, $state,backButton,configService,WebService) {
            $scope.$on("$ionicView.beforeEnter", function (event, data) {
                if (window.localStorage.getItem('AccountId')) {
                } else {
                    $state.go("login");
                }

            });
            $ionicPlatform.ready(function () {
/*
                WebService.wepServiceConnector("", "postPatemptyRequest", false).then(function (result) {
                });
                */
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                $scope.div = document.getElementById("map_canvas");
                $scope.$on("$ionicView.enter", function (event, data) {
                    configService.setEmptyReqLock(true);
                    $scope.map = MapService.DrawMap($scope.div);
                    backButton.GetSpecLocalDB(150,false,false,true);
                });
                
                
                

            });
            $scope.$on('$stateChangeStart', function (e) {
                configService.setEmptyReqLock(false);
                   backButton.GetSpecLocalDB(1000,false,false,false);
                   //$scope.div = null;
                   MapService.UnDrawMap($scope.div);
                });
        });