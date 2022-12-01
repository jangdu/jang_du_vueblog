<template>
  <div class="add-post">
    <div class="add-post-body">
      <div class="add-post-write">
        <div class="write-head">
          <div class="write-info">
            <textarea class="write-Title" placeholder="제목을 입력하세요" v-model="newPost.title"/>
            <div class="div-bar"></div>
            <div class="select-tag">
              <select class="form-select form-select-sm mb-2" style="width: 7rem;" v-model="newtag" aria-label=".form-select-sm example">
                <option selected>태그 선택</option>
                <option v-for="item in $store.state.tagPost" :value="item.tag" :key="item">{{item.tag}}</option>
              </select>
            </div>
            <div class="button-bar">
              <button class="btn btn-outline-dark write-btn">T</button>
              <button class="btn btn-outline-dark write-btn">T</button>
            </div>
          </div>
        </div>
        <div class="write-body">
          <div class="editor">
            <textarea class="input" v-model="newPost.content" placeholder="내용을 입력하세요" @input="update"></textarea>
            <div class="output" v-html="output"></div>
          </div>
        </div>
      </div>
      <div class="write-nav bottom-0">
        <div class="nav-button-bar">
          <button class="btn btn-outline-dark" @click="$router.go(-1)">Back</button>
          <button class="btn btn-outline-dark" @click="addTodo">Uplode</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// imports
import { marked } from 'marked'
import { debounce } from 'lodash'
import { ref, computed } from 'vue'
import { db } from '../firebase/index.js'
import { collection, addDoc } from 'firebase/firestore'

const blogPostsCollectionRef = collection(db, 'blog-post')
// const blogPostsCollectionQuery = query(blogPostsCollectionRef, orderBy('date', 'desc'))

const newPost = ref({
  title: '',
  tag: '',
  content: ''
})
const newtag = ref('')
const output = computed(() => marked(newPost.value.content))

const update = debounce((e) => {
  newPost.value.content = e.target.value
}, 100)

const addTodo = () => {
  addDoc(blogPostsCollectionRef, {
    content: newPost.value.content,
    title: newPost.value.title,
    date: Date(),
    tag: newtag.value
  })
  newPost.value = {
    title: '',
    tag: '',
    content: ''
  }
}
</script>

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
<style scoped>
.add-post{
  max-width: 750px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
}
.add-post-body{
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1 1 0%;
  flex-direction: column;
  position: relative;
}
* {
  box-sizing: inherit;
}
.add-post-write{
  display: flex;
  padding-bottom: 4.2rem;
  flex: 1 1 0%;
  flex-direction: column;
}
.write-head{
  max-height: 650px;
}
.write-info{
  padding: 1rem;
}
.write-Title{
  max-width: 700px;
  font-size: 1.8rem;
  display: block;
  width: 100%;
  height: 50px;
  line-height: 1.5;
  padding: 0;
  resize: none;
  font-weight: bold;
  outline: none;
  border: none;
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
.select-tag{
  display: flex;
  flex-wrap: wrap;
}
.tags{
  height: 1.5rem;
  font-size: 1rem;
  border-radius: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: blanchedalmond;
}
.input-tag{
  border: none;
  outline: none;
  cursor: text;
  margin-bottom: 1rem;
  display: inline-flex;
  line-height: 1.5rem;
  font-size: 1rem;
}
.button-bar{
  flex-wrap: wrap;
  padding: 1;
  align-items: center;
  width: auto;
  margin-bottom: 1rem;
}
.write-btn{
  margin-left: 0.5rem;
  justify-content: center;
  cursor: pointer;
}

.write-body{
  flex: 1 1 0%;
  min-height: 0px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.editor {
  height: 100%;
  display: flex;
}
.input,
.output {
  overflow: auto;
  font-size: 1rem;
  min-height: 0px;
  line-height: 1.5rem;
  width: 50%;
  height: 58vh;
  position: relative;
  box-sizing: inherit;
  flex: 1 1 0%;
}
.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
.output {
  background-color: #f6f6f6;
}
code {
  color: rgb(255, 77, 77);
  background-color: aqua;
}

.write-nav{
  position: fixed;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  width: 80%;
}
.nav-button-bar{
  height: 6rem;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
}

</style>
