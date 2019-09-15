<template>
<div class="container">
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
                            <div class="col-auto"><img :src="'/storage/profile_images/' + post.user.image" alt="imagen no disponible" id="img-user-post"></div>
                            <div class="col-auto">
                                <p class="nombre mb-0">{{ post.user.name }}</p>
                                <div class="fecha">{{ mostrarFechaDetallada(post.created_at) }}</div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div v-html="post.body"></div>
                            </div> 
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <like :id="post.id"></like>
                            </div>
                        </div>
                        <hr>
                        <div class="row justify-content-center">
                            <div class="col">
                                <h5>Comentarios</h5>
                            </div>
                        </div>
                        <comentar :postId="post.id"></comentar>
                        <hr>
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
                                        <div class="col-auto ml-auto">
                                            <a href="#" class="btn-eliminar" @click.prevent="eliminarComentario(comment.id)"><i class="fas fa-trash-alt text-danger"></i></a>
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
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import Like from '../components/Like';
import Comentar from '../components/Comentar';
import moment from 'moment';
import Toast from '../components/Toast';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name: 'Post',
    components: {
        "like": Like,
        "comentar": Comentar,
        "toast": Toast
    },
    data(){
        return {
           post: null
        }   
    },
    methods: {
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
        }
    },
    computed: mapGetters(["getComments", "getMostrarAnimacionEliminarDeComentarioId"]),
    created(){
         this.traerPublicacion(this.$route.params.id)
         .then(post => { 
             this.post = post;
                this.traerComentarios(this.post.id)
                .then(res => console.log(this.getComments))
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

</style>
