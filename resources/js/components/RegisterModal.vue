<template>
<div class="modal" tabindex="-1" role="dialog" id="myModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-body">
        <div class="container-fluid">
        <button  @click="redirectToLogin" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="row">
          <div class="col-auto" v-if="modalData.state === false"><img src="/img/wrong.png" alt="Error" height="100px" width="100px"></div>
          <div class="col-auto" v-if="modalData.state === true"><img src="/img/correct.png" alt="Registrado exitosamente" height="80px" width="80px"></div>
            <div class="col text-justify pt-3">
                <h2 :class="{'text-success': modalData.state, 'text-danger': !modalData.state}">{{ modalData.title }}</h2>
            </div> 
        </div>
        <div class="row">
            <div class="col text-center">
                <p>{{ modalData.body }}</p>
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
