<template>
        <a href="#" id="botonLike" @click.prevent="like" data-toggle="tooltip" data-placement="top"><i class="mr-2" :class="comprobarMeGusta.class"></i>{{comprobarMeGusta.msg}}</a>
        
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: "Like",
    props: ["id"],
    data(){
        return {
            liked: false
        }
    },
    methods: {
        like(){
            if(this.liked === false){
                this.registrarLike(this.id)
                .catch(err => console.log(err));
            }else{
                 this.removerLike(this.id)
                .then(res => {
                    this.asignarDatosToast({msg: "Te ha dejado de gustar", clase: "bg-primary", icono: "fas fa-check-circle"});
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
                     msg: "Te gusta esta publicación"
                 }
            }else{
                this.liked = false;
                return {
                     class: "far fa-thumbs-up",
                     msg: "Me gusta"
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