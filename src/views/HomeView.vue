<template>
  <div class="home mt-4">
    <BlogPostList/>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogPostList from '@/components/BlogPostList.vue'

export default {
  name: 'HomeView',
  components: {
    BlogPostList
  }
}
</script>
<style scoped>
.home{
  width: 80%;
  margin: 0 auto;
}
</style>
