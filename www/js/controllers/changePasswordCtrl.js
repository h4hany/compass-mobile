angular.module('app.controllers')
        .controller('changePasswordCtrl', function ($scope, WebService, $state) {
            $scope.changePassword = function (userData) {
                var data = $.param({
                    acountId: window.localStorage.getItem('AccountId'),
                    newPassword: userData.newPassword,
                    oldPassword: userData.oldPassword
                });
                WebService.wepServiceConnector(data, "updateChangePassword", false).then(function (result) {
                    var response = result.result;
                    if (response === 'true') {
                        alert('Password changed');
                        $state.go('settings');
                    } else {
                        alert('old password not correct');
                    }
                });
            };
        });