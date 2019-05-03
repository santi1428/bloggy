<template>
    <div id="contenedor">
        <title>Inicio</title>
        <div class="row encabezado">
            <div class="col-12">
                <h1 class="display-4 mt-3 text-center text-secondary">Bienvenido a la web del blogger</h1>
                <p class="text-center" id="texto-encabezado">Si eres un blogger o te gusta mucho compartir tus ideas o experiencias de tu vida, llegaste al sitio indicado</p>
                <div class="text-center mt-2">
                    <router-link :to="{name: 'Posts'}" id="boton-publicaciones">Ir a las publicaciones</router-link>
                </div>
                    <br>
                    <div class="row">
                        <div class="col-3 text-center ml-5">
                              <p id="texto-bloggy">En Bloggy puedes: </p>  
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <div class="col-3 text-center box pt-3 px-4 animated zoomIn">
                            <i class="fas fa-pencil-alt fa-7x text-success"></i>
                            <h3 class="mt-3">Publicar y compartir tus experiencias</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, aliquid.
                            </p>
                        </div>
                        <div class="col-3 text-center box pt-3 px-4 animated zoomIn">
                            <i class="fas fa-thumbs-up fa-7x text-primary"></i>
                            <h3 class="mt-3">Dar like a tus publicaciones favoritas</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, aliquid.
                            </p>
                        </div>
                        <div class="col-3 text-center box pt-3 px-4 animated zoomIn">
                            <i class="fas fa-comments fa-7x text-info"></i>
                            <h3 class="mt-3">Comentar tus opiniones en los comentarios</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, aliquid.
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped>
    #contenedor{
        font-family: 'Nunito', sans-serif;
        overflow-x: hidden;
    }

    .encabezado{
        height: 91vh;
    }

    #texto-encabezado, .box p{
        font-size: 1.2rem;
    }    

    #texto-bloggy{
        font-size: 1.6rem;
        color:#616970
    }
    .box{
        border: 1px solid#abbdbe;
        border-radius: 8px;
        text-align: justify;
        transition: 0.3s;
    }

    .box:hover{
        transition: 0.3s;
        color: #ffff;
        border: 1px solid #2d5b5e;
        background: #2d5b5e;
    }

    #boton-publicaciones{
        text-decoration: none;
        color: #ffff;
        background: #2d5b5e; 
        padding: 10px 27px;       
        border-radius: 15px;
        font-size: 1.1rem;
        transition: 0.3s;
    }

    #boton-publicaciones:hover{
        background: #285154;
        color: #e5e5e5;
        font-size: 18px;
        transition: 0.3s;
    }

</style>


