<template>
<div class="container-xxl bd-gutter mt-3 my-md-4 bd-layout" style="min-width: 500px;">
  <div class="position-relative" style="height: 8rem;">
    <h1 class="position-absolute top-50 start-50 translate-middle head-title">Jangdu Blog</h1>
  </div>
  <div class="blog-body">
    <aside class="d-none d-xl-block d-xxl-block side-bar left-body" style="">
      <BlogCategorize />
    </aside>
    <div class="app-body container-sm">
      <router-view/>
    </div>
  </div>
</div>
</template>
<script setup>
import BlogCategorize from './components/BlogCategorize.vue'

</script>
<script>
export default {
  components: {
    BlogCategorize
  },
  data () {
    return {
      sampleData: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>
<style scoped>
.blog-body{
  display: flex; margin-left: auto; margin-right: auto;
}
.div-bar{
  background-color: gray;
  border-radius: 1rem;
  box-sizing: inherit;
  height: 0.5rem;
  width: 5rem;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.left-body{
  margin-top: 10rem;
  position: fixed;
}
.app-body{
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
.head-title{
  cursor: pointer;
}
</style>
