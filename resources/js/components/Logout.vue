<template>
    
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "Logout",
    methods: mapActions(['removerToken']),
    created(){
        this.removerToken().then(() => {
            this.$router.push({path:"/"});
        }).catch(err => console.log(err));
    }
}
</script>

<style>

</style>
