angular.module('app.controllers')
        .controller('editFamilyMemberCtrl', function ($scope, WebService, $state, $stateParams, allergiesService, diseasesService, $ionicPlatform) {
            var patientData = {'dateOfBirth': new Date()};
            $scope.allergies = allergiesService.GetAllergiesLocalDB();

            $scope.diseases = diseasesService.GetDiseasesLocalDB();

            $scope.patientData = JSON.parse($stateParams.patient_details);
            if ($scope.flag && $scope.patientData != null) {

                var patientData = $scope.patientData;
                /////////////////////
                var allergiesIds = new Array();
                for (var i = 0; i < patientData.allargies.length; i++) {
                    allergiesIds.push(patientData.allargies[i].id);
                }
                for (var i = 0; i < $scope.allergies.length; i++) {
                    if (allergiesIds.indexOf($scope.allergies[i].id) != -1) {
                        $scope.allergies[i].ticked = true;
                    }
                }
                var diseasesIds = new Array();
                for (var i = 0; i < patientData.diseases.length; i++) {
                    diseasesIds.push(patientData.diseases[i].id);
                }
                for (var i = 0; i < $scope.diseases.length; i++) {
                    if (diseasesIds.indexOf($scope.diseases[i].id) != -1) {
                        $scope.diseases[i].ticked = true;
                    }
                }

                /////////////////////
            }

            $scope.editPatient = function (patientData, outputAllergiesList, outputDiseasesList) {

                var data = $.param({
                    id: $scope.patientData.id,
                    'User[first_name]': patientData.firstName,
                    'User[last_name]': patientData.lastName,
                    'Patient[gender]': patientData.gender,
                    'Patient[date_of_birth]': patientData.dateOfBirth,
                    'Patient[patient_account_id]': window.localStorage.getItem('patientAccountId'),
                    allergies: outputAllergiesList,
                    diseases: outputDiseasesList,
                });
                WebService.wepServiceConnector(data, "postPatientsEdit", false).then(function (result) {
                    var response = result.result;
                    if (response.status == '1') {
                        alert("edit successfully");
                        $state.go('settings');
                    }
                });
            };
        });