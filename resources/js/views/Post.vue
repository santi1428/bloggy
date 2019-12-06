<template>
<div class="container">
    <title>{{ tituloPublicacion }}</title>
    <div class="row justify-content-center">
        <div class="col">
            <div class="row justify-content-center mt-5" v-if="post == null">
                <div class="col-10">
                    <h5 class="text-dark text-center" id="cargando">
                            <i class="fa fa-spinner fa-pulse fa-fw mr-1"></i>Cargando publicacion
                    </h5>
                </div>
            </div>
            <div class="row  shadow-sm rounded py-3 mt-md-2" v-else>
                <div class="col">
                        <toast></toast>
                        <div class="row">
                            <div class="col-auto"><img :src="'/storage/profile_images/' + post.userImage" alt="imagen no disponible" id="img-user-post"></div>
                            <div class="col-auto">
                                <p class="nombre mb-0">{{ post.userName }}</p>
                                <div class="fecha">{{ mostrarFechaDetallada(post.created_at) }}</div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div v-html="post.body"></div>
                            </div> 
                        </div>
                        <hr>
                        <div v-if="loggedIn" class="row">
                            <div class="col">
                                <like :id="post.id" :likes_amount="post.likes_amount"></like>
                            </div>
                        </div>
                        <hr>
                        <div class="row justify-content-center">
                            <div class="col">
                                <h5>Comentarios<span class="badge badge-info ml-2">{{ post.comments_amount }}</span></h5>
                            </div>
                        </div>
                        <comment v-if="loggedIn" :postId="post.id" v-on:aumentar-comentarios="post.comments_amount++"></comment>
                        <div v-else class="row">
                            <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
                                <div class="alert alert-info" role="alert">
                                    <router-link :to="{name: 'Login'}" class="alert-link">Inicia sesión </router-link> o <router-link :to="{name: 'Register'}" class="alert-link">registrate </router-link>si no tienes cuenta para comentar o dar like
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div v-if="getComments!==null">
                            <div v-for="comment in getComments" :key="comment.id">
                                <div class="row mt-2 animated fadeIn" id="comment" :class="{'animated fadeOut': comment.id == getMostrarAnimacionEliminarDeComentarioId}">
                                    <div class="col-auto">
                                            <img :src="'/storage/profile_images/' + comment.image" alt="imagen no disponible" id="img-user-comment">
                                    </div>
                                    <div class="col">
                                        <div class="row">
                                            <div class="col-auto">
                                                <p class="nombre m-0 text-dark"><strong>{{ comment.name }}</strong></p>
                                            </div>
                                            <div class="col-auto ml-3">
                                                <div class="fecha text-primary">{{ mostrarFechaRelativa(comment.created_at) }}</div>
                                            </div> 
                                            <div class="col-auto ml-auto" v-if="post.userId === parseInt(getUserId) || comment.userId === parseInt(getUserId)">
                                                <a href="#" class="btn-eliminar" @click.prevent="borrarComentario(comment.id)"><i class="fas fa-trash-alt text-danger"></i></a>
                                            </div>
                                        </div>        
                                        <div class="row">
                                            <div class="col-auto">
                                                    <p class="comment">{{comment.comment}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="row my-5" v-if="mostrarCargandoComentarios">
                                <div class="col">
                                    <h5 class="text-dark text-center" id="cargando">
                                            <i class="fa fa-spinner fa-pulse fa-fw mr-1"></i>Cargando comentarios 
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row mt-5">
                                <div class="col">
                                    <h5 class="text-dark text-center" id="cargando">
                                    <i class="fa fa-spinner fa-pulse fa-fw mr-2"></i>Cargando comentarios
                                </h5>
                                </div>
                            </div>
                        </div>
                        <div id="infinite-scroll-trigger"></div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import Like from '../components/Like';
import Comment from '../components/Comment';
import Toast from '../components/Toast';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name: 'Post',
    components: {
        "like": Like,
        "comment": Comment,
        "toast": Toast
    },
    data(){
        return {
           post: null,
           mostrarCargandoComentarios: false,
        }   
    },
    methods: {
        ...mapMutations(["resetearPaginacionDeComentarios"]),
        ...mapActions(["traerPublicacion", "traerComentarios", "eliminarComentario"]),
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
        mostrarFechaDetallada(fecha){
            moment.locale('es');
            let fechaPost = moment(moment.utc(fecha).local()).format("dddd, MMMM D YYYY, h:mm a"); 
            return fechaPost.charAt(0).toUpperCase() + fechaPost.slice(1);
        },
        borrarComentario(commentId){
            this.eliminarComentario(commentId)
            .then(() => {
                this.post.comments_amount--;
            })
            .catch(err => console.log(err));
        },
        traerComentariosConScroll(){
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > -1){
                        if(this.mostrarCargandoComentarios === false){                       
                                this.mostrarCargandoComentarios = true;
                                this.traerComentarios(this.post.id)
                                .then(() => {
                                    this.mostrarCargandoComentarios = false;
                                })
                                .catch(() => {
                                    this.mostrarCargandoComentarios = true;
                                });
                        }
                    }
                })
            });
            observer.observe(document.getElementById("infinite-scroll-trigger"));
        }
    },
    computed: {
        ...mapGetters(["getComments", "getMostrarAnimacionEliminarDeComentarioId", "getUserId", "loggedIn"]),
        tituloPublicacion(){
            if(this.post != null){
                let str = this.post.body.length <= 60 ? "" : "...";
                return this.post.body.replace(/<\/?[^>]+(>|$)/g, "").substr(0, 60) + str;
            }else{
                return "";
            }
        }
    },
    created(){
         this.traerPublicacion(this.$route.params.id)
         .then(post => { 
            this.post = post;
            // console.log(this.post);
            this.resetearPaginacionDeComentarios();
            this.traerComentarios(post.id)
            .then(() => {
                this.traerComentariosConScroll()
            })
            .catch(err => console.log(err));
         })
         .catch(err => this.$router.push({name: "Posts"}));
    },
    mounted(){
    }
}
</script>
<style scoped>
    .nombre{
        font-size: 1rem;

    }

    .fecha{
        font-size: 0.9rem;
    }

    #comment{
        position: relative;
        min-height: 15vh;
    }

    #img-user-post{
        border-radius: 100%;
        height: 48px;
        width: 48px;
    }


    .nombre{
        font-size: 1rem;
    }

    .fecha{
        font-size: 0.8rem;
    }

    #img-user-comment{
        border-radius: 100%;
        height: 48px;
        width: 48px;
    }

    .comment{
        font-size: 0.9rem;
    }

    .btn-eliminar{
        font-size: 18px;
    }


    #cargando{
        font-size: 1rem;
    }


    #infinite-scroll-trigger{
        height: 1px;
    }

</style>
