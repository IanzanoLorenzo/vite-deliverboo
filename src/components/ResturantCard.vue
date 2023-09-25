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
    <router-link :to="{name: 'menu',params: {slug: resturant.slug} }" class="card" style="width: 100%;" >



        <div class="position-relative"> 

            <!-- IMMAGINE RISTORANTE -->
            <img class="absolute_img" v-if="resturant.cover_image === null" src="../assets/img/default-vite.png">
    
            <!-- IMMAGINE DI DEFAULT RISTO. -->
            <img v-else :src="`${store.basicUrl}storage/${resturant.cover_image}`" class="img-fluid">
            
            <svg  class="absolute_svg" role="img" focusable="false" preserveAspectRatio="xMinYMax slice" >
                <polygon class="" points="235 0 235 25 0 25"></polygon>
            </svg>


        </div>
        
            
           
    
        <div class="card-body">

            
            <!-- NOME RISTO. -->
            <h5 class="card-title">{{ resturant.name }}</h5>

            <!-- VIA RISTO. -->
            <p class="card-text d-none d-md-block">
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

    .absolute_poly{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .absolute_img{
        position:relative;
        left:0px;
        right:0px;
        width: 100%;
        height: 100%;
    }

    .absolute_svg{
       position: relative;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .card {
        overflow: hidden;
        .img-fluid{
            height: 200px;
            object-fit: cover;
        }

        p.card-text{
            height: 100px;
            overflow: hidden;
        }

        h5.card-title{
            height: 40px;
            overflow: hidden;
        }
    }




</style>