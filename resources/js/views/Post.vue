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
                        <div class="toast shadow-lg rounded" id="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2500">
                            <!-- <div class="toast-header bg-success animate rotateIn">
                                <strong class="mx-auto text-white"><i class="fas fa-check-circle mr-2"></i>Acción Completada</strong>
                                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div> -->
                            <div class="toast-body text-center bg-success text-white" id="mensajeToast">
                                <i class="fas fa-check-circle mr-2"></i>{{mostrarMensajeToast}}
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-auto"><img :src="'/storage/profile_images/' + post.user.image" alt="imagen no disponible"></div>
                            <div class="col-auto">
                                <p class="nombre">{{ post.user.name }}</p>
                                <div class="fecha">Publicado el {{ post.created_at }}</div>
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
                        <div class="row">
                            <div class="col">
                                Comentarios
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import Like from '../components/Like';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name: 'Post',
    components: {
        "like": Like
    },
    data(){
        return {
           post: null
        }   
    },
    methods: {
        ...mapActions(["traerPublicacion"]),
        ...mapMutations(["asignarMensajeToast"])
    },
    computed: {
        mostrarMensajeToast(){
            if(this.getMensajeToast !== ""){
                let msg = this.getMensajeToast;
                this.asignarMensajeToast("");
                setTimeout(() => {
                    $('#toast').toast('show');
                }, 50)
                return msg;
            }else{
                return "";   
            }
        }, 
        ...mapGetters(["getMensajeToast"])
    },
    created(){
         this.traerPublicacion(this.$route.params.id)
         .then(post => { 
             this.post = post;
             console.table(post);
         })
         .catch(err => this.$router.push({name: "Posts"}));
    }
}
</script>
<style>
    .nombre{
        font-size: 1rem;

    }

    .fecha{
        font-size: 0.9rem;
    }

    img{
        border-radius: 100%;
        height: 48px;
        width: 48px;
    }


    #toast{
        position: fixed;
        z-index: 1000;
        width: 19vw;
        top: 90vh;
        right: 25vh;
    }

    #mensajeToast{
        font-size: 15px;
    }
</style>
