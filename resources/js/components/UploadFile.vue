<template>
    <div class="row justify-content-center">
        <div class="col text-center" id="image-container">
            <form enctype="multipart/form-data">
                <img :src="user.imageUrl" alt="imagen de usuario no disponible" @mouseover="showImageHover = true" @mouseleave="showImageHover = false" @click="mostrarVentanaSeleccionar">
                <h5 id="text-image" v-if="showImageHover">cambiar foto</h5>
                <div v-if="progressBar" class="progress mt-2">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="{'width':progressBarWidth + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ progressBarWidth + '%' }}</div>
                </div>
                <input type="file" ref="file" id="selectImage" @change="seleccionarImagen" accept="image/*">
            </form>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name: "UploadFile",
    data(){
        return {
            showImageHover: false,
            user: {
                imageUrl: null,
                image: null
            },
            progressBar: false,
            progressBarWidth: 0
        }
    },
    methods: {
        mostrarVentanaSeleccionar(){
            this.$refs.file.click();
        },
        seleccionarImagen(){
            this.progressBarWidth = 0;
            this.progressBar = true;
            this.user.image = this.$refs.file.files[0];
            const formData = new FormData();
            formData.append("image", this.user.image);
            axios.post("/uploadprofileimage", formData,
             { 
                onUploadProgress: progressEvent => {
                    console.log(progressEvent.loaded);
                    this.progressBarWidth = Math.round((progressEvent.loaded * 100)/progressEvent.total);
                }
            })
            .then(res => {
                this.asignarUsuarioImagen(res.data.imageName);
                localStorage.setItem("user_image", res.data.imageName);
                this.user.imageUrl = `/storage/profile_images/${res.data.imageName}`;
                if(this.progressBarWidth === 100){
                    setTimeout(() => {
                        this.progressBar = false;
                    }, 3000);
                }
            })
            .catch(err => {
                if(this.progressBarWidth === 100){
                    setTimeout(() => {
                        this.progressBar = false;
                    }, 3000);
                }
            }); 
        },
        ...mapMutations(["asignarUsuarioImagen"])
    },
    created(){
        this.user.imageUrl =  `/storage/profile_images/${this.getUserImage}`;
    },
    computed: {
        ...mapGetters(["getUserImage"])
    }
}
</script>

<style scoped>
#selectImage {
    display: none;
}


img{
    cursor: pointer;
}


#text-image{
    display: block;
    margin-top: 5px;
    color: #343a40;
    font-size: 12px;
    font-weight: bold;

}

img{
    border-radius: 100%;
    height: 111.58px;
    width: 115px;
}
</style>
