<template>
    <div class="input-group mb-4">
        <div class="input-group-prepend">
        <div class="input-group-text text-white bg-dark"><i class="fas fa-filter mr-2"></i>Filtrar por</div>
        </div>
        <select class="custom-select" v-model="filtro">
            <option value="0">Mas recientes</option>
            <option value="1">Mas antiguos</option>
            <option value="2">Likes</option>
            <option value="3">Comentarios</option>
        </select>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    name: "Filtrar",
    data(){
        return {
            filtro: null
        }
    },
    methods: {
        ...mapMutations(["asignarFiltro"]),
    },
    computed: {
        ...mapGetters(["getFiltro"])
    },
    watch: {
        filtro(val){
            console.log(val);
            this.asignarFiltro(parseInt(val));
            this.$emit('filtro-cambiado');
        }
    },
    mounted(){
        this.filtro = this.getFiltro.toString();
    }
}
</script>

<style scoped>

</style>