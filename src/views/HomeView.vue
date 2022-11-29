<template>
  <div class="home mt-4">
    <button @click="$router.push('/list/all')">List</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
<style scoped>
.home{
  width: 80%;
  margin: 0 auto;
}
</style>
