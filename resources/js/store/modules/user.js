import axios from "axios";

const state = {
    user: JSON.parse(localStorage.getItem("user")) || null
};

const getters = {
    getUser: state => state.user,
    getToken: state => state.user.token,
    getUserId: state => state.user.user_id,
    loggedIn(state){
        if(state.user !== null){
            return true;
        }else{
            return false;
        }
    } 
};

const mutations = {
    // asignarToken(state, token) {
    //     state.token = token;
    // },
    // asignarUsuarioId(state, user_id){
    //     state.user_id = user_id;
    // },
    // destruirToken(state){
    //     state.token = null;
    // },
    // destruirUsuarioId(state){
    //     state.user_id = null;
    // }
    destruirUsuario(state){
        state.user = null;
    },
    asignarUsuario(state, user){
        state.user = user;
    }
};

const actions = {
    configurarUsuario({ commit }, data){
        return new Promise((resolve, reject) => {
            // commit('asignarToken', data.access_token);
            // localStorage.setItem("access_token", data.access_token);
            // commit("asignarUsuarioId", data.user_id);
            // localStorage.setItem("user_id", data.user_id);
            // if(localStorage.getItem("access_token")!==null && localStorage.getItem("user_id")!==null){
            //     resolve();
            // }else{
            //     reject();
            // }
            commit('asignarUsuario', data);
            localStorage.setItem("user", JSON.stringify(data));
            if(localStorage.getItem("user") !== null){
                resolve();
            }else{
                reject();
            }
        });
    },
    destruirUsuario({ commit, dispatch }){
        if(this.getters.loggedIn){
            return new Promise((resolve, reject) => {
                axios.post("/logout").then(() => {
                    commit("destruirUsuario");
                    localStorage.removeItem("user");
                    if(localStorage.getItem("user") === null && this.getters.getUser === null){
                        resolve();
                    }  
                }).catch(err => {
                    commit("destruirUsuario");
                    localStorage.removeItem("user");
                    if(localStorage.getItem("user") === null && this.getters.getUser === null){
                        resolve();
                    }  
                });       
            })
        }else{
            reject("You can't log out!");
        }
    },
    // destruirUsuario({ commit }){
        // commit('destruirToken');
        // localStorage.removeItem("access_token");
        // commit('destruirUsuarioId');
        // localStorage.removeItem("user_id");
        // if(localStorage.getItem("access_token")===null &&
        //    this.getters.getToken===null &&
        //    localStorage.getItem("user_id")===null &&
        //    this.getters.getUserId===null
        //    ){
        //     return true;
        // }else{
        //     return false;
        // }
    // }
};


export default {
    state,
    getters,
    mutations,
    actions
}