<template>
  <div class="home">
    <BlogProfile/>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogProfile from '@/components/BlogProfile.vue'

export default {
  name: 'HomeView',
  components: {
    BlogProfile
  }
}
</script>
