const state = {
        posts: null,
        page: 1,
        lastPage: 1,
        mostrarModalEliminar: false
};

const getters = {
    getPosts(state){
        return state.posts;
    },
    getPage(state){
        return state.page;
    },
    getLastPage(state){
        return state.lastPage;
    },
    getMostrarModalEliminar(state){
        return state.mostrarModalEliminar;
    }
};

const mutations = {
    agregarPublicaciones(state, publicacionesNuevas){
        if(state.posts !== null){
            state.posts = state.posts.concat(publicacionesNuevas);
        }
        else{
            state.posts = publicacionesNuevas;
        }
        state.posts.sort(function(a,b){
            return new Date(b.created_at) - new Date(a.created_at);
        });
    },
    removerPublicacion(state, id){
        state.posts = state.posts.filter(post => post.id !== id);   
    },
    aumentarNumeroPagina(state){
        state.page++;
    },
    asignarUltimaPagina(state, lastPage){
        state.lastPage = lastPage;
    },
    resetearPaginacion(state){
        state.page = 1;
        state.lastPage = 1;
        state.posts = null;
    },
    mostrarModalEliminar(state){
        state.mostrarModalEliminar = true;
    },
    ocultarModalEliminar(state){
        state.mostrarModalEliminar = false;
    }
};

const actions = {
    guardarPublicacion({commit}, publicacion){
            return new Promise((resolve, reject) => {
                axios.post("/api/posts", publicacion).then(res => {
                    if(res.status === 200){
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
            if(getters.getPage <= getters.getLastPage){
                console.log("making request");
                axios.get(`/api/posts?page=${getters.getPage}`).then(res => {
                    if(res.status === 200){
                        commit('aumentarNumeroPagina');
                        commit("asignarUltimaPagina", res.data.last_page);
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
    eliminarPublicacion({ commit }, id){
        return new Promise((resolve, reject) => {          
                axios.delete(`/api/posts/${id}`)
                .then(res => {
                    if(res.status === 200){
                        setTimeout(() => {
                            $('#myModal').modal('hide');
                            commit("removerPublicacion", id);
                            commit("ocultarModalEliminar", id);
                        }, 1050);                  
                        resolve(res);        
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    anadirPublicaciones({ commit, getters }, publicacionesNuevas){
                let publicaciones = getters.getPosts;        
                if(publicaciones !== null){
                    publicaciones.forEach((publicacion) => {
                        for(let i=0; i<publicacionesNuevas.length; i++){
                            if(publicacion.id === publicacionesNuevas[i].id){
                                publicacionesNuevas.splice(i, 1);
                                break;
                            }
                        }
                    });
                    commit("agregarPublicaciones", publicacionesNuevas);                
                }else{
                    commit("agregarPublicaciones", publicacionesNuevas);    
                }               
    }
};

export default{
    state,
    getters,
    mutations,
    actions
}

