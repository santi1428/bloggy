<template>
<div class="container" id="contenedor">
 <title>Publicaciones</title>
 <div v-if="loggedIn" class="row justify-content-end mt-4 mb-3">
     <div class="col-auto mr-auto">
         <filtrar v-on:filtro-cambiado="resetearPaginacionDePosts(); traerPublicaciones();"></filtrar>
     </div>
     <div class="col-auto col-sm-6 col-lg-3">
            <router-link :to="{name: 'CreatePost'}" id="boton-crear"><i class="fas fa-pen-alt mr-2"></i>Crear publicación</router-link>
     </div>
 </div>
  <div v-else class="row justify-content-center mt-4 mb-3">
     <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div class="alert alert-info" role="alert">
                <router-link :to="{name: 'Login'}" class="alert-link">Inicia sesión </router-link> o <router-link :to="{name: 'Register'}" class="alert-link">registrate </router-link>si no tienes cuenta para publicar 
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
     </div>
 </div>
 <div v-if="getPosts!==null">
    <div v-if="getPosts.length!==0"> 
        <div v-for="post in getPosts" :key="post.id" class="box" :class="{'animated fadeIn': post.id == getMostrarAnimacionPublicarDePostId, 'animated fadeOut': post.id == getMostrarAnimacionEliminarDePostId}">
                <div class="row post">
                    <div class="col-12 encabezado-publicacion">
                            <div class="row">
                                <div class="col-auto"><img :src="'/storage/profile_images/' + post.userImage" alt="imagen no disponible"></div>
                                <div class="col-auto">
                                    <p class="nombre text-dark"><strong>{{ post.userName }}</strong></p>
                                    <small>Publicado {{ mostrarFechaRelativa(post.created_at) }}</small>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col post-body" v-html="post.body">
                                </div>
                            </div> 
                    <options class="options" v-if="post.userId === parseInt(getUserId)" v-bind:id="post.id"></options>
                    </div>
                </div>
                <div class="row my-2">
                    <div v-if="loggedIn" class="col-auto">
                        <like :id="post.id" :likes_amount="post.likes_amount"></like>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-comments text-info fa-2x mr-2"></i><span class="text-info font-weight-bold">{{ post.comments_amount }} comentarios</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 contenedor-link">
                        <router-link :to="{name: 'Post', params: {id: post.id}}" class="link-publicacion"><i class="fas fa-reply mr-2 text-dark"></i>Ir a la publicación</router-link>
                    </div>
                </div>
                <deletepost v-if="getMostrarModalEliminarDePostId === post.id" v-bind:id="post.id"></deletepost>
        </div>
        <div class="row my-5" v-if="mostrarCargandoPublicaciones">
            <div class="col">
                <h5 class="text-dark text-center" id="cargando">
                        <i class="fa fa-spinner fa-pulse fa-fw mr-1"></i>Cargando publicaciones 
                </h5>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="row mt-5">
            <div class="col-md-6 mx-auto">
                <h3 class="text-dark">No hay publicaciones. Se el primero en publicar!</h3>
            </div>
        </div>
    </div>
</div>
 <div v-else>
        <div class="row mt-5">
            <div class="col">
                <h5 class="text-dark text-center" id="cargando">
                  <i class="fa fa-spinner fa-pulse fa-fw mr-2"></i>Cargando publicaciones
               </h5>
            </div>
        </div>
</div>
<toast></toast>
<div id="infinite-scroll-trigger"></div>
</div>
</template>

