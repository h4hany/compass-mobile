angular.module('app.controllers')
        .controller('confirmationCtrl', function ($scope, WebService, $state) {
            $scope.confirmCode = function (confirmation) {
                var data = $.param({
                    code: confirmation.code
                });
                WebService.wepServiceConnector(data, "postPatientsConfirmAccount", false).then(function (result) {
                    var response = result.result;
                    if (response == 'confirm') {
                        $state.go('login');
                    } else {
                        alert('Code Not Corrcet please enter corccet code');
                        $state.go('confirmation');
                    }
                });
            };
        });
