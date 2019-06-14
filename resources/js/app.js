import "./bootstrap";
import Vue from 'vue';

import Routes from './routes.js';
import Navbar from './components/Navbar';
import Store from './store/index.js';
Vue.component("navbar", Navbar);

Routes.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Store.getters.loggedIn) {
            next({
                name: 'Login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (Store.getters.loggedIn) {
            next({
                name: 'Posts',
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

const app = new Vue({
    el: '#app',
    router: Routes,
    store: Store,
    beforeMounted(){
        if(Store.getters.loggedIn && Store.getters.getToken !== null){
            axios.defaults.headers.common['Authorization'] = `Bearer ${Store.getters.getToken}`;
            axios.get("/isloggedin").then(res => {
                return;
            })
            .catch(err => {
                Store.dispatch("destruirUsuario");
                this.$router.push({path:"/login"});
            });
        }
    }
});