<script>
import Option from '../components/Option';
const DeletePost = () => import('../components/DeletePost');
import Toast from '../components/Toast';
import Like from '../components/Like';
// import moment from 'moment';
import Filtrar from '../components/Filtrar';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
import { setTimeout } from 'timers';
export default {
    name: "Posts",
    components: {
        'options': Option,
        'deletepost': DeletePost,
        'like': Like,
        'toast': Toast,
        'filtrar': Filtrar
    },
    data(){
        return {
            mostrarCargandoPublicaciones: false,
            mounted: false
        }
    },
    methods:{
        ...mapActions(['traerPublicaciones']),
        traerPublicacionesConScroll(){
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if(entry.intersectionRatio > -1){
                            if(this.mostrarCargandoPublicaciones === false){                       
                                    this.mostrarCargandoPublicaciones = true;
                                    this.traerPublicaciones()
                                    .then(() => {
                                        this.mostrarCargandoPublicaciones = false;
                                    })
                                    .catch(() => {
                                        this.mostrarCargandoPublicaciones = true;
                                    });
                            }
                        }
                    })
                });
                observer.observe(document.getElementById("infinite-scroll-trigger"));
        },
        mostrarFechaRelativa(fecha){
            moment.updateLocale('es', {
                relativeTime : {
                    future: "en %s",
                    past:   "hace %s",
                    s  : 'unos segundos',
                    ss : '%d segundos',
                    m:  "un minuto",
                    mm: "%d minutos",
                    h:  "una hora",
                    hh: "%d horas",
                    d:  "un dia",
                    dd: "%d dias",
                    M:  "un mes",
                    MM: "%d meses",
                    y:  "un año",
                    yy: "%d años"
                }
            });
            let fechaLocal = moment.utc(fecha).local();
            return fechaLocal.fromNow();
        },
        ...mapMutations(["resetearPaginacionDePosts"])
    },
    created(){
        this.resetearPaginacionDePosts();
        this.traerPublicaciones()
        .then(() => this.traerPublicacionesConScroll())
        .catch(err => console.log(err));
    },
    computed: 
    {
        ...mapGetters(["loggedIn", "getPosts", "getUserId", "getMostrarModalEliminarDePostId", "getMostrarAnimacionPublicarDePostId", "getMostrarAnimacionEliminarDePostId"]),
    },
    mounted(){
        // alert(window.innerHeight);
        this.mounted = true;
    }
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
    

    /* .fade {
      transition: opacity 0.3s linear !important;
    } */

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
        border: 1px solid #c9d1d2;
    }

    .post{
            display: block;
            min-height: 24vh;
            max-height: 90vh;
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
        text-decoration: none;
    }

    .fa-reply{
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }

    #cargando{
        font-size: 1rem;
    }

    .options{
        position: absolute;
        top: 0%;
        right: 2%;
        width: 100%;
        z-index: 1;
    }

    #infinite-scroll-trigger{
        height: 1px;
    }

    img{
        border-radius: 100%;
        height: 48px;
        width: 48px;
    }

    .fa-thumbs-up{
        font-size: 23px;
    }

    .fa-comments{
        font-size: 23px;
    }



    /* @media (max-width: 320px) {   
        #toast{
            position: fixed;
            z-index: 1000;
            width: 80vw;
            top: 85vh;
            right: 10vw;
        }
    } */

    /* @media(min-width: 321px) and (max-width: 360px){
        #toast{
            position: fixed;
            z-index: 1;
            width: 100vw;
            top: 10vh;
            right: 25vh;
        }
    }

    
    @media (max-width: 320px) {   
        ul{
            top: 0%;
            right: 5%;
            width: 52%;
            font-size: 11.4px;
          }
    }

        @media (min-width: 411px) and (max-width: 500px) {   
        ul{
            top: 0%;
            right: 5%;
            width: 38%;
            font-size: 11.4px;
          }
          
        }

        @media (min-width: 501px) and (max-width: 768px) {   
            ul{
                top: 0%;
                right: 3%;
                width: 20%;
                font-size: 11.4px;
            }
          
        }

        @media (min-width: 769px) and (max-width: 992px) {   
            ul{
                top: 0%;
                right: 3%;
                width: 20%;
                font-size: 11.4px;
            }
          
        }

        @media (min-width: 992px) and (max-width: 1200px) {   
            ul{
                top: 0%;
                right: 2%;
                width: 15%;
                font-size: 11.4px;
            }
          
        }

        @media(min-height: 700px) and (max-height: 780px){
            ul{
                top: 1%;
                right: 5%;
                width: 43%;
                font-size: 11.8px;
            }
        } */
    
</style>
