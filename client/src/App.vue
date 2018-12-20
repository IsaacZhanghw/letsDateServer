<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  beforeDestory(){
    if(!this.isEmpty(localStorage.getItem("eleToken"))){
      localStorage.removeItem("eleToken")
    }
  }
};
</script>
<style>
html,body,
#app {
  width: 100%;
  height: 100%;
}

</style>
