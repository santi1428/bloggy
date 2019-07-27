<template>
     <div class="modal animated fadeIn" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header px-3 py-2 bg-dark border border-dark">
                        <div class="w-100 text-center">
                            <h5 id="texto-encabezado" class="text-white m-0">Contraseña requerida</h5>
                        </div>
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal" :disabled="button===1">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row mt-2">
                                <div class="col">
                                    <input type="password" name="password" id="password" class="form-control text-center" placeholder="Ingrese su contraseña">
                                </div>
                            </div>
                            <div class="row mt-4 justify-content-center">
                                <div class="col">
                                    <button class="btn btn-dark btn-block">Cancelar</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-block btn-success">Actualizar</button>                                     
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
    name: "UpdateProfile",
    mounted(){
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        });        
    }
}
</script>

<style>
#texto-encabezado{
    font-size: 16px;    
}

</style>
