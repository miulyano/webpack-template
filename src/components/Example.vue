<template>
  <section>
    <div class="container">
      <h1>Message: {{ message }}</h1>
      <img src="/assets/img/bird.png" alt>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: null
    };
  },
  created() {
    this.message = this.$store.getters.getMessage;
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
img {
  width: 100%;
  max-width: 100%;
}
</style>
