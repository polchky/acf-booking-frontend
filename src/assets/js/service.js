import axios from 'axios';

axios.defaults.baseURL = window.env.backendURL;

export default {

    auth: {

        getUserId() {
            return JSON.parse(atob(axios.defaults.headers.common.Authorization.split('.')[1])).userId;
        },

        isLoggedIn() {
            const auth = axios.defaults.headers.common.Authorization;
            if (!auth) return false;
            const token = auth.split(' ')[1];
            const exp = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
            const now = new Date();
            now.setMinutes(now.getMinutes() + 5);
            return exp > now;
        },

        register(data) {
            return axios.post('/auth/register', data);
        },

        validate(token) {
            return axios.post(`/auth/validate?token=${token}`);
        },

        async login(data) {
            const res = await axios.post('/auth/login', data);
            axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        },

        logout() {
            delete axios.defaults.headers.common.Authorization;
        },

        recover(data) {
            return axios.post('/auth/password/reset', data);
        },

        reset(data, token) {
            return axios.post(`/auth/password/set?token=${token}`, data);
        },
    },

    bookings: {

        list(from, to) {
            return axios.get(`/bookings/?from=${from}&to=${to}`);
        },

        create(booking) {
            return axios.post('/bookings/', booking);
        },

        delete(bookingId) {
            return axios.delete(`/bookings/${bookingId}`);
        },

        getAvailabilities(date, location) {
            return axios.get(`/bookings/available?date=${date}&location=${location}`);
        },
    },

    users: {

        list() {
            return axios.get('/users/');
        },

        get(userId) {
            return axios.get(`/users/${userId}`);
        },

        update(userId, user) {
            return axios.put(`/users/${userId}`, user);
        },

        async delete(userId) {
            await axios.delete(`/users/${userId}`);
            delete axios.defaults.headers.common.Authorization;
        },

    },

    config: {

        get() {
            return axios.get('/config');
        },

    },

};
