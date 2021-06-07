import axios from 'axios';

const DepositApplicationStatus = {
    STATUS_NEW: 1,
    STATUS_WAITING_BORROWER_ASSIGN: 2,
    STATUS_WAITING_DECISION: 3,
    STATUS_APPROVED: 4,
    STATUS_CANCELED: 5,
    STATUS_SENT_FOR_REVISION: 6,
    STATUS_WAITING_MONEY_TRANSFER: 7,
    STATUS_DONE: 8,
};

const DepositPayoutScheduleStatus = {
    STATUS_NOT_PAID: 0,
    STATUS_PAID_OUT: 1,
    STATUS_PAYMENT_ERROR: 2,
};

const ResponseHandler = {
    dispatch(response) {
        if (response[0].code === 0) {
            return {
                result: response[0],
                data: response[0].data,
                status: true,
            };
        } else {
            return {
                data: response,
                status: false,
            };
        }
    },
};

class ManagerSDK {
    constructor(token, baseUrl, unitId) {
        axios.defaults.headers.common.Accept = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            axios.defaults.headers.common['MF-UNIT-ID'] = unitId;
        }

        this.axios = axios.create({
            baseURL: baseUrl,
            responseType: 'json',
        });
    }

    getAxios() {
        return this.axios;
    }

    approveDepositPayoutSchedule(params) {
        return this.getAxios().post('/deposit/manager/deposit-payout-schedule/approve', params);
    }
}

class BorrowerSDK {
    constructor(token, baseUrl, unitId) {
        axios.defaults.headers.common.Accept = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }

        axios.defaults.headers.common['MF-UNIT-ID'] = unitId;

        this.axios = axios.create({
            baseURL: baseUrl,
            responseType: 'json',
        });
    }

    getAxios() {
        return this.axios;
    }

    getBorrowerContacts() {
        return this.getAxios().post('borrower-contact/list');
    }

    getBorrowerCreditCards() {
        return this.getAxios().post('borrower-credit-card/list');
    }

    getDepositProducts() {
        return this.getAxios().post('/deposit/borrower/deposit-product/list');
    }

    assignDepositApplication(params) {
        return this.getAxios().post('/deposit/borrower/deposit-application/assign', params);
    }

    refillDepositApplication(params) {
        return this.getAxios().post('/deposit/borrower/deposit-application/refill', params);
    }

    getDeposit(params) {
        return this.getAxios().post('/deposit/borrower/deposit/get', params);
    }

    getDeposits(params) {
        params = params || {};

        return this.getAxios().post('/deposit/borrower/deposit/list', params);
    }

    refillDeposit(params) {
        return this.getAxios().post('/deposit/borrower/deposit/refill-deposit', params);
    }

    getDepositPayoutSchedules(params) {
        params = params || {};

        return this.getAxios().post('/deposit/borrower/deposit-payout-schedule/list', params);
    }

    addDepositPayoutSchedules(params) {
        return this.getAxios().post('/deposit/borrower/deposit-payout-schedule/add', params);
    }

    addDepositApplication(params) {
        return this.getAxios().post('/deposit/borrower/deposit-application/add', params);
    }
}

export {
    BorrowerSDK,
    ManagerSDK,
    ResponseHandler,
    DepositApplicationStatus,
};
