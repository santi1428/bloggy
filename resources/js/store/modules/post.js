const state = {
    posts: null,
    page: 0,
    lastPage: 1,
    mostrarModalEliminarDePostId: "",
    mostrarAnimacionPublicarDePostId: "",
    mostrarAnimacionEliminarDePostId: ""
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
aumentarNumeroPagina(state){
    state.page++;
},
asignarUltimaPagina(state, lastPage){
    state.lastPage = lastPage;
},
resetearPaginacion(state){
    state.page = 0;
    state.lastPage = 1;
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
        if(getters.getPage <= getters.getLastPage){
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
