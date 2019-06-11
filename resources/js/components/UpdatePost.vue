<template>
    <div class="container">
        <title>Actualizar Publicacion</title>
            <div class="row mt-4 justify-content-center">
                <div class="col-lg-12">
                    <form @submit.prevent="actualizar">
                        <ckeditor :editor="editor" @ready="onReady" v-model="postData"></ckeditor>
                        <div class="custom-control custom-switch my-3">
                            <input type="checkbox" @change="autoActualizar" v-model="switchAutoActualizar" class="custom-control-input" id="switchAutoActualizar">
                            <label class="custom-control-label" for="switchAutoActualizar">Actualizar automaticamente</label>
                        </div>
                        <button class="btn btn-dark btn-block mt-2" type="submit" :disabled="botonActualizar"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  <span v-if="button === 0"><i class="fas fa-edit mr-2"></i>Actualizar publicación</span><span v-else>Actualizando publicación...</span></button>
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import BuildDocument from '@ckeditor/ckeditor5-build-decoupled-document';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { setInterval } from 'timers';

export default {
    name: 'UpdatePost',
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            editor: BuildDocument,
            switchAutoActualizar: false,
            autoActualizarIntervalo: null,
            idPost: null,
            postData: '',
            postDataAntes: '',
            button: 0
        };
    },
    methods: {
        onReady( editor )  {
            editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
            );
        },
        actualizar(){
            if(this.postData != ""){
                if(this.postData !== this.postDataAntes){
                    this.button = 1;
                    this.postDataAntes = this.postData;
                    this.actualizarPublicacion({idPost: this.idPost, postData: this.postData})
                    .then(() => {
                        this.button = 0;
                    });
                }
            }   
        },
        autoActualizar(){
            if(this.switchAutoActualizar){
                this.autoActualizarIntervalo = window.setInterval(() => {
                    this.actualizar();
                }, 1000);
            }else{
                window.clearInterval(this.autoActualizarIntervalo);
            }
        },
        ...mapActions(["verificarPropietario", "traerPublicacion", "actualizarPublicacion"])
    },
    computed: {
        ...mapGetters(["getUserId"]),
        botonActualizar(){
            return this.button === 1 || this.postData == '' ||  this.postData === this.postDataAntes;  
        }
    },
    mounted(){
        this.verificarPropietario(this.idPost)
        .then(() => {
            this.traerPublicacion(this.idPost)
            .then(post => {
                this.postData = post.body;
                this.postDataAntes = post.body;
            })
            .catch(() => this.$router.push({name: "Posts"}));
        })
        .catch(err => this.$router.push({name: "Posts"}));
    },
    beforeDestroy(){
        window.clearInterval(this.autoActualizarIntervalo);
    },
    created(){
        this.idPost = this.$route.params.id;
    }
}
</script>

<style scoped>
.ck-editor__editable {
    height: 64vh;
}

.custom-control-label:before{
  background-color:white;
}
.custom-switch .custom-control-input:checked~.custom-control-label::before{
  background-color:#28A745;
}
</style>
