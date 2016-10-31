angular.module('app.services')
        .service('notificationService', ['WebService', 'configService', '$state','$interval','$rootScope', function (WebService, configService, $state,$interval,$rootScope) {
                var mainScope = this;
                this.GetNotifyLocalDB = function () {
                    var data = window.localStorage.getItem('notification');
                    return (data !== null && data != 'undefined') ? JSON.parse(data) : null;
                };
                this.GetNotifyVerLocalDB = function () {
                    var data = window.localStorage.getItem('notificationVer');
                    return (data !== null && data != 'undefined') ? JSON.parse(data) : -1;
                };
                this.DeleteNotifyLocalDB = function () {
                    window.localStorage.removeItem('notificationVer');
                    window.localStorage.removeItem('notification');
                };
                this.UpdateVisitLocalDB = function (visit) {
                    window.localStorage.setItem('visitVer', visit.visitVer);
                    var newvisit = null;
                    if (mainScope.GetVisitLocalDB() === null)
                    {
                        newvisit = visit.visit;
                    } else
                    {
                        var obj = mainScope.GetVisitLocalDB();
                        var newObj = visit.visit
                        newObj.forEach(function (entry) {
                            obj.push(entry);
                        });
                        obj.concat(visit.visit);
                        newvisit = obj;

                    }
                    window.localStorage.setItem('visit', JSON.stringify(newvisit));

                };

                this.DeleteNotifyById = function (index) {
                    var obj = mainScope.GetNotifyLocalDB();
                    obj.splice(index, 1);
                    window.localStorage.removeItem('notification');
                    window.localStorage.setItem('notification', JSON.stringify(obj));
                };

                this.DeleteNotifyByServerId = function (index) {
                    var obj = mainScope.GetNotifyLocalDB();
                    for (var i = 0; i < obj.length; i++)
                    {
                        if (obj[i].notification_id == index)
                        {
                            obj.splice(i, 1);
                            i = obj.length + 10;
                        }
                    }
                    window.localStorage.removeItem('notification');
                    window.localStorage.setItem('notification', JSON.stringify(obj));
                };

                this.notifyService = function (notification) {
                    notification.forEach(function (entry) {
                        var data = entry;
                        if (data.message_type == '1') {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            cordova.plugins.notification.local.schedule({
                                id: "1",
                                date: alarmTime,
                                message: "Please click here to follow the visit.",
                                title: "Visit Request Accepted",
                                autoCancel: false,
                                icon: "img/icon.png",
                            })
                            cordova.plugins.notification.local.on("click", function () {
                                console.log(data);
                                $state.go("menu.doctorMap", {doctor_id: data.doctor_id, notification_id: data.notification_id, visit_id: data.visit_id});
                            });
                            $rootScope.disableCancelBtn = false;
                            $rootScope.disableCancelBtnTime = 5;
                            mainScope.stop = $interval(function () {
                                $rootScope.disableCancelBtnTime = $rootScope.disableCancelBtnTime - 1;
                                if ($rootScope.disableCancelBtnTime <= 0) {
                                    $rootScope.disableCancelBtnTime = 0;
                                    $interval.cancel(mainScope.stop);
                                    $rootScope.disableCancelBtn = true;
                                }
                            }, 60000, $rootScope.disableCancelBtnTime);
                        } else if (data.message_type == '3') {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            cordova.plugins.notification.local.schedule({
                                id: "1",
                                date: alarmTime,
                                message: "Please click here to view the report.",
                                title: "Visit Ended",
                                autoCancel: false,
                                icon: "img/icon.png",
                            })
                            cordova.plugins.notification.local.on("click", function () {
                                $state.go("visitReport", {report: data});
                            });
                        } else if (data.message_type == '0') {
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes());
                            cordova.plugins.notification.local.schedule({
                                id: "1",
                                date: alarmTime,
                                message: "Please click here to choose another doctor.",
                                title: "Visit Request Rejected",
                                autoCancel: false,
                                icon: "img/icon.png"
                            });
                            cordova.plugins.notification.local.on("click", function () {
                                
                                $state.go("specialization");
                                var dataobj = $.param({
                                    notification_id: data.notification_id
                                });
                                mainScope.DeleteNotifyByServerId(data.notification_id);

                                WebService.wepServiceConnector(dataobj, "postSeenNotification", false).then(function (result) {
                                    var response = result.result;
                                });
                            });
                        }
                    });
                };


                this.UpdateNotifyLocalDB = function (notification) {
                    if (notification.notificationVer != 'undefined' || notification.notificationVer != null) {
                        window.localStorage.setItem('notificationVer', notification.notificationVer);
                    }
                    var newnotify = null;
                    if (mainScope.GetNotifyLocalDB() === null)
                    {
                        newnotify = notification.notification;
                    } else
                    {
                        var obj = mainScope.GetNotifyLocalDB();
                        var newObj = notification.notification
                        newObj.forEach(function (entry) {
                            obj.push(entry);
                        });
                        obj.concat(notification.notification);
                        newnotify = obj;

                    }
                    window.localStorage.setItem('notification', JSON.stringify(newnotify));
                    mainScope.notifyService(notification.notification);

                };

                this.GetNotifyFromServer = function () {
                    var data = $.param({
                        'notify': mainScope.GetNotifyVerLocalDB(),
                        'patient_account_id': window.localStorage.getItem('patientAccountId'),
                    });
                    if (configService.getNotifyLock() != false) {
                        configService.setNotifyLock(false);
                        WebService.wepServiceConnector(data, "getNotificationMenu", false).then(function (result) {
                            mainScope.UpdateNotifyLocalDB(result);
                        });
                    }
                };
            }]);