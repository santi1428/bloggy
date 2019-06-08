const state = {
    token: localStorage.getItem("access_token") || null,
    user_id: localStorage.getItem("user_id") || null
};

const getters = {
    getToken: state => state.token,
    getUserId: state => state.user_id,
    loggedIn(state){
        if(state.token !== null && state.user_id !== null){
            return true;
        }else{
            return false;
        }
    } 
};

const mutations = {
    asignarToken(state, token) {
        state.token = token;
    },
    asignarUsuarioId(state, user_id){
        state.user_id = user_id;
    },
    destruirToken(state){
        state.token = null;
    },
    destruirUsuarioId(state){
        state.user_id = null;
    }
};

const actions = {
    configurarUsuario({ commit }, data){
        return new Promise((resolve, reject) => {
            commit('asignarToken', data.access_token);
            localStorage.setItem("access_token", data.access_token);
            commit("asignarUsuarioId", data.user_id);
            localStorage.setItem("user_id", data.user_id);
            if(localStorage.getItem("access_token")!==null && localStorage.getItem("user_id")!==null){
                resolve();
            }else{
                reject();
            }
        });
    },
    removerUsuario({ commit, dispatch }){
        if(this.getters.loggedIn){
            return new Promise((resolve, reject) => {
                axios.post("/logout").then(() => {
                    if(dispatch("destruirUsuario")){
                        resolve();
                    }    
                }).catch(err => {
                    if(dispatch("destruirUsuario")){
                        resolve();
                    }   
                });       
            })
        }else{
            reject("You can't log out!");
        }
    },
    destruirUsuario({ commit }){
        commit('destruirToken');
        localStorage.removeItem("access_token");
        commit('destruirUsuarioId');
        localStorage.removeItem("user_id");
        if(localStorage.getItem("access_token")===null &&
           this.getters.getToken===null &&
           localStorage.getItem("user_id")===null &&
           this.getters.getUserId===null
           ){
            return true;
        }else{
            return false;
        }
    }
};


export default {
    state,
    getters,
    mutations,
    actions
}