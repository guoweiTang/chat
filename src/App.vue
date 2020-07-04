<template>
  <div id="app">
    <app-header></app-header>
    <div id="container">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<style lang="less" src="./assets/css/base.less"></style>
<style lang="css" src="./assets/css/font.css"></style>
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
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#container{
  height: 80%;
  border: 1px solid #dedede;
  box-sizing: border-box;
  width: 9.38rem;
  background-color: #fff;
  margin: 0 auto;
  /* padding: .63rem 0; */
  overflow-y: scroll;
}
</style>
