const state = {
    toast: {
        msg: "",
        clase: "",
        icono: ""
    }
}

const getters = {
    getMensajeToast(state){
        return state.toast.msg;
    },
    getClaseToast(state){
        return state.toast.clase;
    },
    getIconoToast(state){
        return state.toast.icono;
    }
}

const mutations = {
    asignarMensajeToast(state, msg){
        state.toast.msg = msg;
    },
    asignarClaseToast(state, clase){
        state.toast.clase = clase;
    },
    asignarIconoToast(state, icono){
        state.toast.icono = icono;
    }
}

const actions = {
    asignarDatosToast({ commit }, toast){
        commit("asignarMensajeToast", toast.msg);
        commit("asignarClaseToast", toast.clase);
        commit("asignarIconoToast", toast.icono);
        $('#toast').toast('show');
    },
}

export default{
    state,
    getters,
    mutations,
    actions
}
    