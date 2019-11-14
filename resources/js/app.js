require('./bootstrap');

window.Vue = require('vue');

import VueRouter from "vue-router";

Vue.use(VueRouter);

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Users from './components/Users';
import moment from 'moment';

import { Form, HasError, AlertError } from 'vform'
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

let routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/profile', component: Profile },
    { path: '/users', component: Users }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('prityDate', function(date){
    return moment(date).format('D/M/YYYY');
});

const app = new Vue({
    el: '#app',
    router
});
