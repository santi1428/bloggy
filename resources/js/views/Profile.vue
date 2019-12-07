<template>
    <div class="container">
        <title>Mi perfil</title>
        <div class="row justify-content-center mt-2">
            <div class="col-lg-4" :class="{'card shadow-lg rounded': mostrarTargeta }">
                <div class="card-body">
                    <upload-file></upload-file>
                    <update-profile v-if="getMostrarModalActualizarPerfil" :campos="campos" v-on:datos-actualizados="actualizarDatosOriginales"></update-profile>
                    <change-password v-if="getMostrarModalActualizarContrasena"></change-password>
                    <toast></toast>
                    <hr>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" v-model="campos.nombre" class="form-control" v-bind:class="{'is-invalid': this.invalidos.nombre}">
                                <div class="invalid-feedback">{{verificarNombre}}</div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="campos.email" class="form-control" @input="verificarEmail" v-bind:class="{'is-invalid': this.invalidos.email.state}">
                                <div class="invalid-feedback">{{ invalidos.email.msg }}</div>
                            </div>
                            <div class="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" name="password" id="password" value="contraseña" class="form-control mb-1" disabled>
                                <a href="#" class="text-dark" @click="asignarMostrarModalActualizarContrasena(true)">Cambiar contraseña</a>
                            </div>
                            <button class="btn btn-success btn-block" type="submit" :disabled="actualizar" @click="asignarMostrarModalActualizarPerfil(true)"><i class="fas fa-edit mr-2"></i>Actualizar Informacion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UploadFile from '../components/UploadFile';
const UpdateProfile = () => import('../components/UpdateProfile');
const ChangePassword = () => import('../components/ChangePassword');
import Toast from '../components/Toast';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: "Profile",
    components: {
        "upload-file": UploadFile,
        "update-profile": UpdateProfile,
        "toast": Toast,
        "change-password": ChangePassword
    },
    data(){
        return {
            campos: {
                nombre: "",
                email: ""
            },
            invalidos: {
                nombre: false,
                email: {state: false, msg: ""}
            },
            datosOriginales: {
                nombre: "",
                email: ""
            },
            mostrarModal: false
        }
    },
    methods:{
        async verificarDisponibilidadEmail(){
            const res = await axios.get(`/register/${this.campos.email}`);
            const data = await res.data;
            return data;
        },
        async verificarEmail() {
            if(this.campos.email != this.datosOriginales.email){
                if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.campos.email)){
                    this.invalidos.email.state = false;
                    const data = await this.verificarDisponibilidadEmail();
                    if(data === 0){
                        this.invalidos.email.state = true;
                        this.invalidos.email.msg = "Este correo ya está en uso. No esta disponible."   
                    }
                }else {
                    this.invalidos.email.state = true;
                    this.invalidos.email.msg = "El correo ingresado no es válido."
                }
            }else{
                 this.invalidos.email.state = false;
            }
        },
        actualizarDatosOriginales(){
            this.datosOriginales.nombre = this.campos.nombre;
            this.datosOriginales.email = this.campos.email;
        },
        ...mapMutations(["asignarMostrarModalActualizarPerfil", "asignarMostrarModalActualizarContrasena"])
    },
    created(){
            this.datosOriginales.nombre = this.getUserName;
            this.datosOriginales.email = this.getUserEmail;
            this.campos.nombre = this.getUserName;
            this.campos.email = this.getUserEmail;
    },
    computed: {
        verificarNombre() {
            if(this.campos.nombre.length > 0) {
                if(this.campos.nombre.length < 3){
                    this.invalidos.nombre = true;
                    return "Debes de ingresar un nombre válido."
                }else{ 
                    this.invalidos.nombre = false;
                }
            }
        },
        mostrarTargeta(){
            if(window.innerWidth > 768){
                return true;
            }else{
                return false;
            }
        },
        actualizar(){
            if(this.campos.nombre != this.datosOriginales.nombre || this.campos.email != this.datosOriginales.email){
                if(this.invalidos.nombre === false && this.invalidos.email.state === false){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        },
        ...mapGetters(["getMostrarModalActualizarPerfil", "getMostrarModalActualizarContrasena", "getUserName", "getUserEmail"])
    }

}
</script>
<style scoped>
.container{
    position: relative;
}

.card{
    position: absolute;
    top: 10%;
}

a{
    font-size: 13.5px;
}


</style>
