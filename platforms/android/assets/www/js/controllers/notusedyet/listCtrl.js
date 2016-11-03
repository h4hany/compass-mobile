angular.module('app.controllers')
        .controller('listCtrl', function ($scope, $state, $ionicPlatform, listService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.lists = listService.GetVisitLocalDB();
                $scope.listReport = function (index) {
                    $state.go('listDetails', {list_details: JSON.stringify($scope.lists[index])});
                };
            });
        });