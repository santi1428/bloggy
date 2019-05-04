const state = {
        posts: null
};

const getters = {
    getPosts(state){
        return state.posts;
    }
};

const mutations = {
    asignarPublicaciones(state, publicaciones){
        state.posts = publicaciones;
    },
    removerPublicacion(state, id){
        state.posts = state.posts.filter(post => post.id !== id);   
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
    traerPublicaciones({ commit }){
        return new Promise((resolve, reject) => {
            axios.get("/api/posts").then(res => {
                if(res.status === 200){
                    commit('asignarPublicaciones', res.data);
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
    eliminarPublicacion({ commit }, id){
        return new Promise((resolve, reject) => {          
                axios.delete(`/api/posts/${id}`)
                .then(res => {
                    if(res.status === 200){
                        setTimeout(() => {
                                    $('#myModal').modal('hide');
                                    commit("removerPublicacion", id)             
                                   }, 1050);                       
                        resolve(res);
                    }
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

