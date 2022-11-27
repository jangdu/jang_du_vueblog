<template>
  <div class="post-body">
    <div class="post-head">
      <div class="post-info">
        <h1>{{nowDb.title}}</h1>
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
        <div class="output" v-html="output"></div>
      </div>
    </div>
    <div class="div-bar"></div>
    <div class="d-flex post-bottom">
      <div class="p-2 flex-fill btn btn-outline-dark left-btn"  @click="onClickbeforePost">
        <span style="font-size: 0.8rem; margin-bottom: 0.5rem;">이전 글</span>
        <h4>이전 글 제목</h4>
      </div>
      <div class="p-2 flex-fill btn btn-outline-dark right-btn" @click="router.push('post/' + Number(nowDbIndex) + 1)">
        <span style="font-size: 0.8rem; margin-bottom: 0.5rem;">다음 글</span>
        <h4>다음 글 제목</h4>
      </div>
    </div>
    <div class="comment-div">
      <h4 class="comment-head">2개의 댓글</h4>
      <div class="comment-body">
        <div class="comment-input">
          <textarea class="comment-text" placeholder="댓글을 입력하세요"></textarea>
          <div class="comment-button">
            <button class="btn btn-outline-dark">댓글 작성</button>
          </div>
        </div>
        <div>
          <div class="comment-list">
            <div v-for="item in 3" :key="item" class="commnet">
              <div class="commnet-top">
                <div class="commnet-info">
                  <span class="post-name">jang_du</span>
                  <span>2022.12.12</span>
                </div>
                <div class="head-btns">
                  <button class="head-btn">수정</button>
                  <button class="head-btn">삭제</button>
                </div>
              </div>
              <div class="commnet-content">
                <div>
                  <p>aaaaaanvkndvkalsnn;a</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
const nowDbIndex = route.params.id
store.state.nowPost = store.state.postDb[nowDbIndex]
const nowDb = store.state.nowPost
console.log(nowDbIndex)

const output = marked(nowDb.content)
const onClickbeforePost = () => {
  router.push('post/' + (Number(nowDbIndex) - 1))
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
  mounted () {
  },
  unmounted () {},
  methods: {
  }
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
  height: 4rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex: 1 1 0%;
  align-items: center;
}
.left-btn{
  text-align: left;
  margin-right: 2rem;
  flex-direction: column;
  line-height: 1;
  display: flex;
  flex: 1 1 0%;
  align-items: flex-start;
  padding: 2rem;
  border: 1px solid rgb(138, 138, 138, .5);
}
.right-btn{
  margin-left: 2rem;
  text-align: right;
  padding-right: 3rem;
  flex-direction: column;
  line-height: 1;
  display: flex;
  flex: 1 1 0%;
  align-items: flex-end;
  padding: 2rem;
  border: 0.5px solid rgb(138, 138, 138, .5);
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

.comment-div{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;
}
.comment-input{
  margin-bottom: 5rem;
}
.comment-button{
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
}
.comment-text{
  resize: none;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-height: 7rem;
  outline: none;
  border: 1px solid rgb(138, 138, 138, .5);
  margin-bottom: 2rem;
  font-size: 1rem;
  width: 100%;
  line-height: 2;
  background: rgb(255, 247, 232);
}
.commnet{
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid rgb(165, 165, 165, .6);
}
.commnet-top{
  margin-bottom: 1.8rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
}
.comment-info{
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.commnet-content{
  font-size: 1.2rem;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: break-word;
}
</style>
