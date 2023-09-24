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
        <img v-if="resturant.cover_image === null" src="../assets/img/default-vite.png" class="img-fluid">
        <img v-else :src="`${store.basicUrl}storage/${resturant.cover_image}`" class="img-fluid">
        <div class="card-body">
            <h5 class="card-title">{{ resturant.name }}</h5>
            <p class="card-text d-none d-md-block">
                {{ resturant.address }}
            </p>
            <span class="badge bg-primary mx-1" v-for="type in resturant.types" :key="type.id">
             {{ type.name }}
            </span>
        </div>
    </router-link>
</template>
<style lang="scss" scoped>
.card {
    overflow: hidden;
    border-radius: 15px !important;
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