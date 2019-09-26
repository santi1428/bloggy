import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('./views/Home');
const RegisterForm = () => import('./components/RegisterForm');
const Login = () => import('./components/Login');
const CreatePost = () => import('./components/CreatePost');
const Posts = () => import('./views/Posts');
const Logout = () => import('./components/Logout');
const Post = () => import('./views/Post');
const UpdatePost = () => import('./components/UpdatePost');
const Profile = () => import('./views/Profile');
const MyPosts = () => import('./views/MyPosts');

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
            path: "/myposts",
            name: "MyPosts",
            component: MyPosts,
            meta: {
                requiresAuth: true
            }
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
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

export default router;

