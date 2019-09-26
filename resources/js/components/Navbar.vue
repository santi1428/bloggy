<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark p-0">
        <router-link :to="'/'" class="navbar-brand ml-3 ml-md-5"><i class="fas fa-blog mr-2"></i>TheBloggyWeb</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link :to="{name: 'Posts'}" class="nav-item nav-link py-3 ml-md-5 px-4 active"><i class="fas fa-list-ul mr-2"></i>Publicaciones</router-link>
            </div>
            <div class="navbar-nav ml-auto ">
                <router-link v-if="!loggedIn" :to="{name: 'Login'}" class="nav-item nav-link py-3 mr-0 mr-md-3 mr-lg-5 px-4 active"><i class="fas fa-sign-in-alt mr-2"></i>Iniciar Sesión</router-link>
                <router-link v-if="!loggedIn" :to="{name: 'Register'}" class="nav-item nav-link py-3 mr-0 mr-md-3 mr-lg-5 px-4 active"><i class="fas fa-user-plus mr-2"></i>Registrarse</router-link>
                <div class="dropdown text-center">
                    <a v-if="loggedIn" class=" nav-link py-3 mr-0 mr-md-5 px-4 active dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img :src="'/storage/profile_images/' + getUserImage" class="mr-2">{{ getUserName }}</a>
                    <div class="dropdown-menu py-0 m-0" aria-labelledby="dropdownMenuLink">
                        <router-link v-if="loggedIn" :to="{name: 'Profile'}" class="dropdown-item menu-link bg-dark py-2 text-white" href="#" role="button" id="dropdownMenuLink" ><i class="fas fa-user-alt mr-2"></i>Mi perfil</router-link>
                        <router-link :to="{name: 'MyPosts'}" class="dropdown-item menu-link bg-dark py-2 text-white"><i class="fas fa-list-ul mr-2"></i>Mis Publicaciones</router-link>
                    </div>
                </div>             
                <router-link v-if="loggedIn" :to="{name: 'Logout'}" class="nav-item nav-link py-3 mr-0 mr-md-5 px-4 active"><i class="fas fa-sign-out-alt mr-2"></i>Cerrar Sesión</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name:"Navbar",
    computed: mapGetters(['loggedIn', 'getUserImage', 'getUserName'])
}
</script>

<style scoped>

 nav .collapse .navbar-nav .router-link-active,
 nav .collapse .navbar-nav .router-link-exact-active {
   cursor: pointer;
   background: #5C6166;
 }

 .nav-item{
     transition: 0.3s;
 }

 .navbar-brand{
     transition: 0.3s;
 }
 .nav-item:hover{
      transition: 0.3s;
      font-size: 14.6px;
  } 

  .navbar-brand:hover{
      transition: 0.3s;
      font-size: 18.1px;  
  }

  img{
      border-radius: 100%;
      height: 20px;
      width: 20px;
  }

  .menu-link{
      /* background: brown;
      padding-top: 8px;
      padding-bottom: 8px; */
      /* width: 20px; */
  } 

  .dropdown-menu{
      width: 255px !important;
      border: none;
  }
</style>
