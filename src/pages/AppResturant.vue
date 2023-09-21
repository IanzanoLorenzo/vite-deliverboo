<script>
import axios from 'axios';
export default {
    data() {
        return {
            axios,
            resturants: '',
            search: '',
        }
    },
    mounted() {
        console.log('ziopera');
        this.getResturants();
    },
    methods: {
        //CHIAMATA AXIOS
        getResturants(){
            axios.get('http://127.0.0.1:8000/api/resturants').then((risp) =>{
                this.resturants = risp.data.response;
            })
        },
    },
}
</script>
<template>
    <div class="row">
        <!--ALTERNATIVA AL BOTTONE SEARCH: @keyup="getResturants(search)" -->
        <div class="col-6 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" >
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" v-model="search">
        </div>
        <div v-for="resturant in resturants" :key="resturant.id">
            <h1 v-if="resturant.name.toLowerCase().includes(search.toLowerCase())">{{ resturant.name }}</h1>
        </div>
    </div>
</template>
<style lang="scss">
    
</style>