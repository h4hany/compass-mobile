angular.module('app.controllers')
        .controller('requestDoctorConfirmationCtrl', function ($scope, WebService, $state, $stateParams, $rootScope) {
            var request_by = window.localStorage.getItem('patientAccountId')
            $scope.doctorName = $stateParams.first_name + ' ' + $stateParams.last_name
            $scope.fees = $stateParams.fees;
            $scope.distanc = $stateParams.distanc;
            $scope.grade = $stateParams.grade;
            $scope.spe_name = $stateParams.specialization;
            $scope.gender = $stateParams.gender;
            $scope.payment = 1;
            $scope.image = $scope.base_url + $stateParams.image;
            $scope.notes = "";
            $scope.rating = Math.round($stateParams.rate);

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
            $scope.obj = {notes: ""};
            $scope.confirm = function (obj) {
                var note = obj.notes;
                var geocoder = new google.maps.Geocoder();
                var latlng = {lat: parseFloat($scope.pos.latitude), lng: parseFloat($scope.pos.longitude)};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        $scope.address = results[0].formatted_address;

                    }
                });
                var responsedata = $.param({
                    Visit: {
                        doctor_id: $stateParams.id,
                        requested_by: request_by,
                        requested_for: $stateParams.patientId,
                        visit_latitude: $scope.pos.latitude,
                        visit_longitude: $scope.pos.longitude,
                        payment: $scope.payment,
                        notes: note,
                        address: $scope.address
                    }
                });

                WebService.wepServiceConnector(responsedata, "postCreateVisitRequest", false).then(function (result) {
                    var response = result.result;
                    if (response.result == true) {
                        window.sessionStorage.setItem('visitId', response.visit_id);
                        $state.go("menu.map");

                    }
                });

            };

            $scope.cancel = function () {
                $state.go('doctorList');
            };

        });
