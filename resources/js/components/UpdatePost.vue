<template>
    <div class="container">
        <title>Actualizar Publicacion</title>
            <div class="row mt-4 justify-content-center">
                <div class="col-lg-12">
                    <form @submit.prevent="actualizar">
                        <quill-editor 
                            v-model="postData"
                            ref="myQuillEditor"
                            :options=editorOption
                        />
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
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { setInterval } from 'timers';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor';
import  imageResize from 'quill-image-resize-vue';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register("modules/imageResize", imageResize);
Quill.register("modules/imageDrop", ImageDrop);


export default {
    name: 'UpdatePost',
    components: {
        "quill-editor": quillEditor
    },
    data() {
        return {
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

.ql-container{
    height: 70vh !important;
}

.custom-control-label:before{
  background-color:white;
}
.custom-switch .custom-control-input:checked~.custom-control-label::before{
  background-color:#28A745;
}
</style>
