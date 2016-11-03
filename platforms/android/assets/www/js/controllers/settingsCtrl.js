angular.module('app.controllers')
        .controller('settingsCtrl', function ($scope, profileService, $state) {
            $scope.signOut = function () {
                window.localStorage.removeItem('AccountId');
                window.localStorage.clear();
                $state.go('login');
            };
            $scope.goBackview = function () {
                $state.go('menu.map');
            };

            $scope.List = null;//profileService.GetProfileLocalDB();
            $scope.mainName ='name';// $scope.List[0].main.name;

            $scope.editPatient = function (index) {
                var data = $scope.List[index].data;
                $state.go('editFamilyMember', {_details: JSON.stringify(data)});
            };

            $scope.editeAccount = function () {
                $state.go('editProfileAccount');
            };

            $scope.changePassword = function () {
                $state.go('changePassword');
            };
        });