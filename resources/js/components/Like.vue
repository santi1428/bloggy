<template>
        <a href="#" id="botonLike" @click.prevent="like" data-toggle="tooltip" data-placement="top" :title="comprobarMeGusta.title"><i class="mr-2" :class="comprobarMeGusta.class"></i>{{ likes }} likes</a>        
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: "Like",
    props: ["id", "likes_amount"],
    data(){
        return {
            liked: false,
            likes: this.likes_amount
        }
    },
    methods: {
        like(){
            if(this.liked === false){
                this.registrarLike(this.id)
                .then(() => this.likes++)
                .catch(err => console.log(err));
            }else{
                 this.removerLike(this.id)
                .then(res => {
                    this.asignarDatosToast({msg: "Te ha dejado de gustar", clase: "bg-primary", icono: "fas fa-check-circle"});
                    this.likes--;
                })
                .catch(err => console.log(err));
            }
        },
        ...mapActions(["registrarLike", "removerLike", "asignarDatosToast"]),
    },
    computed: {
        comprobarMeGusta(){
            let res = this.getUserLikes.find(postId => {
                return postId === this.id;
            });
            if(res){
                this.liked = true;
                 return {
                    class: "fas fa-thumbs-up",
                    title: "Ya no me gusta"
                 }
            }else{
                this.liked = false;
                return {
                    class: "far fa-thumbs-up",
                    title: "Me gusta"
                 }
            }   
        },
        ...mapGetters(["getUserLikes"])
    }
}
</script>

<style scoped>
    #botonLike{
        text-decoration: none;
        font-size: 16px;
    }

    .fa-thumbs-up{
        font-size: 20px;
    }
</style>