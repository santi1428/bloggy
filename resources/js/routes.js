import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Posts from './views/Posts';
import Logout from './components/Logout';
import Post from './views/Post';
import UpdatePost from './components/UpdatePost';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/register",
            name: "Register",
            component: RegisterForm,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: "/posts",
            name: "Posts",
            component: Posts
        },
        {
            path: "/logout",
            name: "Logout",
            component: Logout,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/posts/create",
            name: "CreatePost",
            component: CreatePost,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/posts/:id",
            name: "Post",
            component: Post,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/posts/update/:id",
            name: "UpdatePost",
            component: UpdatePost,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

export default router;

