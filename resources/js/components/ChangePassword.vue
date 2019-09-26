<template>
       <div class="modal animated fadeIn" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header px-3 py-2 bg-dark border border-dark">
                        <div class="w-100 text-center">
                            <h5 id="texto-encabezado" class="text-white m-0">Cambiar Contraseña</h5>
                        </div>
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Nueva contraseña" v-model="campos.nuevaContrasena" :class="{'is-invalid':invalidos.nuevaContrasena}">
                                    <div class="invalid-feedback">{{ verificarNuevaContrasena }}</div>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Confirma tu nueva contraseña" v-model="campos.conNuevaContrasena" :class="{'is-invalid':invalidos.conNuevaContrasena}">
                                    <div class="invalid-feedback">{{ verificarConNuevaContrasena }}</div>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Ingresa tu contraseña actual" v-model="campos.contrasena" :class="{'is-invalid':invalidos.contrasena}">
                                    <div class="invalid-feedback">{{ verificarContrasena }}</div>
                                </div>
                                <button class="btn btn-success btn-block" @click="editarContrasena">Actualizar Contraseña</button>
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
    name: "ChangePassword",
    data(){
        return {
            campos: {
                nuevaContrasena: "",
                conNuevaContrasena: "",
                contrasena: ""
            },
            invalidos: {
                nuevaContrasena: false,
                conNuevaContrasena: false,
                contrasena: false
            }
        }
    },
    methods: {
        cerrarModal(){
            $('#myModal').modal('hide');
            this.asignarMostrarModalActualizarContrasena(false);
        },
        editarContrasena(){
            if(this.campos.nuevaContrasena.length >= 6 && 
            this.invalidos.nuevaContrasena == false &&
            this.campos.conNuevaContrasena.length >= 6 && 
            this.invalidos.conNuevaContrasena == false &&
            this.campos.contrasena.length >= 6 && 
            this.invalidos.contrasena == false){
                this.actualizarContrasena({
                    nuevaContrasena: this.campos.nuevaContrasena,
                    contrasena: this.campos.contrasena
                })
                .then(res => {
                    this.cerrarModal();
                    this.asignarDatosToast({ msg: "Contraseña actualizada", clase: "bg-success", icono: "fas fa-check-circle"});
                })
                .catch(err => {
                    this.cerrarModal();
                    this.asignarDatosToast({msg: "Contraseña incorrecta", clase: "bg-danger", icono: "fas fa-times"});
                });
            }
        },
    ...mapMutations(["asignarMostrarModalActualizarContrasena"]),
    ...mapActions(["actualizarContrasena", "asignarDatosToast"])    
    },
    computed: {
        verificarNuevaContrasena() {
            if(this.campos.nuevaContrasena.length > 0){
                if(this.campos.nuevaContrasena.length < 6){
                    this.invalidos.nuevaContrasena = true;
                    return "Debe de tener minimo 6 carácteres.";
                }else{
                    this.invalidos.nuevaContrasena = false;
                }
            }else{
                this.invalidos.nuevaContrasena = false;
            }
        },
        verificarConNuevaContrasena() {
            if(this.campos.conNuevaContrasena.length > 0){
                if(this.campos.conNuevaContrasena !== this.campos.nuevaContrasena) {
                    this.invalidos.conNuevaContrasena = true;
                    return "Las contraseñas no coinciden"
                }else{
                    this.invalidos.conNuevaContrasena = false;
                }
            }else {
                this.invalidos.conNuevaContrasena = false;
            }
        },
        verificarContrasena() {
            if(this.campos.contrasena.length > 0){
                if(this.campos.contrasena.length < 6){
                    this.invalidos.contrasena = true;
                    return "Debe de tener minimo 6 carácteres.";
                }else{
                    this.invalidos.contrasena = false;
                }
            }else{
                this.invalidos.contrasena = false;
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

</style>