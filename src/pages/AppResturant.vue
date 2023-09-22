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
            selected_type: [],
        }
    },
    mounted() {
        try{
            this.getResturants();
        }catch(error){
            console.error('c\'è stato un problema con la chiamata api')
        }
    },
    methods: {
        // Funzione per ottenere i ristoranti tramite una chiamata Axios
        getResturants(){
            if(this.selected_type.length === 0){
                axios.get(this.store.basicUrl+'api/resturants').then((risp) =>{
                    // Memorizza i ristoranti e i tipi di ristoranti nello store
                    this.store.resturants = risp.data.response.resturants;
                    this.store.types = risp.data.response.types;
                })
            } else {
                let search =  this.selected_type.join('-');
                axios.get(this.store.basicUrl+'api/resturants/search/'+search).then((risp) =>{
                    // Memorizza i ristoranti e i tipi di ristoranti nello store
                    this.store.resturants = risp.data.response.resturants;
                    this.store.types = risp.data.response.types;
                })
            }
        },
        // Funzione per determinare se mostrare un ristorante in base alla selezione dell'utente
        // showResturant(types){
        //     let flag = true
        //     if(this.selected_type.length > 0){
        //         flag = false
        //         types.forEach(type => {
        //             if(this.selected_type.includes(type.id)){
        //                 flag = true
        //             }
        //         });
        //     }
        //     return flag
        // },
        // showResturant(types){
        //     let flag = true
        //     if(this.selected_type.length > 0){
        //         flag = false
        //         let restTypes = types.map((type) => type.id );
        //         let count = 0;
        //         this.selected_type.forEach(type => {
        //             if(restTypes.includes(type)){
        //                 count++;
        //             }
        //         })
        //         if(count === this.selected_type.length){
        //             flag = true
        //         }
        //     }
        //     return flag
        // },
    },
}
</script>
<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" >
                <div class="form-check form-check-inline" v-for="type in store.types" :key="type.id">
                    <input class="form-check-input" type="checkbox" :id="type.name+'_type'" :value="type.id" v-model="selected_type">
                    <label class="form-check-label" :for="type.name+'_type'">{{ type.name }}</label>
                </div>
                <button class="btn btn-primary" @click="getResturants()">Filtra</button>
            </div>
            <div class="row">
                <!-- Iterazione sui ristoranti e visualizzazione del componente ResturantCard -->
                <div class="col-6 g-5" v-for="resturant in store.resturants" :key="resturant.id">
                    <ResturantCard :resturant="resturant"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    
</style>
