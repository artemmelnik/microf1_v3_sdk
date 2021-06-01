import axios from 'axios';

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

    getBorrowerCreditCards() {
        return this.getAxios().post('borrower-credit-card/list');
    }

    getDepositProducts() {
        return this.getAxios().post('/deposit/borrower/deposit-product/list');
    }

    getDeposit(params) {
        return this.getAxios().post('/deposit/borrower/deposit/get', params);
    }

    refillDeposit(params) {
        return this.getAxios().post('/deposit/borrower/deposit/refill-deposit', params);
    }

    getDepositPayoutSchedules() {
        return this.getAxios().post('/deposit/borrower/deposit-payout-schedule/list');
    }

    addDepositPayoutSchedules(params) {
        return this.getAxios().post('/deposit/borrower/deposit-payout-schedule/add', params);
    }
}

export {
    BorrowerSDK,
    ManagerSDK,
    ResponseHandler,
};
