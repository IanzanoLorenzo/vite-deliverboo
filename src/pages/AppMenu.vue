<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            store,
            axios,
            dishes: ''
        }
    },
    mounted() {
        this.getDishes(this.$route.params.slug);
    },
    methods: {
        getDishes(slug){
            axios.get(this.store.basicUrl+'api/resturants/'+slug).then((response) =>{
                this.dishes = response.data.response;
            }
            )
        }
    },
}
</script>
<template>
    <div>
        <div v-for="dish in dishes" :key="dish.id">{{ dish.name }}</div>
    </div>
</template>
<style lang="scss">
    
</style>