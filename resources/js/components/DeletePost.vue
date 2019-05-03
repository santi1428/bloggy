<template>
<div>
    <div class="modal animated fadeIn" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container-fluid">
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal" :disabled="button===1">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="row">
                            <div class="col text-justify pt-3">
                                <h4>¿Estas seguro de eliminar esta publicación?</h4>
                            </div> 
                        </div>
                        <div class="row mt-2">
                              <!-- <button class="btn btn-dark btn-block mt-2" type="submit" :disabled="button === 1"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  <span v-if="button === 0"><i class="fas fa-pen-alt mr-2"></i>Crear publicación</span>
                              <span v-else>Creando publicación...</span></button> -->
                            <div class="col">
                                <button class="btn btn-block btn-danger" @click=" removerPublicacion(id)" :disabled="button === 1 || button === 3">
                                    <span v-if="button === 1" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                    <span v-if="button === 0"><i class="fas fa-trash-alt mr-2"></i>Si, eliminar</span>
                                    <span v-if="button === 1">Eliminando...</span>
                                    <span v-if="button === 3"><i class="fas fa-check-circle mr-1"></i>Publicacion eliminada</span>
                                </button>
                            </div>
                            <div class="col" v-if="button===0"><button class="btn btn-block btn-primary" @click="cerrarModal"><i class="fas fa-arrow-left mr-2"></i>No, cancelar</button></div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
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
            this.$emit('modal-cerrado');
        },
        removerPublicacion(id){
            this.button = 1;
            this.eliminarPublicacion(id).then(res =>  {
                 console.log(res.data.message);
                 this.button = 3;
            }).catch(err => {
                console.log(err);
                this.button = 0;
            });
        },
        ...mapActions(["eliminarPublicacion"])
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
