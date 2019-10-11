const state = {
    commentsPage: 0,
    lastCommentsPage: 1,
    comments: null,
    mostrarAnimacionEliminarDeComentarioId: ""
}

const getters = {
    getComments(state){
        return state.comments;
    },
    getCommentsPage(state){
        return state.commentsPage;
    },
    getLastCommentsPage(state){
        return state.lastCommentsPage;
    },
    getMostrarAnimacionEliminarDeComentarioId(state){
        return state.mostrarAnimacionEliminarDeComentarioId;
    }
}

const mutations = {
    asignarMostrarAnimacionEliminarDeComentarioId(state, id){
        state.mostrarAnimacionEliminarDeComentarioId = id;
    },
    removerComentario(state, id){
        state.comments = state.comments.filter(comment => comment.id !== id);
    },
    aumentarNumeroPaginaComentarios(state){
        state.commentsPage++;
    },
    asignarUltimaPaginaComentarios(state, lastCommentsPage){
        state.lastCommentsPage = lastCommentsPage;
    },
    resetearPaginacionDeComentarios(state){
        state.commentsPage = 0;
        state.lastCommentsPage = 1;
        state.comments = null;
    },
    agregarComentarios(state, comentarios){
        state.comments = comentarios;
    },
    ordenarComentariosPorFechaAsc(state){
        state.comments.sort(function(a,b){
            return new Date(b.created_at) - new Date(a.created_at);
        });
    }
}


const actions = {
    comentar({ commit, state, getters }, comment){
        return new Promise((resolve, reject) => {
            axios.post('/api/comments', {
                comment: comment.comment,
                postId: comment.postId,
            })
            .then(res => {
                console.log(res.data);
                state.comments.push({ id: res.data.comment.id, comment: res.data.comment.comment, created_at: res.data.comment.created_at, userId: res.data.comment.UserId, name: getters.getUserName, image: getters.getUserImage });
                commit("ordenarComentariosPorFechaAsc");
                resolve(res);
            })
            .catch(err => reject(err))
        });
    },
    traerComentarios({ commit, dispatch, getters }, postId){
        return new Promise((resolve, reject) => {
            if(getters.getCommentsPage <= getters.getLastCommentsPage){
                console.log("ejecutado");
                axios.get(`/api/comments/${postId}?page=${getters.getCommentsPage}`)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data.data);
                        commit('aumentarNumeroPaginaComentarios');
                        console.log(res.data.last_page);
                        commit("asignarUltimaPaginaComentarios", res.data.last_page);
                        dispatch('anadirComentarios', res.data.data);
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
    anadirComentarios({ commit, getters }, comentariosNuevos){
        let comentariosViejos = getters.getComments;
        if(comentariosViejos  !== null){
            const comentariosViejosIDs = new Set(comentariosViejos.map(({ id }) => id));
            const comentarios = [...comentariosViejos ,
                                ...comentariosNuevos.filter(({ id }) => !comentariosViejosIDs.has(id))];
            console.log("Comentarios ", comentarios);
            commit("agregarComentarios", comentarios);
        }else{
            commit("agregarComentarios", comentariosNuevos);
            console.log("Comentarios nuevos", comentariosNuevos);
        }
        commit("ordenarComentariosPorFechaAsc");
    },
    eliminarComentario({commit, dispatch}, commentId){
        return new Promise((resolve, reject) => {
            axios.delete(`/api/comments/${commentId}`)
            .then(res => {
                setTimeout(() => {
                    commit("removerComentario", commentId);
                    dispatch("asignarDatosToast", {msg: "Comentario eliminado", clase: "bg-info", icono: "fas fa-trash-alt"});
                    commit("asignarMostrarAnimacionEliminarDeComentarioId", "");
                }, 500);
                commit("asignarMostrarAnimacionEliminarDeComentarioId", commentId);
                resolve(res);
            })
            .catch(err => reject(err));
        });
    }


}

export default{
    state,
    getters,
    mutations,
    actions
}