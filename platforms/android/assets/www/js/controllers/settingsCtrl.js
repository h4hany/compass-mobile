angular.module('app.controllers')
        .controller('settingsCtrl', function ($scope, profileService, $state, $ionicPlatform) {
            $scope.signOut = function () {
                window.localStorage.removeItem('patientAccountId');
                window.localStorage.clear();
                $state.go('login');
            };
            $scope.goBackview = function () {
                $state.go('menu.map');
            };
            $scope.addFamilyMember = function () {
                $state.go('AddFamilyMember');
            };
            $scope.patientsList = profileService.GetProfileLocalDB();
            $scope.mainName = $scope.patientsList[0].main.name;

            $scope.editPatient = function (index) {
                var data = $scope.patientsList[index].data;
                $state.go('editFamilyMember', {patient_details: JSON.stringify(data)});
            };

            $scope.editeAccount = function () {
                $state.go('editPatientAccount');
            };

            $scope.changePassword = function () {
                $state.go('changePassword');
            };
        });