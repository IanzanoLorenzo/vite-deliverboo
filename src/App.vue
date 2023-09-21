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
    <div class="container">
      <router-view></router-view>
    </div>
    <AppFooter/>
  </div>
</template>
<style lang="scss">
@use './styles/generals.scss';

body{
  background: linear-gradient(20deg , #ff0000  60%, #ff8800 60%);
  font-family: 'Montserrat', sans-serif;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>