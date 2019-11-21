require('./bootstrap');

window.Vue = require('vue');

import VueRouter from "vue-router";

Vue.use(VueRouter);

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Users from './components/Users';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    height: '3px'
    /*transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false*/
});

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
