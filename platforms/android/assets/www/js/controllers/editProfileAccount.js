angular.module('app.controllers')
        .controller('editProfileAccountCtrl', function ($scope, WebService, $state, $stateParams) {
            var Data = {'dateOfBirth': new Date()};
           
            $scope.Data = JSON.parse($stateParams._details);
            if ($scope.flag && $scope.Data != null) {

                var Data = $scope.Data;
                /////////////////////
                var allergiesIds = new Array();
                for (var i = 0; i < Data.allargies.length; i++) {
                    allergiesIds.push(Data.allargies[i].id);
                }
                for (var i = 0; i < $scope.allergies.length; i++) {
                    if (allergiesIds.indexOf($scope.allergies[i].id) != -1) {
                        $scope.allergies[i].ticked = true;
                    }
                }
                var diseasesIds = new Array();
                for (var i = 0; i < Data.diseases.length; i++) {
                    diseasesIds.push(Data.diseases[i].id);
                }
                for (var i = 0; i < $scope.diseases.length; i++) {
                    if (diseasesIds.indexOf($scope.diseases[i].id) != -1) {
                        $scope.diseases[i].ticked = true;
                    }
                }

                /////////////////////
            }

            $scope.edit = function (Data, outputAllergiesList, outputDiseasesList) {

                var data = $.param({
                    id: $scope.Data.id,
                    'User[first_name]': Data.firstName,
                    'User[last_name]': Data.lastName,
                    '[gender]': Data.gender,
                    '[date_of_birth]': Data.dateOfBirth,
                    '[_account_id]': window.localStorage.getItem('AccountId'),
                    allergies: outputAllergiesList,
                    diseases: outputDiseasesList,
                });
                WebService.wepServiceConnector(data, "postsEdit", false).then(function (result) {
                    var response = result.result;
                    if (response.status == '1') {
                        alert("edit successfully");
                        $state.go('settings');
                    }
                });
            };
        });