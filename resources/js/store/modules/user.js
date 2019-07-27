const state = {
    token: localStorage.getItem("access_token") || null,
    user_id: localStorage.getItem("user_id") || null,
    user_image: localStorage.getItem("user_image") || null
};

const getters = {
    getToken: state => state.token,
    getUserId: state => state.user_id,
    getUserImage: state => state.user_image,
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
    asignarUsuarioImagen(state, user_image){
        state.user_image = user_image;
    },
    destruirToken(state){
        state.token = null;
    },
    destruirUsuarioId(state){
        state.user_id = null;
    },
    destruirUsuarioImagen(state){
        state.user_image = null;
    }
};

const actions = {
    configurarUsuario({ commit }, data){
        return new Promise((resolve, reject) => {
            commit('asignarToken', data.access_token);
            localStorage.setItem("access_token", data.access_token);
            commit("asignarUsuarioId", data.user_id);
            localStorage.setItem("user_id", data.user_id);
            commit("asignarUsuarioImagen", data.user_image);
            localStorage.setItem("user_image", data.user_image);
            if(localStorage.getItem("access_token")!==null && localStorage.getItem("user_id")!==null && localStorage.getItem("user_image")!==null){
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
        commit("destruirUsuarioImagen");
        localStorage.removeItem("user_image");
        if(localStorage.getItem("access_token")===null &&
           this.getters.getToken===null &&
           localStorage.getItem("user_id")===null &&
           this.getters.getUserId===null,
           localStorage.getItem("user_image") === null &&
           this.getters.getUserImage === null
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