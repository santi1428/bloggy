<template>
            <div class="col d-flex flex-column">
                    <div class="align-self-end">
                        <a class="text-primary" href="#" @click.prevent="mostrarLista=!mostrarLista">
                            <i class="fas fa-bars"></i></a>
                    </div>
                    <ul v-if="mostrarLista" v-bind:class="{'animated lightSpeedIn': mostrarLista}">
                        <li><a href="#"><i class="fas fa-reply mr-2 text-dark"></i>Ir a la publicación</a></li>
                        <li><a href="#"><i class="fas fa-edit mr-2 text-success"></i>Editar publicación</a></li>
                        <li @click.prevent="mostrarModalEliminar"><a href="#"><i class="fas fa-trash-alt mr-2 text-danger"></i>Eliminar publicación</a></li>
                    </ul>
                    <deletepost v-bind:id="postId" v-if="mostrarModal" v-on:modal-cerrado="mostrarModal = false"></deletepost>
            </div>
</template>

<script>
import DeletePost from './DeletePost';
export default {
    name: 'Option',
    components: {
        'deletepost': DeletePost
    },
    props: ['postId'],
    data(){
        return {
            mostrarLista: false,
            mostrarModal: false
    }
    },
    methods: {
        mostrarModalEliminar(){
            this.mostrarModal = true;
            
        }
    }
    }

</script>

<style scoped>
    ul{
        background: #e5e5e5;
        z-index: 5;
        position: absolute;
        top: 0%;
        left: 74%;
        border: 1px solid #d7d7d7;    
        width: 21%;
        padding: 0px;
        border-radius: 5px;
    }

    ul li{
        list-style: none;
    }

    ul li a{
        text-decoration: none;
        color: #343a40;
        display: block;
        padding-top: 10px;
        padding-bottom: 8px;    
        padding-left: 10px;
        border-bottom: 1px solid#dbdddd;
    }

    ul > :first-child a{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }  

     ul > :last-child a{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }  

    ul li a:hover{
        background: #707579;
        color: #ffff;
        transition: 0.2s;
    }


    .fa-bars{
        color: #707579;
    }


</style>
