angular.module('app.controllers')
        .controller('FormExampleCtrl', function ($scope, $state, WebService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.goBackview = function () {
               navigator.app.backHistory();
                    // $ionicHistory.backView().go();
             };
            });
            
            var Data = {'dateOfBirth': new Date()};
            $scope.addMember = function (Data, outputAllergiesList, outputDiseasesList) {
                var data = $.param({
                    'Patient[first_name]': Data.firstName,
                    'Patient[last_name]': Data.lastName,
                    'Patient[gender]': Data.gender,
                    'Patient[date_of_birth]': Data.birthDay,
                    'Patient[_account_id]': window.localStorage.getItem('AccountId'),
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