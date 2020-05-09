import Vue from 'vue';
import Router from 'vue-router';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';

import bookingsComponent from '@/components/Bookings.vue';
import loginComponent from '@/components/Login.vue';
import profileComponent from '@/components/Profile.vue';
import registerComponent from '@/components/Register.vue';
import validateComponent from '@/components/Validate.vue';

Vue.config.productionTip = false;

const router = new Router({
    routes: [
        { name: 'home', path: '/', redirect: '/bookings' },
        { name: 'bookings', path: '/bookings', component: bookingsComponent },
        { name: 'login', path: '/login', component: loginComponent },
        { name: 'profile', path: '/profile', component: profileComponent },
        { name: 'register', path: '/register', component: registerComponent },
        { name: 'validate', path: '/validate', component: validateComponent },
    ],
    mode: 'history',
});

Vue.use(Router);

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
}).$mount('#app');
