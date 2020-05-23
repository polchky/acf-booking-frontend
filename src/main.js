import Vue from 'vue';
import Router from 'vue-router';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';
import service from '@/assets/js/service';

import bookingsComponent from '@/components/Bookings.vue';
import loginComponent from '@/components/Login.vue';
import newBookingComponent from '@/components/NewBooking.vue';
import profileComponent from '@/components/Profile.vue';
import recoverComponent from '@/components/Recover.vue';
import registerComponent from '@/components/Register.vue';
import resetComponent from '@/components/Reset.vue';
import validateComponent from '@/components/Validate.vue';

Vue.config.productionTip = false;

const ifNotAuthenticated = (to, from, next) => {
    if (!service.auth.isLoggedIn()) {
        next();
        return;
    }
    next({ name: 'bookings' });
};

const ifAuthenticated = (to, from, next) => {
    if (service.auth.isLoggedIn()) {
        next();
        return;
    }
    next({ name: 'login' });
};

const router = new Router({
    routes: [
        { name: 'home', path: '/', redirect: '/bookings' },
        {
            name: 'bookings',
            path: '/bookings',
            component: bookingsComponent,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'login',
            path: '/login',
            component: loginComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'newBooking',
            path: '/book',
            component: newBookingComponent,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'recover',
            path: '/recover',
            component: recoverComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'register',
            path: '/register',
            component: registerComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'reset',
            path: '/reset',
            component: resetComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'validate',
            path: '/validate',
            component: validateComponent,
        },
        {
            name: 'profile',
            path: '/profile',
            component: profileComponent,
            beforeEnter: ifAuthenticated,
        },
    ],
});

Vue.use(Router);

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
}).$mount('#app');
