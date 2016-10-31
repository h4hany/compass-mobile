angular.module('app.services')
        .service('ApiService', ['configService', function (configService) {
                this.siteURL = configService.getLocalServerUrl();//'url';
                this.apiDIR = configService.getApiDIR();//'api/';
                this.getApiUrl = function (api) {
                    switch (api) {
                        /************* Change Doctor Password ***************/
                        case "updateChangePassword":
                            return this.siteURL + this.apiDIR + "patientsAccounts/changepassword/";
                            break;
                            /************* End Visit****************/
                        case "getInvestigations":
                            return this.siteURL + this.apiDIR + "investigations/list/";
                            break;
                        case "getTreatments":
                            return this.siteURL + this.apiDIR + "treatments/list/";
                            break;
                        case "getEndVisitInvestigations":
                            return this.siteURL + this.apiDIR + "investigations/list/";
                            break;
                        case "getEndVisitTreatments":
                            return this.siteURL + this.apiDIR + "treatments/list/";
                            break;
                        case "getEndVisitPayment":
                            return this.siteURL + this.apiDIR + "visits/getPayment/";
                            break;
                        case "postEndVisitForm":
                            return this.siteURL + this.apiDIR + "visits/endVisit";
                            break;
                            /************ Doctor Home *****************/
                        case "postHomeSetLocation":
                            return this.siteURL + this.apiDIR + "doctorLocation/setLocation/";
                            break;
                        case "getDoctorStatus":
                            return this.siteURL + this.apiDIR + "doctors/getStatus/";
                            break;
                        case "getDoctorNotification":
                            return this.siteURL + this.apiDIR + "doctors/notification";
                            break;
                        case "postSeenNotification":
                            return this.siteURL + this.apiDIR + "patientsAccounts/seenNotification/";
                            break;
                        case "postDoctorStatus":
                            return this.siteURL + this.apiDIR + "doctors/doctorStatus/";
                            break;

                            /*********** Forget Password******************/
                        case "postForgotPasswordRequest":
                            return this.siteURL + this.apiDIR + "users/forgetPasswordRequest/";
                            break;

                            /************* Login ****************/
                        case "login":
                            return this.siteURL + this.apiDIR + "PatientsAccounts/login/";
                            break;
                            /************ New Password *****************/
                        case "postNewPassword":
                            return this.siteURL + this.apiDIR + "users/saveNewPassword/";
                            break;
                            /************ last Notification *****************/
                        case "getDiseases":
                            return this.siteURL + this.apiDIR + "patients/getDiseases";
                            break;
                        case "getAllergies":
                            return this.siteURL + this.apiDIR + "patients/getAllergies";
                            break;
                        case "postVisitAccept":
                            return this.siteURL + this.apiDIR + "visits/accept";
                            break;
                        case "postVisitReject":
                            return this.siteURL + this.apiDIR + "visits/reject";
                            break;
                            /************ Notification Menu *****************/
                        case "getNotificationMenu":
                            return this.siteURL + this.apiDIR + "patientsAccounts/getallnotifications/";
                            break;
                            /************ Patient Location *****************/
                        case "postPatientLocationMap":
                            return this.siteURL + this.apiDIR + "visits/startVisit";
                            break;
                            /************** Profile ***************/
                        case "getDoctorProfile":
                            return this.siteURL + this.apiDIR + "doctors/getDataFromDb";
                            break;
                        case "getDoctorPhoto":
                            return this.siteURL + "uploads/doctors/photos/";
                            break;
                            /************** Profile ***************/
                        case "postProfileEdit":
                            return this.siteURL + "doctors/editDoctor";
                            break;
                            /************ Visit Details *****************/
                        case "getVisitData":
                            return this.siteURL + this.apiDIR + "visits/data/";
                            break;
                            /************ Visit History *****************/
                        case "visitHistory":
                            return this.siteURL + this.apiDIR + "visits/list/";
                            break;
                            /************ Doctor Profile *****************/
                        case "getDocProfile":
                            return this.siteURL + this.apiDIR + "getDoctorProfile";
                            break;

                        case "getDocData":
                            return this.siteURL + this.apiDIR + "doctors/getDocData";
                            break;

                        case "getDocGrades":
                            return this.siteURL + this.apiDIR + "doctors/DoctorGradesList";
                            break;


                        case "getDocSpecialization":
                            return this.siteURL + this.apiDIR + "Specialization/ReturnAllSpecialization";
                            break;

                        case "getAllAllergies":
                            return this.siteURL + this.apiDIR + "Allergies/list";
                            break;
                        case "getAllDiseases":
                            return this.siteURL + this.apiDIR + "Diseases/list";
                            break;
                        case "getAllArea":
                            return this.siteURL + this.apiDIR + "AreaOfInterset/list";
                            break;


                        case "postDoctoremptyRequest":
                            return this.siteURL + this.apiDIR + "doctors/DoctoremptyRequest";
                            break;

                        case "postPatientsCreate":
                            return this.siteURL + this.apiDIR + "patients/create/";
                            break;
                        case "postPatientsConfirmAccount":
                            return this.siteURL + this.apiDIR + "patientsAccounts/confirmAccount/";
                            break;
                            /************ Patient API*****************/
                        case "postCancelVisitRequest":
                            return this.siteURL + this.apiDIR + "visits/CancelVisitRequest/";
                            break;
                        case "getDoctorData":
                            return this.siteURL + this.apiDIR + "doctors/doctorData/";
                            break;
                        case "postPatientsEdit":
                            return this.siteURL + this.apiDIR + "patients/edit/";
                            break;
                        case "getPatientData":
                            return this.siteURL + this.apiDIR + "patientsAccounts/patientData/";
                            break;
                        case "postSaveNewPassword":
                            return this.siteURL + this.apiDIR + "users/saveNewPassword";
                            break;
                        case "postForgetPasswordRequest":
                            return this.siteURL + this.apiDIR + "users/forgetPasswordRequest";
                            break;
                        case "postCreateVisitRequest":
                            return this.siteURL + this.apiDIR + "visits/createVisitRequest/";
                            break;
                        case "postCreatePatient":
                            return this.siteURL + this.apiDIR + "patientsAccounts/createPatient/";
                            break;
                        case "getMinorSpecialization":
                            return this.siteURL + this.apiDIR + "specialization/returnMinorSpecialization/";
                            break;
                        case "postRatingDoctor":
                            return this.siteURL + this.apiDIR + "doctorsRating/ratingDoctor/";
                            break;
                        case "postPatientsList":
                            return this.siteURL + this.apiDIR + "patients/patientsList/";
                            break;
                        case "postPatientData":
                            return this.siteURL + this.apiDIR + "patients/patientData/";
                            break;
                        case "postPatemptyRequest":
                            return this.siteURL + this.apiDIR + "patientsAccounts/PatemptyRequest";
                            break;
                        case "getSpecialization":
                            return this.siteURL + this.apiDIR + "specialization/returnAllSpecialization";
                            break;
                        case "getReturnDoctorsList":
                            return this.siteURL + this.apiDIR + "doctors/returnDoctorsList/";
                            break;
                        case "getDoctorLocation":
                            return this.siteURL + this.apiDIR + "doctors/geDoctorLocation/";
                            break;
                            /*****************************/
                        default:
                            return this.siteURL;
                    }



                };
            }]);
