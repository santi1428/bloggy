const state = {
    token: localStorage.getItem("access_token") || null,
    user_id: localStorage.getItem("user_id") || null,
    user_image: localStorage.getItem("user_image") || null,
    user_likes: JSON.parse(localStorage.getItem("user_likes")) || null,
    user_name: localStorage.getItem("user_name") || null,
    user_email: localStorage.getItem("user_email") || null,
    mostrarModalActualizarPerfil: false,
    mostrarModalActualizarContrasena: false,
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
    },
    getUserName: state => state.user_name,
    getUserEmail: state => state.user_email,
    getUserLikes: state => state.user_likes,
    getMostrarModalActualizarPerfil: state => state.mostrarModalActualizarPerfil,
    getMostrarModalActualizarContrasena: state => state.mostrarModalActualizarContrasena
};

const mutations = {
    asignarToken(state, token) {
        state.token = token;
    },
    asignarUsuarioId(state, user_id){
        state.user_id = user_id;
    },
    asignarUsuarioNombre(state, user_name){
        state.user_name = user_name;
    },
    asignarUsuarioImagen(state, user_image){
        state.user_image = user_image;
    },
    asignarUsuarioLikes(state, user_likes){
        state.user_likes = user_likes;
    },
    asignarUsuarioEmail(state, user_email){
        state.user_email = user_email;
    },
    asignarMostrarModalActualizarPerfil(state, bool){
        state.mostrarModalActualizarPerfil = bool;
    },
    asignarMostrarModalActualizarContrasena(state, bool){
        state.mostrarModalActualizarContrasena = bool;
    },
    destruirToken(state){
        state.token = null;
    },
    destruirUsuarioId(state){
        state.user_id = null;
    },
    destruirUsuarioImagen(state){
        state.user_image = null;
    },
    destruirUsuarioNombre(state){
        state.user_name = null;
    },
    destruirUsuarioEmail(state){
        state.user_email = null;
    },
    destruirUsuarioLikes(state){
        state.user_likes = null;
    }
};

const actions = {
    configurarUsuario({ commit }, data){
        console.log(data);
        return new Promise((resolve, reject) => {
            commit('asignarToken', data.access_token);
            localStorage.setItem("access_token", data.access_token);
            commit("asignarUsuarioNombre", data.user_name);
            localStorage.setItem('user_name', data.user_name);
            commit("asignarUsuarioId", data.user_id);
            localStorage.setItem("user_id", data.user_id);
            commit("asignarUsuarioImagen", data.user_image);
            localStorage.setItem("user_image", data.user_image);
            commit("asignarUsuarioLikes", data.user_likes);
            localStorage.setItem("user_likes", JSON.stringify(data.user_likes));
            commit("asignarUsuarioEmail", data.user_email);
            localStorage.setItem("user_email", data.user_email);
            if(localStorage.getItem("access_token")!==null && localStorage.getItem("user_id")!==null && localStorage.getItem("user_image")!==null && localStorage.getItem("user_likes")!==null && localStorage.getItem("user_name") && localStorage.getItem("user_email")!==null){
                resolve();
            }else{
                reject();
            }
        });
    },
    registrarLike({ commit }, postId){
        return new Promise((resolve, reject) => {
            axios.post('/like', {postId})
            .then(res => {
                console.log(res.data);
                let likes = res.data;
                commit("asignarUsuarioLikes", likes);
                localStorage.setItem("user_likes", JSON.stringify(likes));
                if(localStorage.getItem("user_likes")!==null){
                    resolve(likes);
                }else{
                    reject();
                }
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        })
    },
    removerLike({ commit }, postId){
        return new Promise((resolve, reject) => {
            axios.post('/removeLike', {postId})
            .then(res => {
                let likes = res.data;
                commit("asignarUsuarioLikes", likes);
                localStorage.setItem("user_likes", JSON.stringify(likes));
                if(localStorage.getItem("user_likes")!==null){
                    resolve(likes);
                }else{
                    reject();
                }
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        })
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
        commit("destruirUsuarioLikes");
        localStorage.removeItem("user_likes");
        commit("destruirUsuarioNombre");
        localStorage.removeItem("user_name");
        commit("destruirUsuarioEmail");
        localStorage.removeItem("user_email");
        if(localStorage.getItem("access_token")===null &&
           this.getters.getToken===null &&
           localStorage.getItem("user_id")===null &&
           this.getters.getUserId===null,
           localStorage.getItem("user_image") === null &&
           this.getters.getUserImage === null && 
           localStorage.getItem("user_likes")===null &&
           this.getters.getUserLikes === null &&
           localStorage.getItem("user_name") === null &&
           this.getters.getUserName === null &&
           localStorage.getItem("user_email") === null &&
           this.getters.getUserEmail === null
        ){
            return true;
        }else{
            return false;
        }
    },
    actualizarPerfil({commit}, perfil){
        return new Promise((resolve, reject) => {
            axios.post('/updateuser', perfil)
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    },
    actualizarContrasena({ commit }, contrasena){
        return new Promise((resolve, reject) => {
            axios.post('/updatepassword', contrasena)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    },
    actualizarDatos({ commit }, datos){
        commit('asignarUsuarioImagen', datos.image);
        localStorage.setItem("User_image", datos.image);
        commit('asignarUsuarioNombre', datos.name); 
        localStorage.setItem("user_name", datos.name);  
        commit('asignarUsuarioEmail', datos.email); 
        localStorage.setItem("user_email", datos.email);
        commit("asignarUsuarioLikes", datos.likes);
        localStorage.setItem("user_likes", JSON.stringify(datos.likes));
    }
};


export default {
    state,
    getters,
    mutations,
    actions
}