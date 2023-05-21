export class Constants {
    static URL = class {
        static readonly LOGIN = "/login";
        static readonly PAYMENT = "/payment";
        static readonly PAYMENT_DETAILS = "/payment/details";

    };

    static API_END_POINTS = class {
        static readonly LOGIN = "/auth/login";
        static readonly PAYMENTS = "/payment";
        static readonly PAYMENT_PARENT = "/payment/parent";

    };

    static LOCAL_STORE_RESOURSES = class {
        static readonly TOKEN = "token";
        static readonly USER = "user";
    };


    static HTTP_STATUS = class {
        static readonly OK = 'Ok';
        static readonly SUCCESS = 200;
        static readonly UNSECCESS = 403;
        static readonly POST_SUCCESS = 201;
    };


}
