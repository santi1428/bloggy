<template>
    <div class="modal animated fadeIn" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header px-3 py-2 bg-danger border border-danger">
                        <div class="w-100 text-center">
                            <h5 class="text-white m-0">Remover publicacion</h5>
                        </div>
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal" :disabled="button===1">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col text-justify pt-3">
                                    <h5>¿Estas seguro de eliminar esta publicación? No la podras recuperar despues</h5>
                                </div> 
                            </div>
                            <div class="row mt-2 justify-content-around">
                                <div class="col-5 p-0">
                                    <button class="btn btn-block btn-danger" @click=" removerPublicacion(id)" :disabled="button === 1 || button === 3">
                                        <span v-if="button === 1" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                        <span v-if="button === 0"><i class="fas fa-trash-alt mr-2"></i>Si, eliminar</span>
                                        <span v-if="button === 1">Eliminando...</span>
                                        <span v-if="button === 3"><i class="fas fa-check-circle mr-1"></i>Publicacion eliminada</span>
                                    </button>
                                </div>
                                <div class="col-5 p-0" v-if="button===0"><button class="btn btn-block btn-dark" @click="cerrarModal"><i class="fas fa-arrow-left mr-2"></i>No, cancelar</button></div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name: 'DeletePost',
    props: ['id'],
    data(){
        return {
            button: 0
        }
    },
    methods: {       
        cerrarModal(){
            $('#myModal').modal('hide');
            this.ocultarModalEliminar();
        },
        removerPublicacion(id){
            this.button = 1;
            this.eliminarPublicacion(id).then(res =>  {
                 console.log(res.data.message);
                 this.button = 3;
                 this.asignarMensajeToast("Se ha eliminado la publicación");
                //  $('#toast').toast('show');
            }).catch(err => {
                console.log(err);
                this.button = 0;
            });
        },
        ...mapActions(["eliminarPublicacion"]),
        ...mapMutations(["ocultarModalEliminar", "asignarMensajeToast"])
    },
    mounted(){
            $('#myModal').modal({
             backdrop: 'static',
             keyboard: false
            });        
    }
}
</script>

<style scoped>

</style>
