<script>
import axios from 'axios';
import { store } from '../store';
import ResturantCard from '../components/ResturantCard.vue';
export default {
    components:{
        ResturantCard
    },
    data() {
        return {
            store,
            axios,
            search: '',
        }
    },
    mounted() {
        this.getResturants();
    },
    methods: {
        //CHIAMATA AXIOS
        getResturants(){
           if(this.store.resturants === null || this.store.resturants === undefined){
            axios.get(this.store.basicUrl+'api/resturants').then((risp) =>{
                this.store.resturants = risp.data.response;
                console.log(this.store.resturants);
            })
           }
        },
    },
}
</script>
<template>
    <div class="row mt-5">
        <!--ALTERNATIVA AL BOTTONE SEARCH: @keyup="getResturants(search)" -->
        <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" >
            <label for="" class="form-label text-white">Cerca tra i ristoranti:</label>
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" v-model="search">
        </div>
        <div class="row">
            <div class="col-6 g-5" v-for="resturant in store.resturants" :key="resturant.id" v-show="resturant.name.toLowerCase().includes(search.toLowerCase())">
                <ResturantCard :resturant="resturant"/>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    
</style>