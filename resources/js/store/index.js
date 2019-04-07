import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user.js';
import Post from './modules/post.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        Post
    }
});
