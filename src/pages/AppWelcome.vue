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
    <div class="ciccio">
        <div class="container">
            <AppResturant/>
        </div>

    </div>
</template>
<style lang="scss" scoped>
//COLOR PALETTE
$light: #dbdfe2;
$dark: #2c2c2c;
$danger: #ff0000;
$primary: #ac0a55;
$warning:  #ff8800;
@use '../styles/_variables.scss';
@use '../styles/generals.scss';

.ciccio{
    background: linear-gradient(200deg , $warning 500px, $danger 500px);
  
  background-repeat: no-repeat;
}
    
</style>