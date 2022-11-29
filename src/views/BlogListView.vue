<template>
  <div class="home mt-4">
    <BlogPostList v-model="selectTag" />
  </div>
</template>

<script setup>
import BlogPostList from '@/components/BlogPostList.vue'
import { useRoute } from 'vue-router'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

onMounted(() => {
  const route = useRoute()
  const selectTag = ref('')
  selectTag.value = route.params.tag
})
</script>

<script>
// @ is an alias to /src

export default {
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
