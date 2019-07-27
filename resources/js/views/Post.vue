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
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Post',
    data(){
        return {
           post: null
        }   
    },
    methods: {
        ...mapActions(["traerPublicacion"])
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

</style>
