<template>
        <div class="container">
        <title>Crear publicación</title>
            <div class="row mt-4 justify-content-center">
                <div class="col-lg-12">
                    <form @submit.prevent="publicar">
                        <quill-editor 
                            v-model="postData"
                            ref="myQuillEditor"
                            :options=editorOption
                        />
                        <button class="btn btn-dark btn-block mt-2" type="submit" :disabled="button === 1"><span v-if="button === 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  <span v-if="button === 0"><i class="fas fa-pen-alt mr-2"></i>Crear publicación</span><span v-else>Creando publicación...</span></button>
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor';
import  imageResize from 'quill-image-resize-vue';
import { ImageDrop } from 'quill-image-drop-module';
import { mapActions } from 'vuex';
Quill.register("modules/imageResize", imageResize);
Quill.register("modules/imageDrop", ImageDrop);


export default {
    name: "CreatePost",
    components: {
        "quill-editor": quillEditor
    },
    data(){
        return {
            button: 0,
            editorOption: {
                debug: 'info',
                placeholder: 'Escribe tu publicacion...',
                readOnly: true,
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        ['blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image', 'video'],
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ],
                    imageResize: {},
                    imageDrop: true       
                }                
            },
            postData: "",
        }   
    },
    methods: {
        ...mapActions(["guardarPublicacion", "asignarDatosToast"]),
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
                    this.$router.go(-1);
                    setTimeout(() => {
                        this.asignarDatosToast({msg: "Se ha creado la publicación", clase: "bg-success", icono: "fas fa-check-circle"})
                    }, 100);
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
.ql-container{
    height: 70vh !important;
}

</style>