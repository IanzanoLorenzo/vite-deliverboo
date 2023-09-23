<script>
import { store } from '../store';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppResturant from '../components/AppResturant.vue';

export default {
    name: 'AppWelcome',
    components:{
        AppJumbotron,
        AppResturant,
    },
    data() {
        return {
            store,
        }
    },
}
</script>
<template>
    <AppJumbotron/>
    <div class="container">

        <AppResturant/>
        
    </div>
</template>
<style lang="scss" scoped>
    
</style>