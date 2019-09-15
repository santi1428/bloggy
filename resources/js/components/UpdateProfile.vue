<template>
     <div class="modal animated fadeIn" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header px-3 py-2 bg-dark border border-dark">
                        <div class="w-100 text-center">
                            <h5 id="texto-encabezado" class="text-white m-0">Contraseña requerida</h5>
                        </div>
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row mt-2">
                                <div class="col">
                                    <input type="password" v-model="contrasena" id="password" class="form-control text-center" :class="{ 'is-invalid': invalida }" placeholder="Ingrese su contraseña">
                                    <div class="invalid-feedback">{{ verificarContrasena }}</div>
                                </div>
                            </div>
                            <div class="row mt-4 justify-content-center">
                                <div class="col">
                                    <button class="btn btn-dark btn-block" @click="cerrarModal()">Cancelar</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-block btn-success" :disabled="contrasena=='' || invalida" @click="editarPerfil">Actualizar</button>                                     
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
export default {
    name: "UpdateProfile",
    props: ["campos"],
    data(){
        return {
            contrasena: "",
            invalida: false
        }
    },
    methods: {
        cerrarModal(){
            $('#myModal').modal('hide');
            this.asignarMostrarModalActualizarPerfil(false);
        },
        editarPerfil(){
            let perfil = {
                nombre: this.campos.nombre,
                email: this.campos.email,
                contrasena: this.contrasena
            }
            this.actualizarPerfil(perfil)
            .then(res => {
                console.log(res);
                this.cerrarModal();
                this.$emit('datos-actualizados');
                this.asignarDatosToast({msg: "Datos actualizados", clase: "bg-success", icono: "fas fa-check-circle"});
            })
            .catch(err => {
                console.log(err);
                this.cerrarModal();
                this.asignarDatosToast({msg: "Contraseña incorrecta", clase: "bg-danger", icono: "fas fa-times"});
            });
        },
        ...mapActions(["actualizarPerfil", "asignarDatosToast"]),
        ...mapMutations(["asignarMostrarModalActualizarPerfil"])
    },
    computed: {
        verificarContrasena(){
            if(this.contrasena.length > 0){
                if(this.contrasena.length < 6){
                    this.invalida = true;
                    return "Debe de tener minimo 6 carácteres";
                }else{
                    this.invalida = false;
                    return "";
                }
            }else{
                this.invalida = false;
            }
        }
    },
    mounted(){
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        });        
    }
}
</script>

<style>
#texto-encabezado{
    font-size: 16px;    
}

</style>
