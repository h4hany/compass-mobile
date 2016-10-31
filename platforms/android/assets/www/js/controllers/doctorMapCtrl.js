angular.module('app.controllers')
        .controller('doctorMapCtrl', function ($scope, WebService, $state, $stateParams, $interval, DoctorMapService, notificationService, configService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                configService.setEmptyReqLock(true);
                $scope.CancelVisitRequest = function () {
                    var data = $.param(
                            {
                                'doctor_id': $stateParams.doctor_id,
                                'patient_account_id': window.localStorage.getItem('patientAccountId'),
                                'visit_id': $stateParams.visit_id,
                                'notification_id': $stateParams.notification_id,
                            });
                    var idNot=$stateParams.notification_id;
                    notificationService.DeleteNotifyByServerId(idNot);
                    DoctorMapService.UnDrawMapDoctor($scope.div);
                    configService.setEmptyReqLock(false);
                    WebService.wepServiceConnector(data, "postCancelVisitRequest", false).then(function (result) {
                        var data = result.result;
                        $state.go('menu.map');
                    });
                };
                $scope.div = document.getElementById("map_canvas2");
                var map2 = DoctorMapService.DrawMapDoctor($scope.div, $stateParams.doctor_id);
                $scope.time = 7;
                var data = $.param({
                    id: $stateParams.doctor_id
                });
                var myLocation = new google.maps.LatLng($scope.pos.latitude, $scope.pos.longitude);
                WebService.wepServiceConnector(data, "getDoctorData", false).then(function (result) {
                    var response = result.result;
                    $scope.first_name = response.first_name;
                    $scope.last_name = response.last_name;
                    $scope.fees = response.fees;
                    var doctorLocation = new google.maps.LatLng(response.latitude, response.longitude);
                    $scope.distanc = google.maps.geometry.spherical.computeDistanceBetween(doctorLocation, myLocation) / 1000;
                    $scope.distanc = parseFloat($scope.distanc).toFixed(2);
                });
                stop = $interval(function () {
                    $scope.time = $scope.time - 1;
                }, 1000, $scope.time);
            });
            $scope.$on("$ionicView.leave", function (event, data) {
                DoctorMapService.UnDrawMapDoctor($scope.div);
                configService.setEmptyReqLock(false);
            });
        });