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
    created(){
        if(Store.getters.loggedIn){
            axios.defaults.headers.common['Authorization'] = `Bearer ${Store.getters.getToken}`;
            axios.get("/isloggedin").then(res => {
                return;
            })
            .catch(err => {
                Store.commit('destruirToken');
                localStorage.removeItem("access_token");
                this.$router.push({path:"/login"});
            });
        }
    }
});

