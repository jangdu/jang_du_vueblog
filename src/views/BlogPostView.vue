<template>
  <div class="post-body">
    <div class="post-head">
      <div class="post-info">
        <h1>Title</h1>
        <div class="head-btns">
          <button class="head-btn">수정</button>
          <button class="head-btn">삭제</button>
        </div>
        <div class="post-information">
          <span class="post-name">jang_du</span>
          <span>2022.12.12</span>
        </div>
        <div class="post-tag">
          <div class="tags">aaa</div>
        </div>
      </div>
    </div>
    <div class="div-bar"></div>
    <div class="post">
      <div class="post-content">
        <div class="output" v-html="`aaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>a`"></div>
      </div>
    </div>
    <div class="div-bar"></div>
    <div class="d-flex post-bottom">
      <div class="p-2 flex-fill btn left-btn">이전포스트</div>
      <div class="p-2 flex-fill btn right-btn">다음포스트</div>
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
<style scoped>
.post-body{
  margin-top: 5rem;
  max-width: 750px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.post-head{
  width: 100%;
}
.post-info{
  box-sizing: inherit;
}
.post-tag{
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
*{
  box-sizing: inherit;
}
.head-btns{
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-bottom: -1.25rem;
}
.head-btn{
  cursor: pointer;
  color: gray;
  background: none;
  outline: none;
  border: none;
  margin: 5px;
}
.post-information{
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.post-name{
  font-size: 1rem;
  color: black;
  font-weight: bold;
  margin-right: 1rem;
}

.post{
  width: 100%;
  margin: 5rem auto 0px;
}
.post-content{
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.7;
  letter-spacing: -0.004em;
}

.post-bottom{
  margin-top: 10rem;
  margin-bottom: 5rem;
  width: 100%;
  height: 3.5rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
}
.left-btn{
  text-align: left;
  padding-left: 3rem;
  background-color: rgb(226, 226, 226);
  margin-right: 2rem;
}
.right-btn{
  background-color: rgb(226, 226, 226);
  margin-left: 2rem;
  text-align: right;
  padding-right: 3rem;
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
</style>
