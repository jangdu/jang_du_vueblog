<template>
<div class="container-xxl bd-gutter mt-3 my-md-4 bd-layout">
  <div style="max-width: 80%; margin: 0 auto;">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" style="font-size: 2.5rem; cursor: pointer;" @click="$router.push('/')">jangdu_Blog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" style="cursor: pointer;" @click="$router.push('/write')">글쓰기</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="blog-body">
    <aside class="side-bar left-body" style="">
      <BlogCategorize />
    </aside>
    <div class="app-body">
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
  width: 80%;
  margin: 0 auto;
}
</style>
