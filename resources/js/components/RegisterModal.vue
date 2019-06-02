<template>
<div class="modal animated fadeIn" tabindex="-1" role="dialog" id="myModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div v-if="modalData.state === true" class="modal-header px-3 py-2 bg-success border border-success">
            <div class="w-100 text-center">
                <h5 class="text-white m-0">Registro Exitoso!</h5>
            </div>
            <button  @click="redirectToLogin" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="text-white">&times;</span>
            </button>
        </div>
        <div v-else class="modal-header px-3 py-2 bg-danger border border-danger">
            <div class="w-100 text-center">
                <h5 class="text-white m-0">Error de registro</h5>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="text-white">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <div class="container-fluid">
        <div class="row">
          <div class="col-auto  text-danger" v-if="modalData.state === false"><i class="fas fa-times-circle fa-5x"></i></div>
          <div class="col-auto  text-success" v-if="modalData.state === true"><i class="fas fa-check-circle fa-5x"></i></div>
            <div class="col align-self-end">
                <h5 class="mt-1 text-center" :class="{'text-success': modalData.state, 'text-danger': !modalData.state, 'd-none': modalData.state}">{{ modalData.title }}</h5>
                <p class="text-justify">{{ modalData.body }}</p>
            </div> 
        </div>
    </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "RegisterModal",
props: ["modalData"],
methods: {
    redirectToLogin(){
          if(this.modalData.state === true){
            this.$router.push({path:"login"});
          }
    }
},
    mounted(){
            $('#myModal').modal({
             backdrop: 'static',
             keyboard: false
            });        
    }
}
</script>

<style>

</style>
