angular.module('app.services')
        .service('configService', [function () {
                var mainScope = this;
                this.blockSec = 5000;
                this.blockSecurgent = 5000;
                this.blocknormal = 10000;
                this.GlopalTimer = 10000;
                this.EmptyReqLock = false;
                this.getEmptyReqLock = function () {
                    return mainScope.EmptyReqLock;
                };
                this.setEmptyReqLock = function (val) {
                    mainScope.EmptyReqLock = val;
                };
                this.changeGlopalTimer = function (val) {
                    mainScope.EmptyReqLock = val;
                    if (val) {
                        mainScope.GlopalTimer = mainScope.blockSecurgent;
                    } else
                    {
                        mainScope.GlopalTimer = mainScope.blocknormal;
                    }
                };
                this.getGlopalTimer = function () {
                    return mainScope.GlopalTimer;
                };
                /********START********Config Update Glopal Service Bloker Example**********/
                this.glopalExampleLock = false;
                this.glopalExampleBlockTimer = 0;
                this.getAllergiesLock = function () {
                    return this.glopalExampleLock;
                };

                this.setAllergiesLock = function (val) {
                    if (val) {
                        if (mainScope.glopalExampleBlockTimer == 0)
                        {
                            mainScope.glopalExampleLock = val;
                            mainScope.glopalExampleBlockTimer = mainScope.blockSec;
                            var glopalExampleInterval = setInterval(function () {
                                mainScope.glopalExampleBlockTimer -= 1000;
                                if (mainScope.glopalExampleBlockTimer < 0 || mainScope.glopalExampleBlockTimer == 0) {
                                    clearInterval(glopalExampleInterval);
                                    mainScope.glopalExampleBlockTimer = 0;
                                }
                            }, 1000);
                        }

                    } else {
                        this.glopalExampleLock = val;
                    }
                };
                /********END********Config Update Glopal Service Bloker Example**********/                /********START********Config Update Notification**********/
                this.notifyLock = false;
                this.notifyBlockTimer = 0;
                this.getNotifyLock = function () {
                    return this.notifyLock;
                };

                this.setNotifyLock = function (val) {
                    if (val) {
                        if (mainScope.notifyBlockTimer == 0)
                        {
                            mainScope.notifyLock = val;
                            mainScope.notifyBlockTimer = mainScope.blockSec;
                            var notifyInterval = setInterval(function () {
                                mainScope.notifyBlockTimer -= 1000;
                                if (mainScope.notifyBlockTimer < 0 || mainScope.notifyBlockTimer == 0) {
                                    clearInterval(notifyInterval);
                                    mainScope.notifyBlockTimer = 0;
                                }
                            }, 1000);
                        }

                    } else {
                        this.notifyLock = val;
                    }
                };
                /********END********Config Update Notification**********/

                /********START********Config Update Profile**********/
                this.profileLock = false;
                this.profileBlockTimer = 0;
                this.getProfileLock = function () {
                    return this.profileLock;
                };

                this.setProfileLock = function (val) {
                    if (val) {
                        if (mainScope.profileBlockTimer == 0)
                        {
                            mainScope.profileLock = val;
                            mainScope.profileBlockTimer = mainScope.blockSec;
                            var profileInterval = setInterval(function () {
                                mainScope.profileBlockTimer -= 1000;
                                if (mainScope.profileBlockTimer < 0 || mainScope.profileBlockTimer == 0) {
                                    clearInterval(profileInterval);
                                    mainScope.profileBlockTimer = 0;
                                }
                            }, 1000);
                        }

                    } else {
                        this.profileLock = val;
                    }
                };
                /********END********Config Update Profile**********/
                
                this.getAppPassword = function () {
                    return "aklel3asal7elw:D";
                };

                this.getAppType = function () {
                    return "pat";
                };

                this.getTestServerUrl = function () {
                    return "Should Be Replaced with Test Server URL";
                };

                this.getDevServerUrl = function () {
                    return "Should Be Replaced with Dev Server URL";
                };

                this.getLocalServerUrl = function () {
                    return "Should Be Replaced with Local Server URL";
                };

                this.getApiDIR = function () {
                    return "api/";
                };


            }]);