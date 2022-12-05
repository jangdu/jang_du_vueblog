<template>
  <div class="post-body">
    <div class="post-head">
      <div class="post-info">
        <h1>{{nowDb.title}}</h1>
        <div class="head-btns">
          <button class="head-btn" @click="onClickUpdatePostBtn(nowDb.id)">수정</button>
          <button class="head-btn" @click="onClickDelPostBtn(nowDb.id)">삭제</button>
        </div>
        <div class="post-information">
          <span class="post-name">jang_du</span>
          <span>{{yyyyMMdd(nowDb.date)}}</span>
        </div>
        <div class="post-tag">
          <div class="tags">{{nowDb.tag}}</div>
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
      <div class="p-2 flex-fill btn btn-outline-dark right-btn" @click="router.push('/post/' + (Number(nowDbIndex) + 1))">
        <span style="font-size: 0.8rem; margin-bottom: 0.5rem;">다음 글</span>
        <h4>다음 글 제목</h4>
      </div>
    </div>
    <div class="comment-div">
      <h4 class="comment-head">{{nowDb.commentLength}}개의 댓글</h4>
      <div class="comment-body">
        <div class="comment-input">
          <textarea class="comment-text" placeholder="댓글을 입력하세요" v-model="newComment.content"></textarea>
          <div class="comment-button">
            <button @click="onClickAddCommentBtn(nowDbIndex)" class="btn btn-outline-dark">댓글 작성</button>
          </div>
        </div>
        <div>
          <div class="comment-list">
            <div v-for="item in nowDb.commentDb" :key="item" class="commnet">
              <div class="commnet-top">
                <div class="commnet-info">
                  <span class="post-name">{{item.name}}</span>
                  <span>{{yyyyMMdd(item.date)}}</span>
                </div>
                <div class="head-btns">
                  <button class="head-btn">수정</button>
                  <button class="head-btn">삭제</button>
                </div>
              </div>
              <div class="commnet-content">
                <div>
                  <p>{{item.content}}</p>
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
import { onMounted, ref, watch } from '@vue/runtime-core'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from '@firebase/firestore'
import { db } from '../firebase'

// refs
const nowDb = ref({})
const output = ref('')
const newComment = ref({
  content: '',
  name: 'jang',
  date: '0000.0'
})
const nowDbIndex = ref(0)
const commentLength = ref(0)

// router
const route = useRoute()
const router = useRouter()
nowDbIndex.value = Number(route.params.id)

const store = useStore()
store.state.nowPost = store.state.postDb[nowDbIndex.value]
nowDb.value = store.state.nowPost

// commentDb null check

// collectinRefs
const blogPostsCollectionRef = collection(db, 'blog-post')
const blogPostCollectionQuery = query(blogPostsCollectionRef, orderBy('date', 'desc'))

onMounted(async () => {
  onSnapshot(blogPostCollectionQuery, (querySnapshot) => {
    const fireData = []
    const cities = []
    querySnapshot.forEach((doc, i) => {
      cities.push(doc.data().name)
      if (nowDb.value.id === doc.id) {
        const postComment = doc.data().commentDb
        nowDb.value.commentDb = postComment
        commentLength.value = doc.data().commentLength
        return false
      }
    })
  })

  if (!nowDb.value.commentDb) {
    commentLength.value = 0
  } else {
    commentLength.value = nowDb.value.commentLength
  }
})

// watch
watch(route, (element) => {
  nowDbIndex.value = element.params.id
  console.log(nowDbIndex.value)
  store.state.nowPost = store.state.postDb[nowDbIndex.value]
  nowDb.value = store.state.nowPost
  output.value = marked(nowDb.value.content)
})

output.value = marked(nowDb.value.content)

// onClick fucntions
const onClickbeforePost = () => {
  router.push('/post/' + (nowDbIndex.value - 1))
}

const yyyyMMdd = (value) => {
  // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
  if (value === '') return ''

  // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
  const jsdate = new Date(value)

  // 연도, 월, 일 추출
  const year = jsdate.getFullYear()
  let month = jsdate.getMonth() + 1
  let day = jsdate.getDate()

  // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  // 최종 포맷 (ex - '2021-10-08')
  return year + '-' + month + '-' + day
}

const onClickDelPostBtn = (id) => {
  deleteDoc(doc(blogPostsCollectionRef, id))
  router.go(-1)
}

const onClickUpdatePostBtn = (id) => {
  router.push('/write')
}

const onClickAddCommentBtn = (a) => {
  console.log(a)
  newComment.value.date = Date()
  if (!nowDb.value.commentDb) {
    nowDb.value.commentDb = [newComment.value]
  } else {
    nowDb.value.commentDb.push(newComment.value)
  }
  updateDoc(doc(blogPostsCollectionRef, nowDb.value.id), {
    commentDb: nowDb.value.commentDb,
    commentLength: nowDb.value.commentDb.length
  })
  newComment.value.content = ''
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

pre {
  background-color: aqua;
}
</style>
