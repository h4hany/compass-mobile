angular.module('app.controllers')
        .controller('AddFamilyMemberCtrl', function ($scope, $state, $ionicPlatform,$ionicHistory, WebService, allergiesService, diseasesService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.goBackview = function () {
               navigator.app.backHistory();
                    // $ionicHistory.backView().go();
             };
            });
            
            var patientData = {'dateOfBirth': new Date()};
            $scope.allergies = allergiesService.GetAllergiesLocalDB();
            $scope.diseases = diseasesService.GetDiseasesLocalDB();
            $scope.addMember = function (patientData, outputAllergiesList, outputDiseasesList) {
                var data = $.param({
                    'Patient[first_name]': patientData.firstName,
                    'Patient[last_name]': patientData.lastName,
                    'Patient[gender]': patientData.gender,
                    'Patient[date_of_birth]': patientData.birthDay,
                    'Patient[patient_account_id]': window.localStorage.getItem('patientAccountId'),
                    allergies: outputAllergiesList,
                    diseases: outputDiseasesList,
                });
                WebService.wepServiceConnector(data, "postPatientsCreate", true).then(function (result) {
                    var response = result.result;
                    if (response.status == '1') {
                        alert("Added successfully");
                        $state.go('settings');
                    }

                });
            }
        });