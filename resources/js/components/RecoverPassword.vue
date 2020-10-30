<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-secondary text-white text-center">Recuperacion de Contraseña</div>
          <div class="card-body">
            <input type="email" name="email" id="email" class="form-control text-center" placeholder="Ingresa aqui tu correo electrónico">
            <button class="btn btn-secondary btn-block mt-4">Recuperar Contraseña</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    name: "RecoverPassword"
}
</script>

<style scoped>
  .container{
    margin-top: 30vh;
  }
</style>