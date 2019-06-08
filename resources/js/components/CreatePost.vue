<template>
        <div class="container">
            <title>Crear publicación</title>
                <div class="row mt-4 justify-content-center">
                    <div class="col-10">
                      <form @submit.prevent="publicar">
                        <ckeditor :editor="editor" @ready="onReady" v-model="postData"></ckeditor>
                        <button class="btn btn-dark btn-block mt-2" type="submit">Publicar</button>
                      </form>
                    </div>
                </div>
        </div>
</template>

<script>
    // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    // import BuildBalloon from '@ckeditor/ckeditor5-build-balloon';
    // import BalloonBlock from '@ckeditor/ckeditor5-build-balloon-block';
    // import BuildInline from '@ckeditor/ckeditor5-build-inline';
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
                postData: ''
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
                if(this.postData.length > 5){
                    let publicacion = {name: 'Santiago', date: 'Hace 2 minutos', body: this.postData};
                    this.guardarPublicacion(publicacion)
                    .then(() => {
                        this.$router.push({name: "Posts"})    
                    })
                    .catch(e => console.log(e)); 
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
