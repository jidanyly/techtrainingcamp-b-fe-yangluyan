<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import './assets/css/el.scss';

#app {
width:100%;
height: 100%;
min-width: 1200px;
}


</style>
