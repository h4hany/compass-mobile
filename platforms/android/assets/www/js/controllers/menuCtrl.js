angular.module('app.controllers')
        .controller('menuCtrl', function ($scope, profileService, $state, $ionicSideMenuDelegate,MapService) {
            $scope.menuopened = {'display': 'none', 'z-index': '-999'};
            $scope.menustatus = true;
            $("ion-item").removeClass("item-complex");
            $("ion-side-menu").removeClass("has-header");
            $scope.patientsList = profileService.GetProfileLocalDB();
            $scope.mainName = $scope.patientsList[0].main.name
            $scope.gender = $scope.patientsList[0].main.gender;
            if ($scope.patientsList[0].main.gender == 0) {
                $scope.image = "MaleaAvatar.png";
            } else {
                $scope.image = "FemaleAvatar.png";
            }
            $scope.image = $scope.base_url + "uploads/doctor-icon-dark-2.png";
            // 
            $scope.toggelmenu = function () {
                $ionicSideMenuDelegate.$getByHandle('sideMenu').toggleLeft();
                if ($ionicSideMenuDelegate.isOpen())
                {
                    $scope.menustatus = true;
                    $scope.menuopened = {'display': 'block', 'z-index': '999'};
                    MapService.setFalse();
                } else
                {
                    $scope.menuopened = {'display': 'none', 'z-index': '-999'};
                    $scope.menustatus = false;
                    MapService.setTrue();
                }
            };

            $scope.onSwipeLeft = function () {
                $scope.menuopened = {'display': 'none', 'z-index': '-999'};
                $scope.menustatus = false;
                MapService.setTrue();
            };


            $scope.onSwipeRight = function () {
                $scope.menustatus = true;
                $scope.menuopened = {'display': 'block', 'z-index': '999'};
                MapService.setFalse();
            };
            
            $scope.dewatch = $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
                    function (isOpen) {
                        if (isOpen) {
                            $scope.menustatus = true;
                            $scope.menuopened = {'display': 'block', 'z-index': '999'};
                            MapService.setFalse();
                        } else {
                            $scope.menuopened = {'display': 'none', 'z-index': '-999'};
                            $scope.menustatus = false;
                            MapService.setTrue();
                        }
                    });
            $scope.signOut = function () {
                window.localStorage.removeItem('patientAccountId');
                window.localStorage.clear();
                $state.go('home');
            };
            $scope.AddFamilyMember= function (){
                $state.go('AddFamilyMember');
            }
            
            $scope.$on("$ionicView.leave", function (event, data) {
               // $scope.dewatch();
            });

        });