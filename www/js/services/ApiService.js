angular.module('app.services')
        .service('ApiService', ['configService', function (configService) {
                this.siteURL = configService.getLocalServerUrl();
                this.apiDIR = configService.getApiDIR();
                this.getApiUrl = function (api) {
                    switch (api) {
                        /************* Change Doctor Password ***************/
                        case "defualtRequest":
                            return this.siteURL + this.apiDIR + "defualtRequest/defualtRequest/";
                            break;

                            /*****************************/
                        default:
                            return this.siteURL;
                    }



                };
            }]);
