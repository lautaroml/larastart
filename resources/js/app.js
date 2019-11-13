require('./bootstrap');

window.Vue = require('vue');

import VueRouter from "vue-router";

Vue.use(VueRouter);

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Users from './components/Users';

let routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/profile', component: Profile },
    { path: '/users', component: Users }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

const app = new Vue({
    el: '#app',
    router
});
