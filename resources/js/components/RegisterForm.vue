<template>
<div class="container">
<title>Registro</title>
<div class="row justify-content-center mt-5">
    <div class="card px-0 col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 animated fadeIn">
    <div class="card-header bg-dark text-white text-center">
        Formulario de registro
    </div>
    <form class="card-body" @submit.prevent="submit">
        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="campos.nombre" placeholder="Ingrese su nombre" class="form-control" v-bind:class="{'is-invalid': this.invalidos.nombre}" required>
            <div class="invalid-feedback animated fadeIn">{{ verificarNombre }}</div>
        </div>
        <div class="form-group">
            <label for="correo">Correo</label>
            <input @input="verificarCorreo" type="email" name="correo" v-model="campos.correo" placeholder="Ingrese su correo" class="form-control" v-bind:class="{'is-invalid': this.invalidos.correo.state}" required>
            <div class="invalid-feedback animated fadeIn">{{ invalidos.correo.msg }}</div>
        </div>
        <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <input type="password" name="contrasena" v-model="campos.contrasena" placeholder="Ingrese su contraseña" class="form-control" v-bind:class="{'is-invalid': this.invalidos.contrasena}" required>
            <div class="invalid-feedback animated fadeIn">{{ verificarContrasena }}</div>
        </div>
        <div class="form-group">
            <label for="concontrasena">Confirme su contraseña</label>
            <input type="password" name="concontrasena" v-model="campos.concontrasena" placeholder="Vuelva a ingresar su contraseña" class="form-control" v-bind:class="{'is-invalid': this.invalidos.concontrasena}" required>
            <div class="invalid-feedback animated fadeIn">{{ verificarConContrasena }}</div>
        </div>
           <button type="submit" class="btn btn-dark btn-block" :disabled="button === 1"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-if="button === 0"><i class="fas fa-user-plus mr-2"></i>Registrarse</span><span v-else>Registrandose...</span></button>
    </form>
    <register-modal v-if="mostrarModal" v-bind:modalData="modal"></register-modal>
    </div>
</div>
</div>

</template>

<script>
import RegisterModal from './RegisterModal';
export default {
    name: "RegisterForm",
    components: {
        "register-modal": RegisterModal
    },
    data() {
        return {
            campos: {nombre: "", correo: "", contrasena: "", concontrasena: ""},
            invalidos: {nombre: false, correo: {state: false, msg: ""}, contrasena: false, concontrasena: false},
            modal: {state: false, title: "", body: ""},
            mostrarModal: false,
            button: 0
        }
    }, 
    methods: {
        async submit() {
            if(this.campos.nombre.length > 2 && this.campos.correo.length > 0 && this.campos.contrasena.length > 5 && this.campos.concontrasena.length > 5 && this.invalidos.nombre === false && this.invalidos.correo.state === false && this.invalidos.contrasena === false && this.invalidos.concontrasena === false){
                this.button = 1;
                const data = await this.verificarDisponibilidadCorreo();
                if(data === 1){
                    this.mostrarModal = false;
                    try{
                        const res = await axios.post("/register", this.campos);
                        this.asignarModal(true, "", "Te has registrado en la plataforma exitosamente, ahora puedes iniciar sesion.");
                    }catch(err){
                        this.asignarModal(false, "No se ha podido completar el registro :(", "Ha ocurrido un error durante el registro. Por favor vuelve a intentarlo mas tarde.");
                    }                    
                    this.mostrarModal = true;
                }
                    this.button = 0;
            }
        },
        async verificarDisponibilidadCorreo(){
            const res = await axios.get(`/register/${this.campos.correo}`);
            const data = await res.data;
            return data;
        },
        async verificarCorreo() {
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.campos.correo)){
                this.invalidos.correo.state = false;
                const data = await this.verificarDisponibilidadCorreo();
                if(data === 0){
                     this.invalidos.correo.state = true;
                     this.invalidos.correo.msg = "Este correo ya está en uso. No esta disponible."   
                }
            }else {
                this.invalidos.correo.state = true;
                this.invalidos.correo.msg = "El correo ingresado no es válido."
            }
        },
        asignarModal(state, title, body){
            this.modal.state = state;
            this.modal.title = title;
            this.modal.body = body;
        }
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
        verificarContrasena() {
            if(this.campos.contrasena.length > 0){
                if(this.campos.contrasena.length < 6) {
                    this.invalidos.contrasena = true;
                    return "La contraseña debe de tener minimo 6 carácteres."
                }else{
                    this.invalidos.contrasena = false;
                }
            }else {
                this.invalidos.contrasena = false;
            }
        },
        verificarConContrasena() {
            if(this.campos.concontrasena.length > 0){
                if(this.campos.concontrasena !== this.campos.contrasena) {
                    this.invalidos.concontrasena = true;
                    return "Las contraseñas no coinciden"
                }else{
                    this.invalidos.concontrasena = false;
                }
            }else {
                this.invalidos.concontrasena = false;
            }
        }
    }
}
</script>

<style scoped>
.card{
    border: 1px solid#ccd7d7;
    border-radius: 7px;
}
</style>
