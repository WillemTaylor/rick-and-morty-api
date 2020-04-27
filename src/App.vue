<template>
  <div id="app">
    <Characters />
  </div>
</template>

<script>
import Characters from "./components/characters.vue";

export default {
  name: "App",
  components: {
    Characters
  }
};
</script>

<style lang="scss">
@import "./assets/styles.scss";
</style>
