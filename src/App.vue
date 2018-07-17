<template>
  <div id="app">
    <router-view keep-alive transition transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  export default {
      name: 'app'
  };
</script>

<style>
  #app {
    font-family: 'Consolas', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  [role="button"] {
    cursor: pointer;
  }
</style>
