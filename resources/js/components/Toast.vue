<template>
    <div class="toast shadow-lg rounded" id="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2500">
        <div class="toast-body text-center text-white" :class="[getClaseToast]" id="mensajeToast">
            <i class="mr-2" :class="[getIconoToast]"></i>{{getMensajeToast}}
        </div>
    </div> 
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "Toast",
    computed: {
        ...mapGetters(["getMensajeToast", "getClaseToast", "getIconoToast"]),
    }
}
</script>
<style>
    #toast{
        position: fixed;
        z-index: 1000;
        width: auto;
        top: 85vh;
        right: 25vh;
    }

    #mensajeToast{
        font-size: 15px;
    }

    .fade {
      transition: opacity 0.3s linear !important;
      
    }   


     @media (max-width: 412px) {   
        #toast{
            position: fixed;
            z-index: 1000;
            width: 60vw;
            top: 85vh;
            left: 20vw;
        }
    }

     @media(min-width: 321px) and (max-width: 360px){
        #toast{
            position: fixed;
            z-index: 1000;
            width: 60vw;
            top: 85vh;
            left: 20vw;
        }
    }


</style>