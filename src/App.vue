<script>
import {store} from './store';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
export default {
  components: {
    AppFooter,
    AppHeader
  },
  data() {
    return {
      store
    }
  },
}
</script>
<template>
  
    <AppHeader/>
    <router-view></router-view>
    <AppFooter/>
  
</template>
<style lang="scss">
@import './styles/_variables.scss';
@import './styles/generals.scss';

body{
  background: linear-gradient(200deg , $warning 500px, $danger 500px);
  font-family: 'Montserrat', sans-serif;
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative;
}
</style>