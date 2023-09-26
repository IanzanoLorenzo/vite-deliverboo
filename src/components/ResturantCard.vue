<script>
import { store } from '../store';
export default {
    data() {
        return {
            store
        }
    },
    props:{
        resturant: Object
    },
}
</script>

<template>
    <router-link :to="{name: 'menu',params: {slug: resturant.slug} }" class="card rounded-0 h-100 text-decoration-none" style="width: 100%;" >



        <div class="position-relative w-100"> 

            <!-- IMMAGINE RISTORANTE -->
            <img class="img-fluid w-100" v-if="resturant.cover_image === null" src="../assets/img/default-vite.png" >
    
            <!-- IMMAGINE DI DEFAULT RISTO. -->
            <img class="img-fluid w-100"   v-else :src="`${store.basicUrl}storage/${resturant.cover_image}`" >
            
            <!-- POLIGONO MALEDETTO - FORSE SI CAMBIA CON UN PNG IN ILLUSTRATOR -->
            <svg viewBox="0 0 235 25" class="absolute_svg h-25" role="img" focusable="false" preserveAspectRatio="xMinYMax slice" >
                <polygon class="" points="235 0 235 25 0 25"></polygon>
            </svg>


        </div>
        
            
           
    
        <div class="card-body m-4">
            <!-- ICONA TIPOLOGIA CUCINA -->
            <span class="in-line" v-for="type in resturant.types" :key="type.id">
                <span class="d-flex justify-content-end ">

                    <i :class="['fas', type.icon] "></i>

                </span>
                
               


            </span>

            <!-- NOME RISTO. -->
            <h5 class="text-primary">
                {{ resturant.name }}
            </h5>


            <!-- VIA RISTO. -->
            <p class="card-text">
                {{ resturant.address }}
            </p>

           


            <!-- TIPOLOGIA RISTO. -->
            <span class="badge bg-primary mx-1" v-for="type in resturant.types" :key="type.id">
             {{ type.name }}
            </span>


        </div>

    </router-link>
</template>


<style lang="scss" scoped>

    @import '../styles/_variables.scss';
    @import '../styles/generals.scss';

    .absolute_svg{
        position: absolute;
        bottom: 0%;
        left:19%;
        fill: rgb(255, 255, 255);

    }
    .absolute_poly{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        fill: rgb(255, 255, 255);
    }

    .card {
        overflow: hidden;
        border: none
        .img-fluid{
            height: 200px;
            object-fit: cover;
        }
    }




</style>