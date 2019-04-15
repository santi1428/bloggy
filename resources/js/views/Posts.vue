<template>
<div class="container" id="contenedor">
 <title>Publicaciones</title>
 <div v-if="loggedIn" class="row justify-content-end mt-4 mb-3">
     <div class="col-sm-8 col-md-6 col-lg-3">
            <router-link :to="{name: 'CreatePost'}" id="boton-crear"><i class="fas fa-pen-alt mr-2"></i>Crear publicación</router-link>
     </div>
 </div>
  <div v-else class="row justify-content-center mt-4 mb-3">
     <div class="col-sm-5">
            <div class="alert alert-info" role="alert">
                <router-link :to="{name: 'Login'}" class="alert-link">Inicia sesión </router-link> o <router-link :to="{name: 'Register'}" class="alert-link">registrate </router-link>si no tienes cuenta para publicar 
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
     </div>
 </div>
 <div v-for="post in getPosts" :key="post.id" class="box">
        <div class="row post">
            <div class="col-12">
                    <div class="row">
                        <div class="col-auto"><i class="fas fa-user-circle text-primary fa-3x"></i></div>
                        <div class="col-auto">
                        <p class="nombre">{{ post.user.name }}</p>
                        <small>{{ post.created_at }}</small></div>
                        <div class="col d-flex flex-column">
                             <a href="#" class="text-primary align-self-end"><i class="fas fa-bars"></i></a>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col post-body" v-html="post.body">
                        </div>
                    </div> 
            </div>
        </div>
        <div class="row">
            <div class="col-12 contenedor-link">
                <a href="#" class="link-publicacion">Ir a la publicacion</a>
            </div>
        </div>
 </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: "Posts",
    data(){
        return {
            numero: 10 
        }
    },
    methods:{
        ...mapActions(['traerPublicaciones'])
    },
    created(){
        this.traerPublicaciones()
        .then(() => {
            console.log("Todo salio bien");
        })
        .catch(err => console.log(err));
    },
    computed: mapGetters(["loggedIn", "getPosts"])
}
</script>

<style scoped>
    #boton-crear{
        text-decoration: none;
        color: #ffff;
        background: #32ad66; 
        padding: 10px 27px;       
        border-radius: 6px;
        font-size: 1rem;
        transition: 0.2s;
    }

    #boton-crear:hover{
        transition: 0.3s;
        background:#2c9a5b;
        color: #e5e5e5;
        font-size: 16.1px;
    }

    .nombre{
        margin: 0px;
    }

    #contenedor {
         overflow-wrap: break-word;
    }

    .box{
        border: 1px dotted#ccd7d8;
        height:100%;
        border-radius: 10px;
        padding-top: 10px;
        padding-right: 25px;
        padding-left: 25px;
        margin-bottom: 10px;

    }

    .box:hover{
        transition: 0.3s;
        border: 1px solid #b7c1c2;
    }

    .post{
            display: block;
            max-height: 40vh;
            overflow: hidden;
    }

    .contenedor-link{
        width: 100%;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .link-publicacion{
        display: block;
        text-align: center;
        padding: 6px 0px;
        text-decoration: none;
        background: #2d5b5e;
        border-radius: 5px;
        color: #ffff;
        transition: 0.2s;
    }

    .link-publicacion:hover{
        transition:  0.2s;
        background:#285154;
        color: #e5e5e5;
    }
</style>
