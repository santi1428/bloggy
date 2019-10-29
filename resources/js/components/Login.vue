<template>
<div class="container">
<title>Inicio de Sesión</title>
<div class="row justify-content-center formulario">
    <div class="col-11 col-sm-8 col-md-6 col-lg-4 mt-5 my-auto">
            <div class="row" v-if="errorLogin">
                <div class="col">
                    <div class="alert alert-danger text-center" role="alert">
                        El correo y/o contraseña son <strong>inválidos</strong>
                    </div>
                </div>
            </div>
            <div class="card mx-auto my-auto animated fadeIn">          
            <div class="card-header bg-dark text-white text-center">
                Login
            </div>
            <form class="card-body" @input="verificarBotonEnviar" @submit.prevent="login">
                <div class="form-group">
                    <label for="correo">Correo</label>
                    <input type="email" v-model="campos.correo"  class="form-control form-control" :class="{'is-invalid':invalidos.correo}" placeholder="Ingrese su correo" required>
                    <div class="invalid-feedback animated fadeIn">{{ verificarCorreo }}</div>
                </div>
                <div class="form-group">
                    <label for="contrasena">Contraseña</label>
                    <input type="password" v-model="campos.contrasena"  class="form-control form-control" :class="{'is-invalid':invalidos.contrasena}" placeholder="Ingrese su contraseña" required>
                    <div class="invalid-feedback animated fadeIn">{{ verificarContrasena }}</div>
                </div>
                <router-link :to="'register'" class="text-danger d-block mb-2">¿No tienes cuenta? Registrate!</router-link>
                 <button type="submit" class="btn btn-dark btn-block" :disabled="button === 1 || submit === false"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 <span v-if="button === 0"><i class="fas fa-sign-in-alt mr-2"></i>Iniciar Sesión</span><span v-else>Iniciando Sesión</span></button>
            </form>
            </div>
    </div>
</div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "Login",
    data(){
        return {
            campos: {correo: "", contrasena: ""},
            invalidos: {
                correo: false,
                contrasena: false
            },
            errorLogin: false,
            button: 0,
            submit: false
        }
    },
    methods: {
        verificarBotonEnviar(){
            if(this.campos.correo.length > 0 && this.campos.contrasena.length > 0 && this.invalidos.correo === false  && this.invalidos.contrasena === false) {
                this.submit = true;
            }else{
                this.submit = false;
            }
        },
        async login(){
            this.button = 1;
            try{
                const res = await axios.post("/login", this.campos);
                if(res.status === 200){
                    this.configurarUsuario(res.data).then(
                        () => {
                            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                            this.$router.push({name:"Posts"});
                        }
                    )   
                }
            }catch(err){
                this.errorLogin = true;
                setTimeout(() => {
                    this.errorLogin = false;
                }, 5000);
            }
            this.button = 0;
        },
        ...mapActions(['configurarUsuario'])
    },
    computed: {
        verificarCorreo() {
            if(this.campos.correo.length>0){
                if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.campos.correo)){
                    this.invalidos.correo = false;
                }else{
                    this.invalidos.correo = true;
                    return "El correo ingresado no es válido";
                }
            }
        },
        verificarContrasena() {
            if(this.campos.contrasena.length > 0){
                if(this.campos.contrasena.length < 6){
                          this.invalidos.contrasena = true;
                             return "La contraseña debe de tener minimo 6 carácteres.";
                }else{
                            this.invalidos.contrasena = false;
                }
            }
        }
    }
}
</script>

<style scoped>
.formulario{
    height: 84vh;
}

.card{
    border: 1px solid#ccd7d7;
    border-radius: 7px;
}

</style>
