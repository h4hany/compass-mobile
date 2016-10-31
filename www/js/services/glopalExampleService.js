angular.module('app.services')
        .service('glopalExampleService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetAllergiesLocalDB = function () {
                    var data = window.localStorage.getItem('glopalExample');
                    return (data != null && data != 'undefined') ? JSON.parse(data) : null;
                };

                this.DeleteAllergiesLocalDB = function () {
                    window.localStorage.removeItem('glopalExampleVer');
                    window.localStorage.removeItem('glopalExample');
                };

                this.UpdateAllergiesLocalDB = function (glopalExample) {
                    window.localStorage.setItem('glopalExampleVer', glopalExample.glopalExampleVer);
                    window.localStorage.setItem('glopalExample', JSON.stringify(glopalExample.glopalExample));
                };

                this.GetAllergiesFromServer = function () {
                    if (configService.getAllergiesLock() != false) {
                        configService.setAllergiesLock(false);
                        WebService.wepServiceConnector("", "getAllglopalExampleAPI URL", false).then(function (result) {
                            mainScope.UpdateAllergiesLocalDB(result);
                        });
                    }
                };
            }]);