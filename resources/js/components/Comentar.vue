<template>
    <div class="row mt-3">
        <div class="col-auto pl-3 pr-0 pt-2">
            <img :src="'/storage/profile_images/' + getUserImage" class="" id="user-img">
        </div>
        <div class="col-10 pl-2">
            <textarea class="form-control" id="comentario" placeholder="Escribe tu comentario aquí" v-model="comment.comment" :disabled="button==1"></textarea>
        </div>
        <div class="col-auto">
            <button class="btn" id="boton-comentario" v-on:click="publicarComentario" v-if="button==0" data-toggle="tooltip" data-placement="top" title="Comentar"><i class="fas fa-comment fa-3x text-info"></i></button>
            <div class="spinner-border text-info mt-3" v-if="button==1" role="status" id="spinner">
                <span class="sr-only">Comentando...</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name: "Comentar",
    props: ["postId"],
    data(){
        return {
            comment: {
                comment: "",
                postId: null,
                userId:null
            },
            button: 0
        }
    },
    methods: {
        publicarComentario(){
            this.button = 1;
            let regex = /^\s+$/;
            if(regex.test(this.comment.comment) == false && this.comment.comment != ""){
                this.comment.postId = this.postId;
                this.comment.userId = this.getUserId;
                this.comentar(this.comment)
                .then(res => {
                    if(res.status == 200){
                        this.button = 0;
                        this.comment.comment = "";
                        this.asignarDatosToast({
                            msg: "Comentario publicado",
                            clase: "bg-info",
                            icono: "fas fa-comments"
                        });
                        this.$emit('aumentar-comentarios');
                    }
                })
                .catch(err => console.log(err));
            }else{
                this.button = 0;
            }
        },
        ...mapActions(["comentar", "asignarDatosToast"])
    },
    computed: {
        ...mapGetters(["getUserImage", "getUserId"])
    }
}
</script>

<style scoped>
    #comentario{
        height: 11vh;
        border-radius: 25px;
        display: inline-block;
    }

    #boton-comentario{
        font-size: 16px;
        transition: 0.3s;
    }

    #boton-comentario:hover{
        font-size: 17px;
        transition: 0.3s;
    }


    #user-img{
        border-radius: 100%;
        display: inline-block;
        height: 48px;
        width: 48px;
    }

    #spinner{
        width: 2.5rem; 
        height: 2.5rem;
    }

</style>