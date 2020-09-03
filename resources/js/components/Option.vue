<template>
            <div>
                <div class="d-flex flex-column">
                    <div class="align-self-end">
                        <a class="text-primary" href="#" @click.prevent="mostrarLista=!mostrarLista">
                            <i class="fas fa-bars"></i></a>
                    </div>
                </div>
                <ul v-if="mostrarLista" v-bind:class="{'animated lightSpeedIn': mostrarLista}" class="shadow">
                    <li> <router-link :to="{name: 'UpdatePost', params: { id }}"><i class="fas fa-edit mr-2 text-success"></i>Editar publicación</router-link></li>
                    <li @click.prevent="mostrarModalEliminarDePostId(id)"><a href="#"><i class="fas fa-trash-alt mr-2 text-danger"></i>Eliminar publicación</a></li>
                </ul>
            </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'Option',
    data(){
        return {
            mostrarLista: false
        }
    },
    props: ["id"],
    methods: {
        ...mapMutations(["mostrarModalEliminarDePostId"])
    }
}

</script>

<style scoped>
    ul{
        background: #f6f6f6;
        z-index: 1;
        position: absolute;
        top: 0%;
        right: 2%;
        border: 1px solid #d7d7d7;    
        width: 16%;
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
        border-bottom: 1px solid#e2e3e3;
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

    @media (min-width: 361px) and (max-width: 380px) {   
        ul{
            top: 0%;
            right: 5%;
            width: 45%;
            font-size: 11.4px;
          }
    }

    @media(min-width: 321px) and (max-width: 360px){
        ul{
            top: 0%;
            right: 5%;
            width: 46%;
            font-size: 11.4px;
        }
    }

    
    @media (max-width: 320px) {   
        ul{
            top: 0%;
            right: 5%;
            width: 52%;
            font-size: 11.4px;
          }
    }

    @media (min-width: 411px) and (max-width: 500px) {   
    ul{
        top: 0%;
        right: 5%;
        width: 38%;
        font-size: 11.4px;
        }
        
    }

    @media (min-width: 501px) and (max-width: 768px) {   
        ul{
            top: 0%;
            right: 3%;
            width: 20%;
            font-size: 11.4px;
        }
        
    }

    @media (min-width: 769px) and (max-width: 992px) {   
        ul{
            top: 0%;
            right: 3%;
            width: 20%;
            font-size: 11.4px;
        }
        
    }

    @media (min-width: 992px) and (max-width: 1200px) {   
        ul{
            top: 0%;
            right: 2%;
            width: 15%;
            font-size: 11.4px;
        }
        
    }

    @media(min-height: 700px) and (max-height: 780px){
        ul{
            top: 1%;
            right: 5%;
            width: 43%;
            font-size: 11.8px;
        }
    }



</style>
