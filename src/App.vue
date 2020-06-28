<template>
  <div id="app">
    <app-header></app-header>
    <div id="container">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<style lang="css" src="./assets/css/base.css"></style>
<script>
import AppHeader from "./components/header/main.vue";
import AppFooter from "./components/footer/main.vue";
import store from "./store";

export default {
  name: 'App',
  store,
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
