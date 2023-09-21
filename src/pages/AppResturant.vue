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
            search: 0,
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
                this.store.resturants = risp.data.response.resturants;
                this.store.types = risp.data.response.types;
                console.log(risp.data);

            })
           }
        },
        showResturant(types){
            if(this.search !== 0){
                let flag = false
                types.forEach(type => {
                    if(type.id == this.search){
                        flag = true
                    }
                });
                return flag
            }else{
                return true
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
            <select name="" id="" v-model="search">
                <option value="0">Nessun tipo</option>
                <option v-for="type in store.types" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
        </div>
        <div class="row">
            <div class="col-6 g-5" v-for="resturant in store.resturants" :key="resturant.id" v-show="showResturant(resturant.types)">
                <ResturantCard :resturant="resturant"/>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    
</style>