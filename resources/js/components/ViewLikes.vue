<template>
        <a href="#" @click.prevent id="botonLike"><i class="far fa-thumbs-up mr-2"></i>{{ likes }} likes</a>        
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: "ViewLikes",
    props: ["likes_amount"],
    data(){
        return {
            likes: this.likes_amount
        }
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
        font-size: 16px;
        cursor: default;
    }


    .fa-thumbs-up{
        font-size: 20px;
    }

</style>