<template>
  <div>
    <div class="flex-shrink-0 p-3 bg-white" style="width: 150px;">
      <a class="d-flex align-items-center pb-1 mb-1 link-dark text-decoration-none border-bottom">
        <p>태그 목록</p>
      </a>
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <button class="btn btn-toggle align-items-center rounded">Home</button>
          <button class="btn btn-toggle align-items-center rounded">javascript</button>
          <button class="btn btn-toggle align-items-center rounded">html/css</button>
          <button class="btn btn-toggle align-items-center rounded">ES6</button>
          <button class="btn btn-toggle align-items-center rounded">typescript</button>
          <button class="btn btn-toggle align-items-center rounded">node.js</button>
          <button class="btn btn-toggle align-items-center rounded">react</button>
          <button class="btn btn-toggle align-items-center rounded">vue.js</button>
          <button class="btn btn-toggle align-items-center rounded">github</button>
          <button class="btn btn-toggle align-items-center rounded">about</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
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
