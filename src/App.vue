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
@use './styles/generals.scss';

</style>