<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card" id="emailForm" :class="{'animated fadeInRight': showEmailForm, 'animated fadeOutLeft d-none': !showEmailForm }">
          <div class="card-header bg-secondary text-white text-center">Recuperacion de Contraseña</div>
          <div class="card-body">
            <input type="email" name="email" id="email" class="form-control text-center" :class="{'is-invalid':invalidos.correo.state}"  placeholder="Ingresa aqui tu correo electrónico" v-model="campos.correo" :disabled="button == 1">
            <div class="invalid-feedback animated fadeIn text-center">{{ invalidos.correo.msg }}</div>
            <button class="btn btn-secondary btn-block mt-3" @click="changeForm" :disabled="button === 1">
              <span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-if="button === 1">Procesando...</span>
              <span v-if="button === 0">Recuperar Contraseña</span>
            </button>
          </div>
        </div>
        <div class="alert alert-success" role="alert" :class="{ 'animated fadeInRight': !showEmailForm, 'animated fadeOutLeft d-none': showEmailForm  }">
          Se te ha enviado un correo con el <strong>código</strong> para reestablecer la contraseña a el correo <strong>{{ campos.correo }}</strong>
        </div>
        <div class="card" :class="{ 'animated fadeInRight': !showEmailForm, 'animated fadeOutLeft d-none': showEmailForm  }">
          <div class="card-header bg-secondary text-white text-center">Reestablecer Contraseña</div>
          <div class="card-body">
            <input type="text"  id="code" class="form-control" placeholder="Ingresa aqui el codigo" v-model="campos.codigo" :class="{'is-invalid':invalidos.codigo.state}" :disabled="button == 1">
            <div class="invalid-feedback animated fadeIn">{{ invalidos.codigo.msg }}</div>
            <input type="password" id="password" class="form-control mt-2" placeholder="Ingresa tu nueva contraseña" :class="{'is-invalid':invalidos.contraseña.state}" v-model="campos.contraseña" :disabled="button == 1">  
            <div class="invalid-feedback animated fadeIn">{{ invalidos.contraseña.msg }}</div>
            <input type="password" id="conPassword" class="form-control mt-2" placeholder="Confirma tu nueva contraseña" :class="{'is-invalid':invalidos.conContraseña.state}" v-model="campos.conContraseña" :disabled="button == 1">            
            <div class="invalid-feedback animated fadeIn">{{ invalidos.conContraseña.msg }}</div>
            <button class="btn btn-secondary mt-2 btn-block" @click="resetPassword" :disabled="button == 1">
              <span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-if="button === 1">Procesando...</span>
              <span v-if="button === 0">Reestablecer Contraseña</span>
            </button>
            <button class="btn btn-secondary mt-2 btn-block" @click="changeForm"><i class="fas fa-backward mr-2"></i>Retroceder</button>
          </div>
        </div>
        <toast></toast>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Toast from '../components/Toast';

export default {
    name: "RecoverPassword",
    components: {
      "toast": Toast
    },
    data(){
      return {
        showEmailForm: true,
        button: 0,
        campos: {
          correo: "",
          codigo: "",
          contraseña: "",
          conContraseña: ""
        },
        invalidos: {
          correo: {
            state: false,
            msg: ""
          },
          codigo: {
            state: false,
            msg: ""
          },
          contraseña: {
            state: false,
            msg: ""
          },
          conContraseña: {
            state: false,
            msg: ""
          }
        }
      }
    },
    methods: {
      async changeForm(){
        if(this.showEmailForm){
          if(!this.invalidos.correo.state && this.campos.correo.trim().length > 0){
            this.button = 1;
            try{
              const res = await axios.post("http://localhost/recoverpassword", {"email": this.campos.correo});
              console.log(res.data);
              if(res.data == 1){
                  this.showEmailForm = !this.showEmailForm;
              }else if(res.data == 0){
                this.invalidos.correo.state = true;
                this.invalidos.correo.msg = "Este correo no esta registrado";
              }
            }catch(err){
                this.invalidos.correo.msg = "Ha ocurrido un error, por favor intenta mas tarde";
            }
            this.button = 0;
          }else{
            this.invalidos.correo.state = true;
            this.invalidos.correo.msg = "Este campo no puede estar vacío";
          }
        }else{
          this.showEmailForm = !this.showEmailForm;
        }
      },
      async resetPassword(){
        if(this.campos.codigo.trim().length == 6 && this.invalidos.codigo.state == false && 
        this.campos.contraseña.trim().length >= 6 && this.invalidos.contraseña.state == false &&
        this.campos.conContraseña.trim().length >= 6 && this.invalidos.conContraseña.state == false){
          this.button = 1;
          try{
            const res = await axios.post("http://localhost/resetpassword", {
              "email": this.campos.correo,
              "codigo": this.campos.codigo,
              "nuevaContraseña": this.campos.contraseña  
              });

            if(res.data == 1){
              this.$router.push({name:"Login"});
              setTimeout(() => {
                this.asignarDatosToast({
                  msg: "Contraseña reestablecida exitosamente",
                  clase: "bg-success",
                  icono: "fas fa-check-circle"
                });
              }, 300);
            }else if(res.data == 0){
              this.invalidos.codigo.state = true;
              this.invalidos.codigo.msg = "El código ingresado no es válido";
            }
          }catch(err){
            this.$router.push({name:"Posts"});
            setTimeout(() => {
              this.asignarDatosToast({
                  msg: "Ha ocurrido un error. Por favor intenta mas tarde",
                  clase: "bg-danger",
                  icono: "fas fa-exclamation-circle"
              });
            }, 300);
          }
          this.button = 0;
        }
      },
    ...mapActions(["asignarDatosToast"])

    },
    watch: {
      'campos.correo': function(correo){
         if(correo.trim().length>0){
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.campos.correo)){
                this.invalidos.correo.state = false;
                this.invalidos.correo.msg = "";
            }else{
                this.invalidos.correo.state = true;
                this.invalidos.correo.msg = "El correo ingresado no es válido";
            }
          }
      },
      'campos.codigo': function(codigo){
        if(codigo.trim().length >= 5){
            if(codigo.trim().length < 6 || codigo.trim().length > 6){
              this.invalidos.codigo.state = true;
              this.invalidos.codigo.msg = "El código ingresado no es válido";
            }else{
              this.invalidos.codigo.state = false;
              this.invalidos.codigo.msg = "";
            }
        }
      },
      'campos.contraseña': function(contraseña){
        if(contraseña.trim().length > 0){
            if(contraseña.trim().length < 6) {
              this.invalidos.contraseña.state = true;
              this.invalidos.contraseña.msg = "La contraseña debe de tener minimo 6 carácteres.";
            }else{
              this.invalidos.contraseña.msg = "";
              this.invalidos.contraseña.state = false;
            }
        }else {
          this.invalidos.contraseña.msg = "";
          this.invalidos.contraseña.state = false;
        }
      },
      'campos.conContraseña': function(conContraseña){
        if(this.campos.conContraseña.trim().length > 0){
          if(this.campos.conContraseña !== this.campos.contraseña) {
              this.invalidos.conContraseña.state = true;
              this.invalidos.conContraseña.msg = "Las contraseñas no coinciden";
          }else{
              this.invalidos.conContraseña.msg = "";
              this.invalidos.conContraseña.state = false;
          }
        }else {
            this.invalidos.conContraseña.msg = "";
            this.invalidos.conContraseña.state = false;
        }
      }
    }
}
</script>

<style scoped>
  .alert-success{
    margin-top: 10vh;
  }

  #emailForm{
    margin-top: 25vh;
  }
</style>