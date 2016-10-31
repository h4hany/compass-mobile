angular.module('app.controllers')
        .controller('loginCtrl', function ($scope, $injector, $state, WebService, backButton) {
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, false, true);
            });
            $scope.$on("$ionicView.leave", function (event, data) {
                backButton.GetSpecLocalDB(501,false,false,false);
            });

            $scope.login = function () {
                /*validation*/
                $('#loginForm').validate({
                    rules: {
                        'LoginForm[mobile]': {
                            required: true
                        },
                        'LoginForm[password]': {
                            required: true
                        }
                    },
                    messages: {
                        'LoginForm[mobile]': {
                            required: "Please enter mobile number"
                        },
                        'LoginForm[password]': {
                            required: "Please enter password"
                        }
                    },
                    errorPlacement: function (error, element)
                    {
                        element.attr('title', error.text());
                        $(".error").tooltip(
                                {
                                    position:
                                            {
                                                my: "left+5 center",
                                                at: "right center"
                                            },
                                    tooltipClass: "ttError"
                                });


                    }
                });

                if ($('#loginForm').valid()) {
                    var data = $('#loginForm').serialize();
                    WebService.wepServiceConnector(data, "login", true).then(function (result) {
                        var data = result.result;

                        if (data.valid && data.code == 1)
                        {
                            window.localStorage.setItem('patientAccountId', data.patientAccountId);
                            window.localStorage.setItem('token', data.token);
                            var injector = $injector.get('profileService');
                            injector.UpdateProfileLocalDB(result);
                            $state.go("menu.map");
                        } else if (data.code == 0) {

                            $state.go("confirmation");
                        } else if (data.code == 2) {
                            $("#errorsdialog").html("your account has been deactivated please contact support...");
                            $("#errorsdialog").dialog();
                        } else {

                            var message = /*"Incorrect mobile or password ""<ul><li>" + data.user.mobile + "</li></ul>" +*/
                                    "<ul><li>" + data.user.password + "</li></ul>";
                            $("#errorsdialog").html(message);
                            $("#errorsdialog").dialog();
                        }

                    });
                }
            }


        });
