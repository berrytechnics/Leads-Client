<template>
  <div id="loading">
    <img
      class="img"
      src="../assets/loading.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script>
export default {
  name: "LoadingComponent"
};
</script>
<style>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
}
</style>