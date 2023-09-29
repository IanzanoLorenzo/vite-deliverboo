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

        </div>
        <div class="card-body m-4">
            <!-- ICONA TIPOLOGIA CUCINA -->
            <span v-for="type in resturant.types" :key="type.id">
                <i :class="['fas', type.icon]" class="me-5 fs-3"></i>
            </span>
            <!-- NOME RISTO. -->
            <h5 class="text-primary mt-4">
                {{ resturant.name }}
            </h5>
            <!-- VIA RISTO. -->
            <p class="card-text">
                {{ resturant.address }}
            </p>
            <!-- TIPOLOGIA RISTO. -->
            <span class="badge bg-primary me-1" v-for="type in resturant.types" :key="type.id">
            {{ type.name }}
            </span>
        </div>

    </router-link>
</template>


<style lang="scss" scoped>

    @import '../styles/_variables.scss';
    @import '../styles/generals.scss';

    .card{
        overflow: hidden;
        border: none;
        
        .img-fluid{
            height: 200px;
            object-fit: cover;
        }

        transition: all 0.5s cubic-bezier(.25,.8,.25,1);
    }

    .card:hover{
        border-top-left-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        animation-name: example;
        animation-duration: 0.25s;
        border-left: 13px solid $warning;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.505), 0 10px 10px rgba(0, 0, 0, 0.513);

    }

</style>