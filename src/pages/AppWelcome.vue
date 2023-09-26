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
    <div class="bg_body">
        <div class="container">
            <AppResturant/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/generals.scss';

.bg_body{
    background: linear-gradient(200deg , $warning 900px, $danger 900px);
    background-repeat: no-repeat;
}
    
</style>