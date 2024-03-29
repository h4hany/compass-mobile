angular.module('app.controllers')
        .controller('searchListCtrl', function ($scope, $state, $stateParams, DoctorsService, $ionicPlatform,configService) {
            configService.setEmptyReqLock(true);
            var myLocation = new google.maps.LatLng($scope.pos.latitude, $scope.pos.longitude);
            $scope.speId = $stateParams.speId;
            $scope.genderSP = $stateParams.gender;
            $scope.GradeSP = $stateParams.grade;
            $scope.MajorName = $stateParams.major;
            $scope.MinorName = $stateParams.minor;
            $scope.intervalclear = setInterval(function () {
                DoctorsService.GetDoctors({
                    lat: $scope.pos.latitude,
                    long: $scope.pos.longitude,
                    specialization_id: $scope.speId,
                    gender: $scope.genderSP,
                    grade: $scope.GradeSP,
                }).then(function (data) {
                    $scope.doctor_list = data;
                    for (i = 0; i < data.length; i++) {
                        var tempR = Math.round(data[i].rating);
                        $scope.rating = (tempR != null && tempR != 'undefined') ? tempR : 0;
                        $scope.ratingsObject = {
                            iconOn: 'ion-ios-star', //Optional
                            iconOff: 'ion-ios-star', //'ion-ios-star-outline', //Optional
                            iconOnColor: '#ff7c00', //Optional
                            iconOffColor: '#e3e3e3', //Optional
                            rating: $scope.rating, //Optional
                            maxRating: 5,
                            minRating: 0,
                            readOnly: true, //Optional
                            callback: function (rating) {    //Mandatory
                                $scope.ratingsCallback(rating);
                            }
                        };
                        $scope.spe_name = data[i].spe_name;
                        var doctorLocation = new google.maps.LatLng(data[i].latitude, data[i].longitude);
                        $scope.distanc = google.maps.geometry.spherical.computeDistanceBetween(doctorLocation, myLocation) / 1000;
                        $scope.distanc = parseFloat($scope.distanc).toFixed(2);
                    }
                });
            }, 5000);
            $scope.confirm = function (first_name, last_name, id, fees, grade, specialization, rate, gender, image) {
                clearInterval($scope.intervalclear);
                var first_name_v = (first_name != null && first_name != 'undefined') ? first_name : "";
                var last_name_v = (last_name != null && last_name != 'undefined') ? last_name : "";
                var id_v = (id != null && id != 'undefined') ? id : "";
                var fees_v = (fees != null && fees != 'undefined') ? fees : "";
                var grade_v = (grade != null && grade != 'undefined') ? grade : "";
                var specialization_v = (specialization != null && specialization != 'undefined') ? specialization : "";
                var rate_v = (rate != null && rate != 'undefined') ? rate : "";
                var gender_v = (gender != null && gender != 'undefined') ? gender : "";
                var image_v = (image != null && image != 'undefined') ? image : "";
                $state.go('requestDoctorConfirmation', {first_name: first_name_v, last_name: last_name_v, id: id_v, fees: fees_v, distanc: $scope.distanc, patientId: $stateParams.patientId, grade: grade_v, specialization: specialization_v, rate: rate_v, gender: gender_v, image: image_v})
                configService.setEmptyReqLock(false);
            };
            $scope.$on("$ionicView.leave", function (event, data) {
                configService.setEmptyReqLock(false);
                clearInterval($scope.intervalclear);
            });
        });
