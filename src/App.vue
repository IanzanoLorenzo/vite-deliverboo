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
  <div>
    <AppHeader/>
    <router-view></router-view>
    <AppFooter/>
  </div>
</template>
<style lang="scss">
$dark: rgb(20, 20, 20);
$danger: #ff0000;
$primary: #ac0a55;
$warning:  #ff8800;
@use './styles/generals.scss';

body{
  background: linear-gradient(20deg , $danger  60%, $warning 60%);
  font-family: 'Montserrat', sans-serif;
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative;
}
</style>