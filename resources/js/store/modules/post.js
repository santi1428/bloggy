const state = {
    posts: null,
    postsPage: 0,
    lastPostsPage: 1,
    mostrarModalEliminarDePostId: "",
    mostrarAnimacionPublicarDePostId: "",
    mostrarAnimacionEliminarDePostId: ""
};

const getters = {
getPosts(state){
    return state.posts;
},
getPostsPage(state){
    return state.postsPage;
},
getLastPostsPage(state){
    return state.lastPostsPage;
},
getMostrarModalEliminarDePostId(state){
    return state.mostrarModalEliminarDePostId;
},
getMostrarAnimacionPublicarDePostId(state){
    return state.mostrarAnimacionPublicarDePostId;
},
getMostrarAnimacionEliminarDePostId(state){
    return state.mostrarAnimacionEliminarDePostId;
}
};

const mutations = {
    agregarPublicaciones(state, publicaciones){
        state.posts = publicaciones;
        state.posts.sort(function(a,b){
            return new Date(b.created_at) - new Date(a.created_at);
        });
    },
    removerPublicacion(state, id){
        state.posts = state.posts.filter(post => post.id !== id);   
    },
    aumentarNumeroPaginaPosts(state){
        state.postsPage++;
    },
    asignarUltimaPaginaPosts(state, lastPostsPage){
        state.lastPostsPage = lastPostsPage;
    },
    resetearPaginacionDePosts(state){
        state.postsPage = 0;
        state.lastPostsPage = 1;
        state.posts = null;
    },
    mostrarModalEliminarDePostId(state, id){
        state.mostrarModalEliminarDePostId = id;
    },
    ocultarModalEliminar(state){
        state.mostrarModalEliminarDePostId = "";
    },
    asignarMostrarAnimacionPublicarDePostId(state, id){
        state.mostrarAnimacionPublicarDePostId = id;
    },
    asignarMostrarAnimacionEliminarDePostId(state, id){
        state.mostrarAnimacionEliminarDePostId = id;
    }
};

const actions = {
    guardarPublicacion({ commit }, publicacion){
            return new Promise((resolve, reject) => {
                axios.post("/api/posts", publicacion)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data.postId);
                        commit("asignarMostrarAnimacionPublicarDePostId", res.data.postId);
                        setTimeout(() => {
                            commit("asignarMostrarAnimacionPublicarDePostId", "");
                        }, 1500);
                        resolve();
                    }else{
                        reject();
                    }   
                })
                .catch(err => {
                    reject(err);
                });
            });
    },
    traerPublicaciones({ commit, getters, dispatch }){
        return new Promise((resolve, reject) => {
            if(getters.getPostsPage <= getters.getLastPostsPage){
                axios.get(`/api/posts?page=${getters.getPostsPage}`)
                .then(res => {
                    if(res.status === 200){
                        commit('aumentarNumeroPaginaPosts');
                        commit("asignarUltimaPaginaPosts", res.data.last_page);
                        dispatch('anadirPublicaciones', res.data.data);
                        resolve();
                    }
                })
                .catch(err => {
                    reject(err);
                });
            }else{
                resolve();
            }
        });
    },
    traerMisPublicaciones({ commit, getters, dispatch }){
        return new Promise((resolve, reject) => {
            if(getters.getPostsPage <= getters.getLastPostsPage){
                axios.get(`/api/getmyposts?page=${getters.getPostsPage}`)
                .then(res => {
                    console.log(res);
                    if(res.status === 200){
                        commit('aumentarNumeroPaginaPosts');
                        commit("asignarUltimaPaginaPosts", res.data.last_page);
                        dispatch('anadirPublicaciones', res.data.data);
                        resolve();
                    }
                })
                .catch(err => {
                    reject(err);
                });
            }else{
                resolve();
            }
        });
    },
    traerPublicacion({ commit }, id){
        return new Promise((resolve, reject) => {
            axios.get(`/api/posts/${id}`)
            .then(post => {
                resolve(post.data[0]);
            })
            .catch(err => reject(err));
        });
    },
    eliminarPublicacion({ commit, dispatch }, id){
        return new Promise((resolve, reject) => {          
                axios.delete(`/api/posts/${id}`)
                .then(res => {
                    if(res.status === 200){
                        $('#myModal').modal('hide');
                        commit("ocultarModalEliminar");             
                        setTimeout(() => {
                            commit("asignarMostrarAnimacionEliminarDePostId", "");
                            commit("removerPublicacion", id);
                        }, 500);
                        commit("asignarMostrarAnimacionEliminarDePostId", id);
                        dispatch("asignarDatosToast", {msg: "Se ha eliminado la publicación", clase: "bg-success", icono: "fas fa-trash-alt"});
                        resolve(res);        
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    actualizarPublicacion({ commit }, post){
        return new Promise((resolve, reject) => {
            axios.put(`/api/posts/${post.idPost}`, {postData: post.postData})
            .then(() => {
                resolve();
            })
            .catch(() => reject());
        });
    },
    anadirPublicaciones({ commit, getters }, publicacionesNuevas){
        let publicacionesViejas = getters.getPosts;
        if(publicacionesViejas !== null){
            const publicacionesViejasIDs = new Set(publicacionesViejas.map(({ id }) => id));
            const publicaciones = [...publicacionesViejas,
                                ...publicacionesNuevas.filter(({ id }) => !publicacionesViejasIDs.has(id))]
            commit("agregarPublicaciones", publicaciones);    
        }else{
            commit("agregarPublicaciones", publicacionesNuevas);  
        }                      
    },
    verificarPropietario({ commit }, idPost){
        return new Promise((resolve, reject) => {
            axios.get(`/api/verifypostowner/${idPost}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
};

export default{
state,
getters,
mutations,
actions
}
