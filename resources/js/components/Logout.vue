<template>
    
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "Logout",
    methods: mapActions(['removerUsuario']),
    created(){
        this.removerUsuario().then(() => {
            this.$router.push({path:"/"});
        }).catch(err => console.log(err));
    }
}
</script>

<style>

</style>
