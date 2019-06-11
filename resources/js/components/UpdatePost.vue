<template>
    <div class="container">
        <title>Actualizar Publicacion</title>
            <div class="row mt-4 justify-content-center">
                <div class="col-lg-12">
                    <form @submit.prevent="actualizarPublicacion">
                        <ckeditor :editor="editor" @ready="onReady" v-model="postData"></ckeditor>
                        <div class="custom-control custom-switch my-3">
                            <input type="checkbox" class="custom-control-input" id="switchAutoActualizar">
                            <label class="custom-control-label" for="switchAutoActualizar">Actualizar automaticamente</label>
                        </div>
                        <button class="btn btn-dark btn-block mt-2" type="submit" :disabled="button === 1 || postData == ''"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  <span v-if="button === 0"><i class="fas fa-pen-alt mr-2"></i>Actualizar publicación</span><span v-else>Actualizando publicación...</span></button>
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

export default {
    name: 'UpdatePost',
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            editor: BuildDocument,
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
        actualizarPublicacion(){

        },
        ...mapActions(["verificarPropietario", "traerPublicacion"])
    },
    computed: {
        ...mapGetters(["getUserId"])
    },
    created(){
        this.verificarPropietario(this.$route.params.id)
        .then(() => {
            this.traerPublicacion(this.$route.params.id)
            .then(post => {
                this.postData = post.body;
                this.postDataAntes = post.body;
            })
            .catch(() => this.$router.push({name: "Posts"}));
        })
        .catch(err => this.$router.push({name: "Posts"}));
    }
}
</script>

<style>
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
