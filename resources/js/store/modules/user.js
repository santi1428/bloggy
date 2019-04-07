const state = {
    token: localStorage.getItem("access_token") || null
};

const getters = {
    getToken: state => state.token,
    loggedIn(state){
        if(state.token !== null){
            return true;
        }else{
            return false;
        }
    }
};

const mutations = {
    asignarToken(state, token) {
        state.token = token
    },
    destruirToken(state){
        state.token = null;
    }
};

const actions = {
    configurarToken({ commit }, token){
        return new Promise((resolve, reject) => {
            commit('asignarToken', token);
            localStorage.setItem("access_token", token);
            if(localStorage.getItem("access_token")!==null){
                resolve();
            }else{
                reject();
            }
        });
    },
    removerToken({ commit }){
        if(this.getters.loggedIn){
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getters.getToken}`;
            return new Promise((resolve, reject) => {
                axios.post("/logout").then(() => {
                    commit('destruirToken');
                    localStorage.removeItem("access_token");
                    if(localStorage.getItem("access_token")===null && this.getters.getToken === null){
                    resolve();
                }}).catch(err => {
                    commit('destruirToken');
                    localStorage.removeItem("access_token");
                    if(localStorage.getItem("access_token")===null && this.getters.getToken === null){
                    resolve();
                    }
                });       
            })
        }else{
            reject("You can't log out!");
        }
    }
};


export default {
    state,
    getters,
    mutations,
    actions
}