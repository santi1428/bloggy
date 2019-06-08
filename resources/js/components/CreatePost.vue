<template>
        <div class="container">
            <title>Crear publicación</title>
                <div class="row mt-4 justify-content-center">
                    <div class="col-lg-12">
                      <form @submit.prevent="publicar">
                        <ckeditor :editor="editor" @ready="onReady" v-model="postData"></ckeditor>
                        <button class="btn btn-dark btn-block mt-2" type="submit" :disabled="button === 1"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  <span v-if="button === 0"><i class="fas fa-pen-alt mr-2"></i>Crear publicación</span><span v-else>Creando publicación...</span></button>
                      </form>
                    </div>
                </div>
        </div>
</template>

<script>
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import BuildDocument from '@ckeditor/ckeditor5-build-decoupled-document';
    
    import { mapActions } from 'vuex';
    export default {
        name: 'CreatePost',
        components: {
            ckeditor: CKEditor.component
        },
        data() {
            return {
                editor: BuildDocument,
                postData: '',
                button: 0
            };
        },
        methods: {
            ...mapActions(["guardarPublicacion"]),
             onReady( editor )  {
                 editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                 );
            },
            publicar(){
                this.button = 1;
                if(this.postData.length > 5){
                    let publicacion = {post: this.postData};
                    this.guardarPublicacion(publicacion)
                    .then(() => {
                        this.button = 0;
                        this.$router.push({name: "Posts"})    
                    })
                    .catch(err => {
                        this.button = 0;
                        console.log(err)
                    }); 
                }else{
                    this.button = 0;
                }
            }
        }
    }
</script>

<style>

.ck-editor__editable {
    height: 70vh;
}

</style>
