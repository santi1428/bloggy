const state = {
    comments: null,
    mostrarAnimacionEliminarDeComentarioId: ""
}

const getters = {
    getComments(state){
        return state.comments;
    },
    getMostrarAnimacionEliminarDeComentarioId(state){
        return state.mostrarAnimacionEliminarDeComentarioId;
    }
}

const mutations = {
    asignarComentarios(state, comments){
        state.comments = comments;
    },
    asignarMostrarAnimacionEliminarDeComentarioId(state, id){
        state.mostrarAnimacionEliminarDeComentarioId = id;
    },
    removerComentario(state, id){
        state.comments = state.comments.filter(comment => comment.id !== id);  
    }
}


const actions = {
    comentar({ commit, dispatch }, comment){
        return new Promise((resolve, reject) => {            
            axios.post('/api/comments', {
                comment: comment.comment,
                postId: comment.postId,
            })
            .then(res => {
                dispatch("traerComentarios", comment.postId);
                resolve(res);
            })
            .catch(err => reject(err))
        });
    },
    traerComentarios({ commit }, postId){
        return new Promise((resolve, reject) => {
            axios.get(`/api/comments/${postId}`)
            .then(res => {
                commit("asignarComentarios", res.data);
                resolve();
            })
            .catch(err => reject(err));
        });
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